import * as params from '@params';

console.log('Matomo: Matomo analytics enabled');

const matomoConfig = params.analytics.matomo;
const _paq = window._paq = window._paq || [];

// Tracker methods like "setCustomDimension" should be called before "trackPageView"
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

(function() {
  const u = '//' + matomoConfig.instance + '/';
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', matomoConfig.siteId]);
  const d = document;
  const g = d.createElement('script');
  const s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();
