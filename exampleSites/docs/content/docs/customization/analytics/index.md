---
title: Analytics
date: '2020-06-08T06:00:23+06:00'
description: Adding analytics in hugo theme Toha
linkTitle: Analytics
weight: 600
aliases:
  - /posts/analytics/
  - /docs/analytics/
---

## Analytics

This theme has built in support for various analytic tools. Currently, it supports the following analytics:

- [GoatCounter](https://www.goatcounter.com/)
- [Counter.dev](https://counter.dev/)
- [Google Analytics](https://analytics.google.com)
- [Matomo](https://matomo.org/)
- [Umami](https://umami.is/)
- [statcounter](https://statcounter.com)

For a complete list of supported analytics, please refer the sample [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml) file.

{{< alert type="warning" >}}
Warning: When adding analytics, you should consider local legislation to see if a privacy banner is required to inform users of the tracking in personal data. In general (not legal advice), privacy-friendly, anonymous methods such as [counter.dev](https://counter.dev) and [GoatCounter](https://www.goatcounter.com/) don't need a banner, since they do not collect personally identifiable data.
{{< /alert >}}

### Goat Counter

[GoatCounter](https://www.goatcounter.com/) is the most complete, simple and privacy friendly analytics method supported in Toha. Its script tracks the most viewed pages, total number of users, devices, and much more, all while being open source!

To enable GoatCounter analytics in your site, you have two options: one is to sign in at [goatcounter.com](https://www.goatcounter.com) and obtain a code for your site, the second is to self-hosted an instance of GoatCounter. Then, you have to add `analytics` section under `params.features` section of your `hugo.yaml` file as below:

```yaml
analytics:
  enable: true
  services:
    # GoatCounter
    goatCounter:
      code: <your GoatCounter code>  # Not self-hosted
      instance: <your GoatCounter instance url>  # For self-hosted you should use only one of the two methods
```

### Counter.dev

[counter.dev](https://counter.dev) is a simple, privacy friendly and open source analytics website which enables you to track the total user count, first visited page and some other metrics on your website. Unfortunately, to keep things simple (and free) they don't show a ranking of the most visited pages, but rather the ones that are accessed the first.

You can enable it by adding the email you registered with at counter.dev's page under `params.features` section in your `hugo.yaml` as below:

```yaml
analytics:
  enable: true
  services:
    counterDev:
      id: <your counter.dev id>
```

The tracking code will be automatically added to your site.

{{< alert type="warning" >}}
Note: On some sites, [an error has been detected](https://github.com/ihucos/counter.dev/issues/37) where only the root directory ("/") is passed over to counter.dev, so the tracking wont show anything under the "pages" section. To fix this, one can add `referrerPolicy: no-referrer-when-downgrade` as a parameter on the "counterDev" section, ensuring that new page visits are always correctly passed onto counter.dev.
{{< /alert >}}

### Google Analytics

{{< alert type="danger" >}}
Beware that [according to recent case law](https://www.euractiv.com/section/politics/short_news/use-of-google-analytics-violates-eu-law-austrian-authority-rules/), Google Analytics might be illegal in the European Union
{{< /alert >}}

You can enable Google Analytics in your site by adding your tracking id under `params.features` section in your `hugo.yaml` file as below:

```yaml
analytics:
  enable: true
  services:
    # Google Analytics
    google:
      id: <your Google Analytics tracking id>
```

You can use both V3 or V4 tracking ID. The theme will automatically detect the tracking code version and add the respective tracking scripts accordingly to your site.

For additional privacy settings regarding Google Analytics, you can provide `privacy.googleAnalytics` section in your `hugo.yaml` file as described [here](https://gohugo.io/about/hugo-and-gdpr/#all-privacy-settings).

### Matomo

You can enable Matomo (formerly Piwik) by adding the matomo configuration under `params.features` section in the `hugo.yaml` file as shown below:

```yaml
analytics:
  enable: true
  services:
    # Matomo / Piwik
    matomo:
      instance: matomo.example.com
      siteId: 1 # The number generated after adding a site in your instance
```

### Umami

[Umami](https://umami.is) is an open source analytics tool fully compliant with {{< ui-text kind="abbr" title="General Data Protection Regulation" >}}GDPR{{< /ui-text >}} and with a cookieless approach. It can be installed on-premise or you can use the provided cloud version.
You can enable the Umami tracking by adding the following configs under `params.features` section in the `config.yaml` file:

```yaml
analytics:
  enable: true
  services:
    # Umami Analytics
    umami:
      scheme: https
      instance: analytics.eu.umami.is
      id: <your Umami website id>
```
where `scheme` is the scheme (i.e: https, http) you want to use to connect to instance, and `instance` is the domain (or address) of your deployment, by default pointing to the {{< ui-text kind="abbr" title="European Union" >}}EU{{< /ui-text >}} cloud instance.

### Statcounter

[Statcounter](https://statcounter.com) is an ad-free page counter and analytics program. You can display a hit-count on the page, or leave it completely hidden and just see the stats on the statcounter website.
You can enable the statcounter tool by adding the following configs under `params.features` section in the `config.yaml` file:

```yaml
analytics:
  enable: true
  services:
    # Statcounter Analytics
  statcounter:
    project: <your project id>
    security: <your security code>
    invisible: 1
```
where `project` is the project id, and `security` is the security id from statcounter, and `invisible` tells the code whether or not to display the hit-counter on your page. `0` is visible, `1` is invisible. Invisible is suggested.
