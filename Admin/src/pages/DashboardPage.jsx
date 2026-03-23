import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../features/dashboard/dashboardSlice';
import StatCard from '../components/common/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import RecentOrders from '../components/dashboard/RecentOrders';
import Loader from '../components/common/Loader';
import { formatCurrency } from '../utils/helpers';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiGrid, FiAlertCircle, FiCheck, FiClock } from 'react-icons/fi';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading || !stats) return <Loader />;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <StatCard title="Total Revenue" value={formatCurrency(stats.totalRevenue)} icon={<FiDollarSign />} />
        <StatCard title="Verified Revenue" value={formatCurrency(stats.verifiedRevenue)} icon={<FiCheck />} />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<FiShoppingBag />} />
        <StatCard title="Pending Orders" value={stats.pendingOrders} icon={<FiClock />} />
        <StatCard title="Delivered Orders" value={stats.deliveredOrders} icon={<FiCheck />} />
        <StatCard title="Total Products" value={stats.activeProducts} icon={<FiPackage />} />
        <StatCard title="Categories" value={stats.totalCategories} icon={<FiGrid />} />
        <StatCard title="Total Users" value={stats.totalUsers} icon={<FiUsers />} />
        <StatCard title="Out of Stock" value={stats.outOfStockProducts} icon={<FiAlertCircle />} />
        <StatCard title="Cancelled" value={stats.cancelledOrders} icon={<FiAlertCircle />} />
      </div>
      <div>
        <RevenueChart monthlyRevenue={stats.monthlyRevenue} />
        <RecentOrders orders={stats.recentOrders} />
      </div>
    </div>
  );
};

export default DashboardPage;