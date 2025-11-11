import * as params from '@params';

console.log('PostHog: PostHog analytics enabled');

const posthogConfig = params.analytics.posthog;

// Load PostHog script
const script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = posthogConfig.host + '/static/array.js';

script.onload = function() {
  if (window.posthog) {
    window.posthog.init(posthogConfig.apiKey, { 
      api_host: posthogConfig.host,
      ...posthogConfig.options
    });
  }
};

document.head.appendChild(script);
