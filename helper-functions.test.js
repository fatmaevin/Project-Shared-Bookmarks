import { bookmark, sortBookmarks, addBookmark } from "./helper-functions.js";

describe("bookmark()", () => {
  test("returns an object with correct fields", () => {
    const result = bookmark("https://example.com", "Example", "A test site");

    expect(result.url).toBe("https://example.com");
    expect(result.title).toBe("Example");
    expect(result.description).toBe("A test site");
    expect(result.createdAt).toBeDefined();
  });

  test("throws an error if title or url is missing", () => {
    expect(() => bookmark("", "Title")).toThrow(
      "Please fill in required fields"
    );
    expect(() => bookmark("https://x.com", "")).toThrow(
      "Please fill in required fields"
    );
  });
});

describe("sortBookmarks()", () => {
  test("returns a reversed copy of the array", () => {
    const bookmarks = [1, 2, 3];
    const result = sortBookmarks(bookmarks);

    expect(result).toEqual([3, 2, 1]);
    expect(result).not.toBe(bookmarks); 
  });
});

describe("addBookmark()", () => {
  test("adds new bookmark at the beginning of the list", () => {
    const existing = [{ title: "Old" }];
    const newBookmark = { title: "New" };

    const result = addBookmark(existing, newBookmark);

    expect(result[0].title).toBe("New");
    expect(result[1].title).toBe("Old");
    expect(result).not.toBe(existing); 
  });
});
