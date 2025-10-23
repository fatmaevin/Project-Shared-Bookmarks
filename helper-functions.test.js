import {
  createBookmark,
  sortBookmarks,
  addBookmark,
} from "./helper-functions.js";

describe("createBookmark()", () => {
  test("returns an object with correct fields", () => {
    const result = createBookmark(
      "https://example.com",
      "Example",
      "A test site"
    );

    expect(result.url).toBe("https://example.com");
    expect(result.title).toBe("Example");
    expect(result.description).toBe("A test site");
    expect(result.createdAt).toBeDefined();
  });

  test("throws an error if title or url is missing", () => {
    expect(() => createBookmark("", "Title")).toThrow(
      "Please fill in required fields"
    );
    expect(() => createBookmark("https://x.com", "")).toThrow(
      "Please fill in required fields"
    );
  });
});

describe("sortBookmarks()", () => {
  test("sorts bookmarks by createdAt in descending order", () => {
    const bookmarks = [
      { createdAt: "2025-10-22T12:00:00Z" },
      { createdAt: "2025-10-23T12:00:00Z" },
    ];
    const result = sortBookmarks(bookmarks);

    expect(result[0].createdAt).toBe("2025-10-23T12:00:00Z"); 
    expect(result[1].createdAt).toBe("2025-10-22T12:00:00Z");
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
