const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20",

  approved: "bg-green-500/20 text-green-300 border border-green-500/20",

  rejected: "bg-red-500/20 text-red-300 border border-red-500/20",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        capitalize
        ${statusStyles[status]}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
