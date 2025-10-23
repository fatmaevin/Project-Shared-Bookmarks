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

    const sortedData = [...selectedUserData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    renderBookmarks(sortedData);
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
    usersData.push(bookmark);

    const sortedData = [...usersData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setData(selectedUser, sortedData);
    form.reset();
    renderBookmarks(sortedData);
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
