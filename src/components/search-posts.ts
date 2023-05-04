import { searchTerm } from "../store/posts";

document.querySelector("#search_posts").addEventListener("input", (e) => {
  searchTerm.set(e.target.value);
});
