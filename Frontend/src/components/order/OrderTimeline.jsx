import { formatDateTime } from '../../utils/helpers';
import { FiCheck } from 'react-icons/fi';

const OrderTimeline = ({ statusHistory }) => {
  if (!statusHistory || statusHistory.length === 0) return null;

  return (
    <div>
      <h3>Order Timeline</h3>
      <div>
        {statusHistory.map((entry, index) => (
          <div key={index}>
            <div><FiCheck /></div>
            <div>
              <p>{entry.status}</p>
              <p>{formatDateTime(entry.date)}</p>
              {entry.note && <p>{entry.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTimeline;