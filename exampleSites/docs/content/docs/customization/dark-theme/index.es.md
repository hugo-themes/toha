---
title: Habilitar Tema Oscuro
date: '2022-06-12T01:30:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Habilitar Tema Oscuro
weight: 405
aliases:
  - /posts/customizing/dark-theme/
  - /docs/customizing/dark-theme/
---

Para habilitar el modo oscuro en Toha `v4.0.0`, simplemente establece el campo `darkMode.enable` a `true` debajo de la sección `params.features` dentro del archivo `hugo.yaml`. Por ejemplo:

```yaml
params:
  features:
    darkMode:
      enable: true
```

¡Felicidades! Estas listo. Ahora puedes disfrutar del modo oscuro en tu sitio. El modo oscuro obedecerá a las preferencias del sistema del usuario.
