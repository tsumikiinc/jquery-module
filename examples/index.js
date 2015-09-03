import crossroads from 'crossroads';

import smoothscroll from './controllers/smoothscroll';
import es3Smoothscroll from './controllers/es3-smoothscroll';
import shareSNS from './controllers/share-sns';

crossroads.addRoute('/es3-smoothscroll.html', es3Smoothscroll);
crossroads.addRoute('/smoothscroll.html', smoothscroll);
crossroads.addRoute('/share-sns.html', shareSNS);

crossroads.parse(location.pathname);
