import React from 'react';
import { ExternalLinkIcon, TrashIcon } from 'lucide-react';

export const BookmarkCard = ({ bookmark, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      onDelete(bookmark.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start space-x-3 flex-1 w-full">
          <img
            src={bookmark.favicon}
            alt="Favicon"
            className="w-6 h-6 rounded-sm mt-1 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=default&sz=64';
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 break-words">
              {bookmark.title}
              {bookmark.ogTags && Object.keys(bookmark.ogTags).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1 items-center">
                  {bookmark.ogTags['og:title'] && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded">
                      {bookmark.ogTags['og:title']}
                    </span>
                  )}
                  {bookmark.ogTags['og:description'] && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded">
                      {bookmark.ogTags['og:description'].slice(0, 60)}{bookmark.ogTags['og:description'].length > 60 ? '…' : ''}
                    </span>
                  )}
                  {bookmark.ogTags['og:image'] && (
                    <img src={bookmark.ogTags['og:image']} alt="OG" className="h-6 w-6 rounded object-cover border border-gray-200 dark:border-gray-700" />
                  )}
                  {bookmark.ogTags['og:type'] && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-0.5 rounded">
                      {bookmark.ogTags['og:type']}
                    </span>
                  )}
                  {bookmark.ogTags['og:site_name'] && (
                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded">
                      {bookmark.ogTags['og:site_name']}
                    </span>
                  )}
                  {bookmark.ogTags['og:url'] && (
                    <a href={bookmark.ogTags['og:url']} target="_blank" rel="noopener noreferrer" className="text-xs underline text-blue-500 dark:text-blue-300 px-2 py-0.5">
                      OG Link
                    </a>
                  )}
                </div>
              )}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm break-all transition-colors inline-flex items-center gap-1"
            >
              {bookmark.url}
              <ExternalLinkIcon className="h-3 w-3 flex-shrink-0" />
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">
              Saved on {new Date(bookmark.createdAt).toLocaleDateString()}
            </p>
            {bookmark.summary && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 touch-pan-y">
                <div className="text-xs text-gray-700 dark:text-gray-200 whitespace-pre-line">
                  {bookmark.summary}
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors ml-0 sm:ml-4 flex-shrink-0 mt-4 sm:mt-0"
          title="Delete bookmark"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};