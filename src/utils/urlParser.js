export const extractMetadata = async (url) => {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    // Create a URL object to validate and extract domain
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    // Try to fetch the page to get title and OpenGraph tags
    let title = domain;
    let ogTags = {};
    try {
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
      const html = await response.text();
      // Extract title from HTML
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].trim();
      }
      // Extract OpenGraph tags
      const ogTagNames = [
        'og:title',
        'og:description',
        'og:image',
        'og:type',
        'og:site_name',
        'og:url'
      ];
      ogTagNames.forEach((tag) => {
        const regex = new RegExp(`<meta[^>]+property=["']${tag}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i');
        const match = html.match(regex);
        if (match && match[1]) {
          ogTags[tag] = match[1];
        }
      });
    } catch (error) {
      console.warn('Could not fetch page title or OpenGraph tags:', error);
    }
    // Generate favicon URL
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    return { title, favicon, ogTags };
  } catch (error) {
    console.error('Error parsing URL:', error);
    return {
      title: url,
      favicon: 'https://www.google.com/s2/favicons?domain=default&sz=64',
      ogTags: {}
    };
  }
};