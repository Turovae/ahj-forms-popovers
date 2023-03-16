/* eslint-disable no-console */
import Popover from './components/Popover';

document.querySelectorAll('[data-toggle="popover"]').forEach((elem) => {
  // eslint-disable-next-line no-new
  new Popover(elem);
});
