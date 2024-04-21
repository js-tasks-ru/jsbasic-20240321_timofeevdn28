export default class StepSlider {
  elem = null;
  #config = {};

  constructor({ steps, value = 0 }) {
    this.#config = { steps, value } || this.#config;
    this.value = this.#config.value;
    this.segments = this.#config.steps - 1;

    this.#createElem();
  }

  #createSteps() {
    let steps = [];

    for (let i = 0; i < this.#config.steps; i++) {
      if (i === this.value) {
        steps.push(`<span class="slider__step-active"></span>`);
      } else {
        steps.push(`<span></span>`);
      }
    }

    return steps;
  }

  #createTemplate() {
    return `
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>

      <div class="slider__progress"></div>

      <div class="slider__steps">
        ${this.#createSteps().join('\n')}
      </div>
    `;
  }

  #setSliderStep(num) {
    let sliderSteps = this.elem.querySelectorAll('.slider__steps span');

    sliderSteps.forEach((step, index) => {
      if (step.matches('.slider__step-active')) {
        step.classList.remove('slider__step-active');
      }

      if (index === num - 1) {
        step.classList.add('slider__step-active');
      }
    });
  }

  #pointerUpHandler = () => {
    document.removeEventListener('pointermove', this.#pointerMoveHandler);
    document.removeEventListener('pointerup', this.#pointerUpHandler);

    this.elem.classList.remove('slider_dragging');

    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }

  #setValue(textValue, styleValue) {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    sliderValue.textContent = textValue;
    this.#setSliderStep(textValue);
    thumb.style.left = `${styleValue}%`;
    progress.style.width = `${styleValue}%`;
  }

  #pointerMoveHandler = (e) => {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    this.value = Math.round(leftRelative * this.segments);

    this.#setValue(this.value, leftPercents);
  }

  #elemClickHandler = (e) => {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    this.value = Math.round(leftRelative * this.segments);
    let valuePercents = this.value / this.segments * 100;

    this.#setValue(this.value, valuePercents);

    document.addEventListener('pointermove', this.#pointerMoveHandler);
    document.addEventListener('pointerup', this.#pointerUpHandler);
    this.elem.classList.add('slider_dragging');
  }

  #createElem() {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    this.elem.insertAdjacentHTML('afterBegin', this.#createTemplate());
    this.elem.addEventListener('dragstart', (e) => e.preventDefault());

    this.elem.addEventListener('pointerdown', this.#elemClickHandler);
  }
}
