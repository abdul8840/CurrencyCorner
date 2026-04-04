// controllers/campaignController.js
import Campaign from '../models/Campaign.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import CampaignLog from '../models/CampaignLog.js';
import Product from '../models/Product.js';
import emailService from '../services/emailService.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

// ==================== GET CAMPAIGNS ====================

export const getAllCampaigns = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    let filter = { createdBy: req.user._id };
    if (status) filter.status = status;

    const total = await Campaign.countDocuments(filter);
    const campaigns = await Campaign.find(filter)
      .populate('products.product', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      campaigns,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('products.product')
      .populate('createdBy', 'name email');

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    if (campaign.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const logs = await CampaignLog.find({ campaign: campaign._id })
      .populate('subscriber', 'email name');

    res.status(200).json({
      success: true,
      campaign,
      logs,
      stats: {
        totalSent: campaign.sent,
        totalOpened: campaign.opened,
        totalClicked: campaign.clicked,
        openRate: campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(2) : 0,
        clickRate: campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CREATE CAMPAIGN ====================

export const createCampaign = async (req, res) => {
  try {
    const { title, description, subject, type, products, sendImmediately, scheduleDate, targetSegment, customEmails } = req.body;

    if (!title || !description || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and subject are required'
      });
    }

    let bannerImage = {};
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'campaigns/banners',
        resource_type: 'auto'
      });
      bannerImage = { url: result.url, publicId: result.public_id };
      fs.unlinkSync(req.file.path);
    }

    const campaign = new Campaign({
      title,
      description,
      subject,
      type,
      products: products || [],
      bannerImage,
      sendImmediately,
      scheduleDate: !sendImmediately ? scheduleDate : null,
      status: sendImmediately ? 'sending' : 'scheduled',
      targetSegment,
      customEmails: customEmails || [],
      createdBy: req.user._id
    });

    await campaign.save();
    await campaign.populate('products.product');

    // If send immediately, start sending
    if (sendImmediately) {
      sendCampaignEmails(campaign);
    } else {
      // Schedule for later
      scheduleEmailSending(campaign);
    }

    res.status(201).json({
      success: true,
      campaign,
      message: 'Campaign created successfully'
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== UPDATE CAMPAIGN ====================

export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    if (campaign.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only draft campaigns can be updated'
      });
    }

    const { title, description, subject, type, products, targetSegment, customEmails } = req.body;

    if (title) campaign.title = title;
    if (description) campaign.description = description;
    if (subject) campaign.subject = subject;
    if (type) campaign.type = type;
    if (products) campaign.products = products;
    if (targetSegment) campaign.targetSegment = targetSegment;
    if (customEmails) campaign.customEmails = customEmails;

    if (req.file) {
      if (campaign.bannerImage?.publicId) {
        await cloudinary.v2.uploader.destroy(campaign.bannerImage.publicId);
      }
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'campaigns/banners'
      });
      campaign.bannerImage = { url: result.url, publicId: result.public_id };
      fs.unlinkSync(req.file.path);
    }

    await campaign.save();
    await campaign.populate('products.product');

    res.status(200).json({
      success: true,
      campaign,
      message: 'Campaign updated successfully'
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== DELETE CAMPAIGN ====================

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    if (campaign.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only draft campaigns can be deleted'
      });
    }

    if (campaign.bannerImage?.publicId) {
      await cloudinary.v2.uploader.destroy(campaign.bannerImage.publicId);
    }

    await Campaign.findByIdAndDelete(req.params.id);
    await CampaignLog.deleteMany({ campaign: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== SEND CAMPAIGN ====================

const sendCampaignEmails = async (campaign) => {
  try {
    let subscribers = [];

    if (campaign.targetSegment === 'all') {
      subscribers = await NewsletterSubscriber.find({ status: 'active' });
    } else if (campaign.targetSegment === 'active') {
      subscribers = await NewsletterSubscriber.find({ status: 'active', lastEmailSent: { $exists: true } });
    } else if (campaign.targetSegment === 'inactive') {
      subscribers = await NewsletterSubscriber.find({ status: 'active', lastEmailSent: { $exists: false } });
    } else if (campaign.targetSegment === 'custom') {
      subscribers = await NewsletterSubscriber.find({ email: { $in: campaign.customEmails } });
    }

    campaign.recipients = subscribers.length;
    campaign.status = 'sending';
    await campaign.save();

    // Get products for email
    const products = await Product.find({ _id: { $in: campaign.products.map(p => p.product) } });

    for (const subscriber of subscribers) {
      try {
        // Create campaign log
        const log = new CampaignLog({
          campaign: campaign._id,
          subscriber: subscriber._id,
          email: subscriber.email,
          status: 'pending'
        });
        await log.save();

        // Send email
        await emailService.sendCampaignEmail(
          subscriber,
          campaign,
          products
        );

        // Update log
        log.status = 'sent';
        log.sentAt = new Date();
        await log.save();

        // Update campaign
        campaign.sent += 1;
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
        await CampaignLog.updateOne(
          { campaign: campaign._id, subscriber: subscriber._id },
          { status: 'failed', failureReason: error.message }
        );
      }
    }

    campaign.status = 'sent';
    await campaign.save();
  } catch (error) {
    console.error('Campaign send error:', error);
    campaign.status = 'cancelled';
    await campaign.save();
  }
};

const scheduleEmailSending = (campaign) => {
  const delay = campaign.scheduleDate.getTime() - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      sendCampaignEmails(campaign);
    }, delay);
  }
};

// ==================== CAMPAIGN STATS ====================

export const getCampaignStats = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user._id });

    const stats = {
      totalCampaigns: campaigns.length,
      totalSent: campaigns.reduce((sum, c) => sum + c.sent, 0),
      totalOpened: campaigns.reduce((sum, c) => sum + c.opened, 0),
      totalClicked: campaigns.reduce((sum, c) => sum + c.clicked, 0),
      averageOpenRate: campaigns.length > 0
        ? (campaigns.reduce((sum, c) => sum + (c.sent > 0 ? c.opened / c.sent : 0), 0) / campaigns.length * 100).toFixed(2)
        : 0,
      campaignsByStatus: {
        draft: campaigns.filter(c => c.status === 'draft').length,
        scheduled: campaigns.filter(c => c.status === 'scheduled').length,
        sent: campaigns.filter(c => c.status === 'sent').length
      }
    };

    res.status(200).json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CANCEL CAMPAIGN ====================

export const cancelCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    if (!['scheduled', 'sending'].includes(campaign.status)) {
      return res.status(400).json({
        success: false,
        message: 'Only scheduled or sending campaigns can be cancelled'
      });
    }

    campaign.status = 'cancelled';
    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};