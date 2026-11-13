import * as params from '@params';

if (params.analytics) {
  if (params.analytics.statcounter) {
    import('./statcounter');
  }
  if (params.analytics.posthog) {
    import('./posthog');
  }
  if (params.analytics.matomo) {
    import('./matomo');
  }
}
