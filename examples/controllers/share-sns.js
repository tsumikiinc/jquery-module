import ShareSNS from 'utiljs/lib/share-sns';

export default function controllers_shareSns() {
  new ShareSNS(document.querySelector('.twitter'), {type: 'twitter'});
  new ShareSNS(document.querySelector('.fb'), {type: 'facebook'});
  new ShareSNS(document.querySelector('.gplus'), {type: 'google'});
}
