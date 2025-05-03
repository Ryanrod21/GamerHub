function SearchFriends({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search Friends 1"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchFriends;
