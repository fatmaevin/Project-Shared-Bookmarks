export function bookmark(url, title, description) {
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
export function sortBookmarks(b){
    return[...b].reverse();
}
export function addBookmark(list,bookmark){
    return[bookmark, ...list]
}
