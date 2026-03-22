import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updatePassword, updateAvatar, clearError, clearMessage } from '../features/auth/authSlice';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import SEO from '../components/common/SEO';
import { FiCamera } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error, message } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({ name: '', phone: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  useEffect(() => {
    if (error) { toast.error(error); dispatch(clearError()); }
    if (message) { toast.success(message); dispatch(clearMessage()); }
  }, [error, message, dispatch]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    }));
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      dispatch(updateAvatar(formData));
    }
  };

  return (
    <div>
      <SEO title="Profile" />
      <div>
        <ProfileSidebar />
        <div>
          <h1>My Profile</h1>

          <div>
            <div>
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} />
              ) : (
                <div>{user?.name?.charAt(0)}</div>
              )}
              <label>
                <FiCamera />
                <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
              </label>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <h2>Personal Information</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={user?.email || ''} disabled />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <button type="submit" disabled={loading}>Update Profile</button>
          </form>

          <form onSubmit={handlePasswordUpdate}>
            <h2>Change Password</h2>
            <div>
              <label>Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                required
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                required
                minLength={6}
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>
            <button type="submit" disabled={loading}>Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;