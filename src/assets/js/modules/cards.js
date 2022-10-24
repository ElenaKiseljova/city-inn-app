const cardsActivate = (sectionName = 'cards', cardSelector = '.cards__item') => {
  let lastTimeout;

  const cards = document.querySelectorAll(`${cardSelector}`);

  if (cards.length > 0) {
    cards.forEach((card) => {
      const cardTop = card.querySelector(`.${sectionName}__top`);
      const cardBottom = card.querySelector(`.${sectionName}__bottom`);

      if (cardTop && cardBottom) {
        card.addEventListener('click', (evt) => {
          const cardTopHeight = cardTop.offsetHeight;
          const cardBottomHeight = cardBottom.offsetHeight;

          if (!evt.target.classList.contains('swiper-pagination-bullet')) {
            card.classList.add('active');
            cardBottom.classList.toggle('active');
            cardTop.classList.toggle('active');

            if (cardTop.classList.contains('active')) {
              card.style.height = `${cardBottomHeight}px`;
            }
          }

          if (lastTimeout) {
            clearTimeout(lastTimeout);
          }

          lastTimeout = setTimeout(() => {
            cardBottom.classList.toggle('opened');
            cardTop.classList.toggle('opened');
            if (!cardTop.classList.contains('active')) {
              card.style.height = `${cardTopHeight}px`;
            }
            card.classList.remove('active');
          }, 1000);
        });
      }
    });
  }
};

export default cardsActivate;
