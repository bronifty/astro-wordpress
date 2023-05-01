import { CollectionEntry, getCollection } from "astro:content";
import { formatBlogPosts } from "../js/utils";

export default function Search() {
  const allPosts = async () => await getCollection("blog");
  const formattedPosts: CollectionEntry<"blog">[] = formatBlogPosts(allPosts);
  const allCategories = [
    ...new Set(
      formattedPosts.map((post) => post.data.category.toLowerCase()).flat()
    ),
  ];
  // use this with tsx and a separate <Search /> component
  const searchPosts = (searchTerm: string) => {
    const filteredPosts = formattedPosts.filter((post) =>
      post.data.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredPosts;
  };

  // let's try this with a tsx file react integration
  // const search = document.getElementById("search");
  const searchHandler = (e) => {
    const searchTerm = e.target.value;
    const filteredPosts = searchPosts(searchTerm);
    console.log(filteredPosts);
  };

  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        onKeyUp={(e) => searchHandler(e)}
      />
    </div>
  );
}
