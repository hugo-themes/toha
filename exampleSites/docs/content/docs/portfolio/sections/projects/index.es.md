---
title: Configurando la sección de Proyectos
date: '2020-06-08T06:20:35+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección de Proyectos
weight: 140
aliases:
  - /posts/configuration/sections/projects/
  - /docs/configuration/sections/projects/
---

El propósito de la sección `Proyectos` es mostrar eficazmente sus proyectos. En esta publicación, le guiaré a través del proceso de configuración de la sección de `Proyectos` en su sitio web. Para obtener una referencia completa, puede consultar el archivo de ejemplo [projects.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/projects.yaml).

Para empezar, crea un nuevo archivo llamado `projects.yaml` dentro del directorio `data/es/sections` de tu sitio web. Después, sigue las instrucciones de abajo.

### Añade la información de la sección

Añade la siguiente sección de metadatos en el archivo `projects.yaml`:

```yaml
section:
  name: Proyectos # Título de la sección (predeterminado: "")
  id: projects # id del url de la sección *se requiere*
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 5 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  # Opcionalmente puede ocultar el título del menú
  # hideTitle: true
```

### Añade los botones de filtrado de proyectos

Ahora, añade una sección `buttons` dentro del archivo `projects.yaml`, como a continuación,

```yaml
buttons:
- name: Todos
  filter: "all"
- name: Professional
  filter: "professional"
- name: Académico
  filter: "academic"
- name: Hobby
  filter: "hobby"
```

Cada botón tiene dos propiedades. La primera propiedad es `name`, que es el texto que se mostrará en el botón, y la otra es `filter` que especifica la categoría de los proyectos que el botón debe seleccionar.

Un botón solo mostrará los proyectos que tengan una etiqueta que coincida con el texto especificado en el campo `filter`. El filtro del valor `all` es tratado especialmente. Selecciona todos los proyectos aunque no tengan la etiqueta `all` en su campo `tags`.

### Añade tus proyectos

Ahora, añade tus proyectos debajo de la sección `projects` del archivo, `projects.yaml` como a continuación,

```yaml
projects:
- name: Kubernetes
  logo: images/sections/projects/kubernetes.png
  role: Contribuidor
  timeline: "Marzo 2018 - Presente"
  repo: https://github.com/kubernetes/kubernetes
  #url: ""
  summary: Programación y gestión de contenedores de nivel de producción.
  tags: ["professional", "kubernetes", "cloud"]
```

Puedes especificar los siguientes campos en cada proyecto,

- **name**: Nombre del proyecto.
- **logo**: Logo del proyecto. Si el proyecto no tiene logo, el tema automáticamente añadirá un marcador de posición allí.
- **role**: Tu rol en el proyecto.
- **timeline**: Intervalo de tiempo que has trabajado en el proyecto.
- **repo**: Si tu proyecto tiene un repositorio público de Github, entonces provee el enlace. Mostrará el contador de estrellas.
- **url**: Si tu proyecto no tiene un repositorio público, pero tiene una página web u otra url de detalles externos, proveelo aquí. No provees "repo" y "url" a la vez. Esto creará un botón con un enlace en la tarjeta del proyecto.
- **summary**: Breve descripción del proyecto.
- **tags**: Lista de etiquetas de tu proyecto. Se usarán para seleccionar el proyecto debajo de una categoría con los botones de filtrado.

>Puedes usar la sintáctica de markdown en el campo `summary`.

{{< vs 2 >}}

La siguiente imagen muestra cómo el contenido de `projects.yaml` está distribuido en la sección de `Proyectos`.

{{< img src="images/projects.png" >}}
