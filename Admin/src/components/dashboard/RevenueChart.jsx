import { formatCurrency } from '../../utils/helpers';

const RevenueChart = ({ monthlyRevenue }) => {
  if (!monthlyRevenue || monthlyRevenue.length === 0) return <p>No revenue data</p>;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  return (
    <div>
      <h3>Monthly Revenue</h3>
      <div>
        {monthlyRevenue.map((item) => (
          <div key={item._id}>
            <div>
              <div style={{ height: `${maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0}%` }}></div>
            </div>
            <p>{months[item._id - 1]}</p>
            <p>{formatCurrency(item.revenue)}</p>
            <p>{item.orders} orders</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;