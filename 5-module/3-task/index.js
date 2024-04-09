function initCarousel() {
  let carouselItems = document.querySelector('.carousel__inner');
  let prevBtn = document.querySelector('.carousel__arrow_left');
  let nextBtn = document.querySelector('.carousel__arrow_right');
  let slides = document.querySelectorAll('.carousel__slide');

  let width = document.querySelector('.carousel__slide').offsetWidth;
  let position = 0;
  let slideIndex = 0;
  let slideIndexMax = slides.length - 1;

  if (slideIndex === 0) {
    prevBtn.style.display = 'none';
  }

  prevBtn.addEventListener('click', function() {
    position += width;
    position = Math.min(position, 0);
    carouselItems.style.transform = `translateX(${position}px)`;

    slideIndex = Math.max(--slideIndex, 0);
    if (slideIndex === 0) {
      prevBtn.style.display = 'none';
    }

    if (slideIndex !== slideIndexMax) {
      nextBtn.style.display = '';
    }
  });

  nextBtn.addEventListener('click', function() {
    position -= width;
    position = Math.max(position, -width * (slides.length - 1));
    carouselItems.style.transform = `translateX(${position}px)`;

    slideIndex = Math.min(++slideIndex, slideIndexMax);
    if (slideIndex === slideIndexMax) {
      nextBtn.style.display = 'none';
    }

    if (slideIndex !== 0) {
      prevBtn.style.display = '';
    }
  });
}
