import React, { useState } from 'react';
import { PlusIcon, LoaderIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { addBookmark } from '../utils/bookmarks';
import { extractMetadata } from '../utils/urlParser';

export const BookmarkForm = ({ onBookmarkAdded }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim() || !user) return;

    setIsLoading(true);
    setError('');

    try {
      const { title, favicon, ogTags } = await extractMetadata(url.trim());
      let summary = '';
      let normalizedUrl = url.trim();
      if (!/^https?:\/\//i.test(normalizedUrl)) {
        normalizedUrl = 'https://' + normalizedUrl;
      }
      try {
        // Remove protocol for Jina API
        const jinaUrl = `https://r.jina.ai/http://${normalizedUrl.replace(/^https?:\/\//, '')}`;
        console.log('Jina AI summary fetch URL:', jinaUrl);
        const res = await fetch(jinaUrl);
        summary = await res.text();
      } catch (err) {
        console.error('Jina AI summary fetch error:', err);
        summary = 'Summary temporarily unavailable.';
      }
      await addBookmark({
        title,
        url: url.trim(),
        favicon,
        userId: user.id,
        summary,
        ogTags
      });
      setUrl('');
      await onBookmarkAdded();
    } catch (err) {
      setError('Failed to save bookmark. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-6 mb-6 sm:mb-8 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">Add New Bookmark</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="url" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 sm:mb-2">
            URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-xs sm:text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            required
            disabled={isLoading}
          />
        </div>
        {error && (
          <div className="text-red-600 text-xs sm:text-sm bg-red-50 dark:bg-gray-900 p-2 sm:p-3 rounded-lg">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 disabled:bg-gray-400 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-base"
        >
          {isLoading ? (
            <>
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <PlusIcon className="h-4 w-4" />
              <span>Add Bookmark</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};