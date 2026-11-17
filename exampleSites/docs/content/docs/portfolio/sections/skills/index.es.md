---
title: Configurando la sección de Habilidades
date: '2020-06-08T06:20:45+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección de Habilidades
weight: 120
aliases:
  - /posts/configuration/sections/skills/
  - /docs/configuration/sections/skills/
---

La sección de `Habilidades` ha sido diseñada para mostrar sus habilidades y proporcionar información sobre su experiencia en cada habilidad. Esta guía lo guiará a través del proceso de configuración de la sección de `Habilidades` en su sitio web. Para obtener una referencia completa, puede consultar el archivo de ejemplo [skills.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/skills.yaml).

Para empezar, crea un nuevo archivo llamado `skills.yaml` dentro del directorio `data/es/sections` de tu sitio web. Después, sigue las instrucciones de abajo.

### Añade la información de la sección

Añade la siguiente sección de metadatos en el archivo `skills.yaml`:

```yaml
section:
  name: Habilidades # Título de la sección (predeterminado: "")
  id: skills # id del url de la sección *se requiere*
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 2 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  # Opcionalmente puede ocultar el título del menú
  # hideTitle: true
```

### Añade tus habilidades

Para añadir una `habilidad` añada su información debajo de la sección `skills` dentro del archivo `skills.yaml`, como a continuación:

```yaml
# Tus habilidades
# Haz un resumen de cada habilidad.
skills:
- name: Kubernetes
  icon: "images/sections/skills/kubernetes.png"
  summary: "Capaz de implementar y administrar aplicaciones en Kubernetes. Con experiencia en escribir controladores de Kubernetes para CRD."
  url: https://kubernetes.io/
```

Aquí, debes proveer los campos `name`, `log`, y `summary` para cada habilidad. El campo `summary` debe proveer una idea sobre su profundo conocimiento de esta habilidad en particular.

>Puedes usar la sintáctica de markdown en el campo `summary`.

{{< vs 2 >}}

La siguiente imagen muestra cómo el contenido de `skills.yaml` está distribuido en la sección de `Habilidades`.

{{< img src="images/skills.png">}}
