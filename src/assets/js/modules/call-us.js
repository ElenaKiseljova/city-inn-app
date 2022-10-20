const callUs = (container = document) => {
  const callLink = container.querySelector('.call__link');

  console.log(container, callLink);
  if (callLink) {
    const callText = callLink.querySelector('.call__text');

    if (callText) {
      callLink.addEventListener('click', (evt) => {
        if (callLink.classList.contains('active')) {
          callText.textContent = callLink.dataset.text;
          callLink.classList.remove('active');
        } else {
          evt.preventDefault();

          callLink.classList.add('active');
          callText.textContent = callLink.dataset.phone;
        }
      });
    }

    return true;
  }

  return false;
};

export { callUs };
