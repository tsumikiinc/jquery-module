import Router from 'routeur';

import smoothscroll from './controllers/smoothscroll';
import es3Smoothscroll from './controllers/es3-smoothscroll';
import shareSNS from './controllers/share-sns';

const routes = {
  '/es3-smoothscroll.html': es3Smoothscroll,
  '/smoothscroll.html': smoothscroll,
  '/share-sns.html': shareSNS
};

const router = new Router(routes);

router.run();
