import gsapAnimations from './gsap-animations';
import headerAndToTopButtonAnimationByScroll from './modules/headerAndToTopButtonAnimationByScroll';
import menu from './menu';
import callUs from './call-us';
import swipers from './swipers';
import map from './map';
import cardsActivate from './cards';
import readMore from './read-more';

document.addEventListener('DOMContentLoaded', () => {
  try {
    gsapAnimations();
  } catch (error) {
    console.log(error.message);
  }

  try {
    readMore();
  } catch (error) {
    console.log(error.message);
  }

  try {
    headerAndToTopButtonAnimationByScroll();
  } catch (error) {
    console.log(error.message);
  }

  try {
    menu();
  } catch (error) {
    console.log(error.message);
  }

  try {
    callUs();
  } catch (error) {
    console.log(error.message);
  }

  try {
    swipers();
  } catch (error) {
    console.log(error.message);
  }

  try {
    map();
  } catch (error) {
    console.log(error.message);
  }

  try {
    cardsActivate();
  } catch (error) {
    console.log(error.message);
  }
});
