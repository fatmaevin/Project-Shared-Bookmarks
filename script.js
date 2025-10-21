// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookmarkForm");
  const users = document.getElementById("dropdown");
  const url = document.getElementById("url");
  const description = document.getElementById("description");
  const bookmarkList = document.getElementById("bookmarkList");
  const title = document.getElementById("title");
  const clearAll = document.getElementById("clearAll");

  clearAll.addEventListener("click", () => {
    const selectedUser = users.value;
    if (!selectedUser) {
      return;
    }
    clearData(selectedUser);
    renderBookmarks();
  });

  const userId = getUserIds();
  userId.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    users.appendChild(option);
  });
  users.addEventListener("change", (event) => {
    const selectedUser = event.target.value;
    const selectedUserData = getData(selectedUser);
    renderBookmarks(selectedUserData);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedUser = users.value;
    const bookmark = {
      url: url.value,
      title: title.value,
      description: description.value,
      createdAt: new Date().toISOString(),
    };
    const usersData = getData(selectedUser) || [];
    usersData.unshift(bookmark);
    setData(selectedUser, usersData);
    form.reset();
    renderBookmarks(usersData);
  });

  function renderBookmarks(userData) {
    bookmarkList.innerHTML = "";
    if (!userData || userData.length === 0) {
      bookmarkList.textContent = "No bookmarks found";
      return;
    }

    userData.forEach((bookmark) => {
      const item = document.createElement("div");
      item.innerHTML = `
      <p><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></p>
      <p>${bookmark.description}</p>
      <small>Added on: ${bookmark.createdAt}</small>
      <hr>
    `;
      bookmarkList.appendChild(item);
    });
  }
});
