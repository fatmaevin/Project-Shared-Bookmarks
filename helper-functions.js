export function createBookmark(url, title, description) {
  if (!title || !url) {
    throw new Error("Please fill in required fields");
  }
  return {
    url,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
}
export function sortBookmarks(list) {
  return [...list].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export function addBookmark(list, bookmark) {
  return [bookmark, ...list];
}
