---
title: Configurando la sección de Educación
date: '2020-06-08T06:20:40+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección de Educación
weight: 135
aliases:
  - /posts/configuration/sections/education/
  - /docs/configuration/sections/education/
---

La sección de `Educación` ha sido diseñada para mostrar su formación académica. En esta publicación, le guiaré a través del proceso de configuración de la sección de `Educación` en su sitio web. Para obtener una referencia completa, puede consultar el archivo de ejemplo [education.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/education.yaml).

Para empezar, crea un nuevo archivo llamado `education.yaml` dentro del directorio `data/es/sections` de tu sitio web. Después, sigue las instrucciones de abajo.

### Añade la información de la sección

Añade la siguiente sección de metadatos en el archivo `education.yaml`:

```yaml
section:
  name: Educación # Título de la sección (predeterminado: "")
  id: education # id del url de la sección *se requiere*
  template: sections/education.html # Usa "sections/education-alt.html" para una plantilla alterna
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 4 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  # Opcionalmente puede ocultar el título del menú
  # hideTitle: true
```

### Añade sus grados académicos

Para añadir una educación, incluya la información respectiva en la sección `degrees` en el archivo `education.yaml` como se muestra a continuación:

```yaml
degrees:
- name: Doctorado en Criptografía Cuántica
  icon: fa-microscope
  timeframe: 2016-2020
  institution:
    name: Universidad de Teconología ABC
    url: "#"
    logo: /images/education/college.png # Ruta del logo
    darkLogo: /images/education/college-dark.png #(opcional), opcionalmente puede mostrar un logo distinto para el tema oscuro.
  grade: #(opcional)
    scale: CGPA
    achieved: 3.6
    outOf: 4
  publications: #(opcional)
  - title: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    url: "#"
  - title: Fusce eu augue ut odio porttitor pulvinar.
    url: "#"
  - title: Nullam vitae orci tincidunt purus viverra pulvinar.
    url: "#"
  extracurricularActivities: #(opcional), suporta markdown
  - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  - Fusce eu augue ut odio porttitor pulvinar.
  custonSections: #(opcional)
    - name: Tesis
      content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - name: Supervisor
      content: Fusce eu augue ut odio porttitor pulvinar.
```

Asegúrese que el icono que utilices esté disponible en [Font Awesome](https://fontawesome.com/icons?d=gallery&m=free).
