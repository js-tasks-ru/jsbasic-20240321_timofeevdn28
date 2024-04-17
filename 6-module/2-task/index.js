import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  elem = null;
  #dataProduct = {};

  constructor(product) {
    this.#dataProduct = product || this.#dataProduct;

    this.elem = this.#render();
  }

  #getElements() {
    const cardTop = createElement(`
      <div class="card__top">
          <img src="/assets/images/products/${this.#dataProduct.image}" class="card__image" alt="product">
          <span class="card__price">€${this.#dataProduct.price.toFixed(2)}</span>
      </div>
    `);

    const cardBody = createElement(`
      <div class="card__body">
          <div class="card__title">${this.#dataProduct.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
    `);

    return [cardTop, cardBody];
  }

  #btnClickHandler = () => {
    const event = new CustomEvent('product-add', {
      detail: this.#dataProduct.id,
      bubbles: true
    });

    this.elem.querySelector('.card__button').dispatchEvent(event);
  }

  #render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    this.elem.append(...this.#getElements());

    this.elem.querySelector('.card__button').addEventListener('click', this.#btnClickHandler);

    return this.elem;
  }
}
