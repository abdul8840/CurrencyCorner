const StatCard = ({ title, value, icon, color }) => {
  return (
    <div>
      <div>
        <div>{icon}</div>
      </div>
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;