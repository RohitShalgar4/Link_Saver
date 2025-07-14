import { idbGet, idbSet } from './idb';

const BOOKMARKS_KEY = 'link_saver_bookmarks';

export const saveBookmarks = async (bookmarks) => {
  await idbSet(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

export const getBookmarks = async () => {
  const bookmarksStr = await idbGet(BOOKMARKS_KEY);
  if (!bookmarksStr) return [];
  try {
    return JSON.parse(bookmarksStr);
  } catch {
    return [];
  }
};

export const addBookmark = async (bookmark) => {
  const bookmarks = await getBookmarks();
  const newBookmark = {
    ...bookmark,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  bookmarks.push(newBookmark);
  await saveBookmarks(bookmarks);
  return newBookmark;
};

export const deleteBookmark = async (id, userId) => {
  const bookmarks = await getBookmarks();
  const filteredBookmarks = bookmarks.filter(
    bookmark => !(bookmark.id === id && bookmark.userId === userId)
  );
  await saveBookmarks(filteredBookmarks);
};

export const getUserBookmarks = async (userId) => {
  const bookmarks = await getBookmarks();
  return bookmarks.filter(bookmark => bookmark.userId === userId);
};