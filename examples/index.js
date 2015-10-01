import Router from 'routeur';

import smoothscroll from './controllers/smoothscroll';
import es3Smoothscroll from './controllers/es3-smoothscroll';
import shareSNS from './controllers/share-sns';
import es3Imagefit from './controllers/es3-image-fit';

const routes = {
  '/es3-smoothscroll.html': es3Smoothscroll,
  '/smoothscroll.html': smoothscroll,
  '/share-sns.html': shareSNS,
  '/es3-imagefit.html': es3Imagefit
};

const router = new Router(routes);

router.run();
