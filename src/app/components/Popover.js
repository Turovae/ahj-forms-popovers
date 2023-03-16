/* eslint-disable no-underscore-dangle */
/* eslint no-param-reassign: ["error", { "props": false }] */
import './Popover.css';

export default class Popover {
  constructor(target) {
    this.target = typeof target === 'string'
      ? document.querySelector(target)
      : target;
    if (!(this.target instanceof HTMLElement)) {
      throw new Error('Binding is not HTMLElement');
    }

    this._popover = null;
    // this._isShow = false;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.create();
  }

  create() {
    this._popover = document.createElement('div');
    this._popover.classList.add('popover');

    const { title, content } = this.target.dataset;
    if (title) {
      this.append('header', title);
    }

    if (content) {
      this.append('body', content);
    }

    this.target.addEventListener('click', this.show);
  }

  append(type, text) {
    const elem = document.createElement('div');
    elem.classList.add(`popover-${type}`);
    elem.textContent = text;
    this._popover.appendChild(elem);
  }

  bindToDom() {
    document.body.appendChild(this._popover);
  }

  show() {
    this.bindToDom();
    this.target.addEventListener('click', this.hide);
    this.target.removeEventListener('click', this.show);

    Popover.setCoords(this._popover, this.target);
  }

  hide() {
    this._popover.remove();
    this.target.addEventListener('click', this.show);
    this.target.removeEventListener('click', this.hide);
  }

  static getCoords(elem) {
    const {
      top, left, right, bottom, width, height,
    } = elem.getBoundingClientRect();

    return {
      top: top + window.pageYOffset,
      right: right + window.pageXOffset,
      bottom: bottom + window.pageYOffset,
      left: left + window.pageXOffset,
      width,
      height,
    };
  }

  static setCoords(placed, ref) {
    const placedCoords = Popover.getCoords(placed);
    const referenceCoords = Popover.getCoords(ref);

    placed.style.top = `calc(${referenceCoords.top - placedCoords.height}px - 0.5rem)`;

    const left = referenceCoords.left + referenceCoords.width / 2 - placedCoords.width / 2;

    placed.style.left = left > 0 ? `${left}px` : `${referenceCoords.left}px`;
  }
}
