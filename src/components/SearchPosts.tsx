import { searchTerm } from "../store/posts";

const SearchPosts = () => {
  return (
    <>
      <input
        type="text"
        placeholder="Search posts"
        onChange={(e) => {
          searchTerm.set(e.target.value);
        }}
      />
    </>
  );
};

export default SearchPosts;
