export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];
    classes.forEach((e, j) => {
      row.children[j].classList.add(`carousel-${e}`);
    });
    const carouselText = row.querySelector('.carousel-text');
    if (!carouselText.innerText.trim()) carouselText.remove();
    /* buttons */
    const button = document.createElement('button');
    button.title = 'Carousel Nav';
    if (!i) button.classList.add('selected');
    button.addEventListener('click', () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
    buttons.append(button);
  });
  block.parentElement.append(buttons);

  // listener for editor
  block.querySelectorAll(':scope > div').forEach((slide) => {
    slide.addEventListener('aue:ui-select', (e) => {
      if (e.detail.selected) {
        slide.parentElement.scrollTo({ top: 0, left: slide.offsetLeft - slide.parentNode.offsetLeft, behavior: 'instant' });
        //
        const nthSlide = slide.offsetLeft / slide.parentNode.clientWidth;
        const button = block.parentElement.querySelector(`.carousel-buttons > button:nth-child(${nthSlide + 1})`);
        [...buttons.children].forEach((r) => r.classList.remove('selected'));
        button.classList.add('selected');
      }
    });

    slide.addEventListener('aue:content-move', async (e) => {
      await Promise.resolve();

      const nthSlide = slide.offsetLeft / slide.parentNode.clientWidth;
      const button = block.parentElement.querySelector(`.carousel-buttons > button:nth-child(${nthSlide + 1})`);
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
  });
}
