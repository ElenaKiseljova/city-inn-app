const accordion = (container) => {
  if (container) {
    const accordionItems = container.querySelectorAll('.text-page__item');

    accordionItems.forEach((accordionItem) => {
      const accordionTitle = accordionItem.querySelector('.text-page__title');
      const accordionContent = accordionItem.querySelector('.text-page__content');

      if (accordionTitle && accordionContent) {
        const accordionToggleHeight = () => {
          if (accordionItem.classList.contains('active')) {
            accordionItem.style.height = `${accordionTitle.offsetHeight}px`;

            accordionItem.classList.remove('active');
          } else {
            accordionItem.style.height = `${accordionTitle.offsetHeight + accordionContent.offsetHeight}px`;

            accordionItem.classList.add('active');
          }
        };

        accordionItem.style.height = `${accordionTitle.offsetHeight}px`;

        accordionItem.addEventListener('click', () => {
          accordionToggleHeight();
        });
      }
    });

    return true;
  }

  return false;
};

export default accordion;