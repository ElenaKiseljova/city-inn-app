const meta = (attr = {}) => {
  if (attr.lang) {
    const rootElement = document.documentElement;

    rootElement.lang = attr.lang;
  }

  const head = document.querySelector('head');

  if (attr.title) {
    let title = document.querySelector('title');

    if (title) {
      title.textContent = attr.title;
    } else {
      title = document.createElement('title');
      title.textContent = attr.title;

      head.appendChild(title);
    }
  }

  if (attr.items) {
    attr.items.forEach(item => {
      // Ищу мета-поле по name/property
      const key = Object.keys(item)[0];
      const value = item[Object.keys(item)[0]];

      let metaItem = document.querySelector(`meta[${key}="${value}"]`);

      if (metaItem) {
        for (const key in item) {
          metaItem.setAttribute(key, item[key]);
        }
      } else {
        metaItem = document.createElement('meta');

        for (const key in item) {
          metaItem.setAttribute(key, item[key]);
        }

        head.appendChild(metaItem);
      }
    });
  }
};

export default meta;