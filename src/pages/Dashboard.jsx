import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { BookmarkForm } from '../components/BookmarkForm';
import { BookmarkCard } from '../components/BookmarkCard';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { getUserBookmarks, deleteBookmark, getBookmarks, saveBookmarks } from '../utils/bookmarks';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = { BOOKMARK: 'bookmark' };

function DraggableBookmark({ bookmark, index, moveBookmark, onDelete }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemType.BOOKMARK,
    hover(item) {
      if (!ref.current) return;
      if (item.index === index) return;
      moveBookmark(item.index, index);
      item.index = index;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType.BOOKMARK,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', touchAction: 'none' }}
      className={'transition-shadow duration-200 ' + (isDragging ? 'shadow-2xl z-10' : '')}
    >
      {/* Add a visible drag handle */}
      <div className="flex items-center">
        <span
          className="mr-2 cursor-move select-none text-gray-400 hover:text-blue-600"
          style={{ fontSize: 20 }}
          title="Drag to reorder"
        >☰</span>
        <div className="flex-1">
          <BookmarkCard bookmark={bookmark} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}

export const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const loadBookmarks = async () => {
    if (user) {
      const userBookmarks = await getUserBookmarks(user.id);
      setBookmarks(userBookmarks);
    }
  };

  useEffect(() => {
    loadBookmarks();
    // eslint-disable-next-line
  }, [user]);

  const handleDeleteBookmark = async (id) => {
    if (user) {
      await deleteBookmark(id, user.id);
      await loadBookmarks();
    }
  };

  const moveBookmark = useCallback((from, to) => {
    setBookmarks((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(from, 1);
      updated.splice(to, 0, removed);
      return updated;
    });
  }, []);

  const handleDrop = async () => {
    // Persist the new order for the current user only
    if (!user) return;
    const allBookmarks = await getBookmarks();
    let userIdx = 0;
    const newAll = allBookmarks.map(b => {
      if (b.userId === user.id) {
        const updated = { ...bookmarks[userIdx++] };
        return { ...b, ...updated };
      }
      return b;
    });
    await saveBookmarks(newAll);
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const isFiltering = searchTerm.trim().length > 0;

  return (
    <ProtectedRoute>
      <Header />
      <main className="max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">My Bookmarks</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Save and organize your favorite links</p>
        </div>
        <BookmarkForm onBookmarkAdded={loadBookmarks} />
        {bookmarks.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-full sm:max-w-md px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        )}
        <DndProvider backend={HTML5Backend}>
          <div
            className="flex flex-col gap-4"
            onMouseUp={handleDrop}
            onTouchEnd={handleDrop}
          >
            {filteredBookmarks.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <BookmarkIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-200 mb-2">
                  {bookmarks.length === 0 ? 'No bookmarks yet' : 'No bookmarks found'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  {bookmarks.length === 0 
                    ? 'Add your first bookmark using the form above'
                    : 'Try adjusting your search terms'
                  }
                </p>
              </div>
            ) : (
              filteredBookmarks.map((bookmark, idx) => (
                <DraggableBookmark
                  key={bookmark.id}
                  bookmark={bookmark}
                  index={idx}
                  moveBookmark={isFiltering ? () => {} : moveBookmark}
                  onDelete={handleDeleteBookmark}
                />
              ))
            )}
            {isFiltering && (
              <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                Drag-and-drop reordering is disabled while searching.
              </div>
            )}
          </div>
        </DndProvider>
      </main>
    </ProtectedRoute>
  );
};