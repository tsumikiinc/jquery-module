import Imagefit from 'jquery-module/lib/es3-imagefit';

export default function controllers_es3Imagefit() {
  new Imagefit(document.querySelector('.js-image'));
}
