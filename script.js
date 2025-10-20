// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookmarkForm");
  const button = document.getElementById("submit");
  const users = document.getElementById("dropdown");
  const url = document.getElementById("url");
  const description = document.getElementById("description");

  const userId = getUserIds();
  userId.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    users.appendChild(option);
  });
  

  
});
