class TrackingService {
  getIndiaPostTrackingUrl(trackingNumber) {
    return `https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx`;
  }

  getTrackingInfo(trackingNumber) {
    return {
      trackingNumber,
      carrier: 'India Post',
      trackingUrl: this.getIndiaPostTrackingUrl(trackingNumber),
      message: 'Please visit India Post website to track your shipment'
    };
  }
}

export default new TrackingService();