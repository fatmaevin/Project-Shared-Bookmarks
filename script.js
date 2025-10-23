import { getUserIds, getData, setData, clearData } from "./storage.js";
import {
  createBookmark,
  addBookmark,
  sortBookmarks,
} from "./helper-functions.js";

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
    renderBookmarks([]);
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
    const sortedData = sortBookmarks(selectedUserData);
    renderBookmarks(sortedData);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedUser = users.value;
    if (!selectedUser) return;
    const newBookmark = createBookmark(
      url.value,
      title.value,
      description.value
    );
    const usersData = getData(selectedUser) || [];
    const updatedData = addBookmark(usersData, newBookmark);
    const sortedData = sortBookmarks(updatedData);
    setData(selectedUser, sortedData);
    renderBookmarks(sortedData);
    form.reset();
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
