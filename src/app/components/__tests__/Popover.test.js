/**
 * @jest-environment jsdom
 */

import Popover from '../Popover';

let body = null;
let target = null;
let popover = null;

beforeEach(() => {
  body = document.body;

  target = document.createElement('button');
  target.classList.add('container-popover');
  body.appendChild(target);
  target.dataset.toggle = 'popover';
  target.dataset.title = 'Popover';
  target.dataset.content = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.';
});

afterEach(() => {
  body.innerHTML = '';
  body = null;
  target = null;
  popover = null;
});

describe('Test create popover element', () => {
  test('with container target', () => {
    popover = new Popover(target);
    expect(popover.target).toEqual(target);
  });

  test('with selector target', () => {
    popover = new Popover('.container-popover');
    expect(popover.target).toEqual(target);
  });

  test('with invalid selector', () => {
    expect(() => {
      popover = new Popover('.not-existing-selector');
    }).toThrow('Target is not HTMLElement');
  });
});

describe('Test DOM manipulation', () => {
  test('not popover', () => {
    popover = new Popover(target);

    expect(document.querySelector('.popover')).toBe(null);
  });

  test('append popover', () => {
    popover = new Popover(target);

    target.click();
    expect(document.querySelector('.popover')).toBeInstanceOf(HTMLDivElement);
  });

  test('remove popover', () => {
    popover = new Popover(target);

    target.click();
    target.click();

    expect(document.querySelector('.popover')).toBe(null);
  });
});
