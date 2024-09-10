type PropTypes = {
  avatarImage: string;
  name: string;
  ownerName: string;
  description: string;
  handleClick: () => void;
};

export default function RepoCard({ avatarImage, name, ownerName, description, handleClick }: PropTypes) {
  return (
    <div className="flex max-w-sm cursor-pointer flex-col rounded-3xl border-2 border-gray-300 p-4" onClick={handleClick}>
      <div className="flex items-center gap-x-4">
        <img src={avatarImage} alt="avatar" className="h-20 w-20 rounded-full border-2 border-gray-300" />
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <h3 className="text-lg">{ownerName}</h3>
        </div>
      </div>
      <p className="mt-6 h-12 line-clamp-2">{description}</p>
    </div>
  );
}
