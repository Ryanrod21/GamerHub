const WaffleButton = ({ onClick }) => {
  return (
    <div
      className="grid grid-cols-3 gap-1 w-6 h-6 cursor-pointer sm:hidden"
      onClick={onClick}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="w-1.5 h-1.5 bg-black rounded-full" />
      ))}
    </div>
  );
};

export default WaffleButton;
