const profilePic = [
  '/acctdefault.jpg',
  '/accpic1.jpg',
  '/accpic2.jpg',
  '/lion1.jpg',
];

export default function AccountPicSelector({ onSelect }) {
  return (
    <div className="pic-selector">
      {profilePic.map((pic, index) => (
        <img
          key={index}
          src={pic}
          alt={`Option ${index + 1}`}
          onClick={() => onSelect(pic)}
          className="pic-option"
        />
      ))}
    </div>
  );
}
