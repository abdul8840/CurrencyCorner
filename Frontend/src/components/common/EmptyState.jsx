import { Link } from 'react-router-dom';

const EmptyState = ({ icon, title, message, actionText, actionLink }) => {
  return (
    <div>
      {icon && <div>{icon}</div>}
      <h3>{title}</h3>
      <p>{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink}>{actionText}</Link>
      )}
    </div>
  );
};

export default EmptyState;