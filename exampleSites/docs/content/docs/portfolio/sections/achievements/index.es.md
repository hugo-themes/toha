---
title: Configurando la sección de Logros
date: '2020-06-08T06:20:30+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección de Logros
weight: 160
aliases:
  - /posts/configuration/sections/achievements/
  - /docs/configuration/sections/achievements/
---

La sección de `Logros` ha sido diseñada para mostrar sus logros en un formato de galería visualmente atractivo. Esta guía lo guiará a través del proceso de configuración de la sección de `Logros` en su sitio web. Para obtener una referencia completa, puede consultar el archivo de ejemplo [achievements.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/achievements.yaml).

Para empezar, crea un nuevo archivo llamado `achievements.yaml` dentro del directorio `data/es/sections` de tu sitio web. Después, sigue las instrucciones de abajo.

### Añade la información de la sección

Añade la siguiente sección de metadatos en el archivo `achievements.yaml`:

```yaml
section:
  name: Logros # Título de la sección (predeterminado: "")
  id: achievements # id del url de la sección *se requiere*
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 9 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  # Opcionalmente puede ocultar el título del menú
  # hideTitle: true
```

### Añade tus logros

Para añadir tus logros, abre el archivo `achievements.yaml` e incluye las siguientes entradas debajo de la sección `achievements`:

```yaml
achievements:
- title: Mejor presentador
  image: images/sections/achievements/presenter.jpg
  summary: Mejor presentador en la conferencia XYZ 2020.
```

Cada entrada de logro, debe tener los siguientes campos,

- **title**: El título del logro.
- **image**: La imagen del logro.
- **summary**: Un resumen del logro.

>Puedes usar la sintáctica de markdown en el campo `summary`.

{{< vs 2 >}}

La siguiente imagen muestra cómo el contenido de `achievements.yaml` está distribuido en la sección de `Logros`.

{{< img src="images/achievements.png" >}}
