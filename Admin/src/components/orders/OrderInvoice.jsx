import { FiDownload } from 'react-icons/fi';

const OrderInvoice = ({ order, onDownload }) => {
  return (
    <div>
      <h3>Invoice</h3>
      {order?.invoice?.url ? (
        <div>
          <p>Invoice generated</p>
          <a href={order.invoice.url} target="_blank" rel="noopener noreferrer">
            <FiDownload /> View Invoice
          </a>
          <button onClick={onDownload}>
            <FiDownload /> Download Invoice
          </button>
        </div>
      ) : (
        <div>
          <p>No invoice generated yet</p>
          <button onClick={onDownload}>
            <FiDownload /> Generate & Download
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderInvoice;