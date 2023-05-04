import { searchTerm } from "../store/posts";

console.log("Hello from search-debug.ts");

document.querySelector("#search_debug").textContent =
  "Hello from search-debug.ts";

searchTerm.subscribe((value) => {
  document.querySelector("#search_debug").textContent = value;
});
