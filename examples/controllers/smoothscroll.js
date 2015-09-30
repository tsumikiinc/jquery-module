import Smoothscroll from 'jquery-module/lib/smoothscroll';

export default function controllers_smoothscroll() {
  new Smoothscroll(document.querySelector('.anchor'));
}
