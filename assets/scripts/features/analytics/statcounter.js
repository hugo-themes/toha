import * as params from '@params';

console.log('StatCounter: Statcounter enabled');
/* eslint-disable camelcase */
const sc_project = params.analytics.statcounter.project;
const sc_invisible = params.analytics.statcounter.invisible;
const sc_security = params.analytics.statcounter.security;
/* eslint-enable camelcase */

const ns = document.createElement('noscript');
ns.setAttribute('class', 'statcounter');
const a = document.createElement('a');
a.setAttribute('title', 'web counter');
a.setAttribute('href', 'https://statcounter.com/');
a.setAttribute('target', '_blank');
const img = document.createElement('img');
img.setAttribute('class', 'statcounter');
/* eslint-disable camelcase */
img.setAttribute('src', 'https://c.statcounter.com/' + sc_project + '/0/' + sc_security + '/' + sc_invisible + '/');
/* eslint-enable camelcase */
img.setAttribute('alt', 'web counter');
img.setAttribute('referrerPolicy', 'no-referrer-when-downgrade');
ns.appendChild(a);
a.appendChild(img);
document.body.appendChild(ns);

// Load StatCounter script
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://www.statcounter.com/counter/counter.js';
script.async = true;

// Set up StatCounter variables before loading the script
/* eslint-disable camelcase */
window.sc_project = sc_project;
window.sc_invisible = sc_invisible;
window.sc_security = sc_security;
window.scJsHost = 'https://www.statcounter.com/js/';
/* eslint-enable camelcase */

document.head.appendChild(script);
