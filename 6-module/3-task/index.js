import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  #dataSlides = [];

  constructor(slides) {
    this.slides = slides || this.#dataSlides;

    this.elem = this.#render();
  }

  #getButtons() {
    const buttons = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;

    return buttons;
  }

  #getSlide(dataSlide) {
    const slide = createElement(`
      <div class="carousel__slide" data-id="${dataSlide.id}">
        <img src="/assets/images/carousel/${dataSlide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${dataSlide.price.toFixed(2)}></span>
          <div class="carousel__title">${dataSlide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    return slide;
  }

  #getSlides() {
    let carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');

    let arrSlides = this.slides.map(slide => this.#getSlide(slide));
    carouselInner.append(...arrSlides);

    return carouselInner;
  }

  #initCarousel() {
    let carouselItems = this.elem.querySelector('.carousel__inner');
    let prevBtn = this.elem.querySelector('.carousel__arrow_left');
    let nextBtn = this.elem.querySelector('.carousel__arrow_right');
    let slides = this.elem.querySelectorAll('.carousel__slide');
    let slide = this.elem.querySelector('.carousel__slide');

    let position = 0;
    let slideIndex = 0;
    let slideIndexMax = slides.length - 1;

    if (slideIndex === 0) {
      prevBtn.style.display = 'none';
    }

    prevBtn.addEventListener('click', function() {
      position += slide.offsetWidth;
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
      position -= slide.offsetWidth;
      position = Math.max(position, -slide.offsetWidth * (slides.length - 1));
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

  #addButtonsHandler = () => {
    const buttons = this.elem.querySelectorAll('.carousel__button');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.closest('.carousel__slide').dataset.id;

        const event = new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        });

        button.dispatchEvent(event);
      });
    });
  }

  #render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');

    this.elem.insertAdjacentHTML('beforeend', this.#getButtons());
    this.elem.append(this.#getSlides());
    this.#initCarousel();
    this.#addButtonsHandler();

    return this.elem;
  }
}
