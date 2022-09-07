import changeActiveClass from "./changeActiveClass";
import { textItemsAnimation, textNavPin, DEVICE_WIDTH, DESKTOP_WIDTH } from "./gsap-animations";

const accordion = (conteiner) => {
  if (conteiner) {
    // Десктопные пункты
    const accordionContainer = document.querySelector('.text-page__container');
    const accordionNavBar = document.querySelector('.text-page__nav');
    const accordionItemsDesktop = accordionNavBar?.querySelectorAll('.text-page__nav-item');

    if (accordionNavBar && accordionContainer) {
      textNavPin(accordionContainer, accordionNavBar);
    }

    // Мобильнык пункты
    const accordionItems = conteiner.querySelectorAll('.text-page__item');

    accordionItems.forEach((accordionItem, index) => {
      const accordionTitle = accordionItem.querySelector('.text-page__title');
      const accordionContent = accordionItem.querySelector('.text-page__content');

      if (accordionTitle && accordionContent) {
        const accordionToggleHeight = () => {
          if (accordionItem.classList.contains('active')) {
            if (DEVICE_WIDTH < DESKTOP_WIDTH) {
              accordionItem.style.height = `${accordionTitle.offsetHeight}px`;

              accordionItem.classList.remove('active');
            } else {
              accordionItems[index + 1]?.classList.remove('active');
            }


          } else {
            if (DEVICE_WIDTH < DESKTOP_WIDTH) {
              accordionItem.style.height = `${accordionTitle.offsetHeight + accordionContent.offsetHeight}px`;
            }

            accordionItem.classList.add('active');
          }

          if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
            if (accordionItemsDesktop.length > 0) {
              changeActiveClass(accordionItemsDesktop);

              accordionItemsDesktop[index]?.classList.add('active');
            }
          }
        };

        if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
          textItemsAnimation.init(accordionItem, accordionToggleHeight);
        } else {
          accordionItem.style.height = `${accordionTitle.offsetHeight}px`;

          accordionItem.addEventListener('click', () => {
            accordionToggleHeight();
          });
        }
      }
    });

    return true;
  }

  return false;
};

export default accordion;