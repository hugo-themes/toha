---
title: Prepare su sitio web
date: '2020-06-08T23:00:20+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Prepare su sitio web
weight: 10
aliases:
  - /posts/getting-started/prepare-site/
---

Para desarrollar el tema, sigue la [guía rápida actual]({{< relref "/docs/getting-started/quickstart" >}}): todos los ejemplos se ejecutan desde el repositorio de Toha. La preparación independiente siguiente usa el [repositorio inicial existente](https://github.com/hugo-themes/toha-example-site), disponible mientras se preparan las exportaciones vinculadas a versiones publicadas. Puedes hacer un fork de ese repositorio; `exampleSites/portfolio/` es una referencia de configuración, no un repositorio que puedas bifurcar por separado. Instala Hugo Extended, Go, Node y Dart Sass con mise; las versiones fijadas están en el `mise.toml` del tema.

```sh
mise use hugo-extended@0.169.0 github:sass/dart-sass@1.108.2 go@latest node@latest
```

En esta publicación, vamos a crear un sitio de hugo desde cero. Después, lo configuraremos con el tema `Toha`, lo haremos plurilingüe, y añadiremos publicaciones de ejemplo. Al final de esta publicación, deberías poder ejecutar un sitio hugo con el tema `Toha` totalmente funcional localmente.

Si quieres un atajo, puedes simplemente hacer un fork del repositorio [hugo-toha/hugo-toha.github.io](https://github.com/hugo-themes/toha-example-site), renombrarlo y actualizarlo con tus datos. Este repositorio ya está configurado para el despliegue en [Github Pages](https://pages.github.com/) y [Netlify](https://www.netlify.com/).

### Crea el Repositorio

Para empezar, crea un repositorio en Github. Si quieres desplegar este sitio en Github Pages, el nombre de tu repositorio debería ser `<su usuario>.github.io`. Clona el repositorio en tu máquina local y dirígete hacia él.

### Crea el sitio

Ahora, asegúrese que tiene [Hugo](https://gohugo.io/getting-started/installing/) instalado. Este tema debería funcionar con la versión de hugo `v0.163.0` o posterior. Ahora, ejecuta el siguiente comando en la raíz de su repositorio para inicializar un sitio web de hugo.

```console
hugo new site ./ --format=yaml --force
```

Este comando creará una estructura básica de un sitio de hugo. Aquí, el parámetro `-f=yaml` indica a hugo que cree el archivo de configuración en el formato YAML, y el parámetro `--force` fuerza a hugo que cree el sitio aunque el directorio destino no esté vacío. Creará un archivo `hugo.yaml`  que contendrá todas las configuraciones necesarias para su sitio.

### Añade el tema

Vamos a usar el módulo de hugo para añadir el tema `Toha` a nuestro sitio web. Para empezar, inicializa los módulos de hugo usando el siguiente comando:

```bash
hugo mod init github.com/<su usuario>/<su repositorio>
```

Este comando creará un archivo `go.mod` a la raíz de su repositorio.

Después, añade la siguiente sección de módulo en el archivo `hugo.yaml`:

```yaml
module:
  imports:
  - path: github.com/hugo-toha/toha/v4
  mounts:
  - source: ./node_modules/flag-icon-css/flags
    target: static/flags
  - source: ./node_modules/@fontsource/mulish/files
    target: static/files
  - source: ./node_modules/katex/dist/fonts
    target: static/fonts
```

Finalmente, ejecuta los siguientes comandos para descargar el tema y sus dependencias:

```bash
# descargar el tema
hugo mod get -u
# descargar las dependencias del tema
hugo mod tidy
# genera dependencias de node
hugo mod npm pack
# instala dependencias
npm install
```

### Ejecuta el sitio web localmente

Ahora, ya puedes ejecutar tu sitio web localmente. Lo ejecutaremos en modo observador con el siguiente comando:

```console
hugo server -w
```

Si navega hacia `http://localhost:1313`, debería ver un sitio web básico con el tema Toha. En la siguiente sección, configuraremos el sitio para que se parezca a [hugo-toha.github.io](https://hugo-toha.github.io/). Como hemos ejecutado el server en modo observador, cualquier cambio que hagamos al sitio, será visible instantáneamente en el navegador.

### Configura el sitio

Ahora, ya estamos preparados para configurar nuestro sitio web. En esta sección, añadiremos la información de autor, diferentes secciones, publicaciones de ejemplo, etc.

#### Actualiza `hugo.yaml`

Cuando ha creado el sitio usando el comando `hugo new site`, ha creado un archivo `hugo.yaml` en la raíz de su repositorio. Substituye el contenido por defecto del archivo `hugo.yaml` por el siguiente:

```yaml
baseURL: https://hugo-toha.github.io

languageCode: en-us
title: "John's Blog"

# Utiliza Hugo modules para añadir el tema

module:
  imports:
  - path: github.com/hugo-toha/toha/v4
  mounts:
  - source: static/files
    target: static/files
  - source: ./node_modules/flag-icon-css/flags
    target: static/flags
  - source: ./node_modules/@fontsource/mulish/files
    target: static/files
  - source: ./node_modules/katex/dist/fonts
    target: static/fonts

# Administrar idiomas
# Para más detalles, puedes visitar la documentación oficial de hugo: https://gohugo.io/content-management/multilingual/
languages:
  es:
    languageName: Español
    weight: 1
  en:
    languageName: English
    weight: 2

# Forzar el uso de una configuración regional, ¡realmente útil para desarrollar la aplicación!
# DefaultContentLanguage: bn

# Autorizar raw html en markdown
markup:
  goldmark:
    renderer:
      unsafe: true
  tableOfContents:
    startLevel: 2
    endLevel: 6
    ordered: false

# Al menos HTML y JSON son requeridos por el contenido principal de HTML y búsqueda de Javascript en el lado del cliente.
outputs:
  home:
    - HTML
    - RSS
    - JSON

# Habilitar soporte global de emojis
enableEmoji: true

# Parámetros del sitio
params:
  # URL del repositorio de Github de tu sitio web
  gitRepo: https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio

  features:
    # Habilitar sección de portfolio
    portfolio:
      enable: true

    # Habilitar publicaciones de Blog
    blog:
      enable: true

    # Habilitar tabla de contenido en la página de lectura
    toc:
      enable: true

  # Configurar pie de págna
  footer:
    enable: true
```

Aquí, está viendo la configuración básica del tema de Toha. Puede ver el archivo de configuración usado en el sitio web de ejemplo [aquí](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml). Para más detalles en las opciones de configuración, por favor visite [esta publicación](/es/posts/configuration/site-parameters/).

#### Añade datos

La mayoría del contenido de este tema es manejado por algún archivo YAML dentro del directorio `data`. En esta sección, vamos a añadir datos de ejemplo. Ya que estamos construyendo un sitio plurilingüe, vamos a mantener los datos de cada idioma separados en su propio directorio de idioma.

Para empezar, crea el directorio `es` dentro del directorio `data`. Aquí vamos a añadir los datos en el idioma `Español`.

##### Información del sitio

Ahora, crea un sitio `site.yaml` dentro del directorio `/data/es/` de tu repositorio. Añade el siguiente contenido:

```yaml
# Aviso de copyright
copyright: © 2024 Copyright.

# Meta descripción de su sitio. Esto ayudará a los motores de búsqueda a encontrar su sitio.
description: Página de ejemplo del tema de hugo Toha.
```

Para ver todas las opciones disponibles para la información del sitio, visite [este archivo de ejemplo](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/site.yaml).

##### Información del Autor

Ahora, crea un archivo `author.yaml` dentro del directorio `/data/es/` y añade tu información como a continuación:

```yaml
# Alguna información sobre ti
name: "John Doe"
nickname: "John"
# mensaje de saludo antes de tu nombre. El valor predeterminado será "Hi!, I am" si no se proporciona.
greeting: "Hola, soy"
image: "images/author/john.png"
# da tu información de contacto. Se utilizará en el pie de página
contactInfo:
  email: "johndoe@example.com"
  phone: "+0123456789"
  github: johndoe
  linkedin: johndoe

# Un pequeño resumen de lo que haces
summary:
  - Soy un desarrollador
  - Soy un Devops
  - Me gustan los servers
  - Trabajo en proyectos de código abierto
  - Me gusta trabajar en proyectos divertidos
```

##### Añade secciones

Ahora, vamos a añadir distintas secciones en nuestra página de inicio. Al principio, crea un directorio `sections` dentro de tu directorio `/data/es`. Aquí añadiremos algunas secciones con configuraciones mínimas. Para ver opciones de configuraciones detalladas para las secciones, por favor, visite [aquí](/es/posts/configuration/sections/).

###### Sección Sobre mi

Crea un archivo `about.yaml` dentro del directorio `/data/es/sections/`. Después añade el siguiente contenido:

```yaml
# Información de la sección
section:
  name: Sobre mi
  id: about
  enable: true
  weight: 1
  showOnNavbar: true

# Tu designación
designation: Ingeniero de Software
# Información de tu empresa
company:
  name: Example Co.
  url: "https://www.example.com"

# tu currículum. Este archivo debe ser relativo a tu directorio "static"
resume: "files/resume.pdf"

# Un resumen sobre ti
summary: 'Soy un ingeniero de software apsionado con x años de experiencia. He creado herramientas OSS para [Kubernetes](https://kubernetes.io/) utilizando Go. Mis herramientas ayudan a personas a desplegar sus workloads en Kubernetes. A veces trabajo en projectos divertidos como crear un tema, etc.'

# tus links de redes sociales
# da tantos como quieras. Utilitza font-awesome para los iconos.
socialLinks:
- name: Email
  icon: "fas fa-envelope"
  url: "example@gmail.com"

- name: Github
  icon: "fab fa-github"
  url: "https://www.github.com/example"

- name: Stackoverflow
  icon: "fab fa-stack-overflow"
  url: "#"

- name: LinkedIn
  icon: "fab fa-linkedin"
  url: "#"

- name: Twitter
  icon: "fab fa-twitter"
  url: "#"

- name: Facebook
  icon: "fab fa-facebook"
  url: "#"

# competencias sociales
# Da un percentaje entre 50 y 100, en intervalos de 5 unidades.
# colores soportados: blue, yellow, pink, green, sky, orange.
softSkills:
- name: Liderazgo
  percentage: 85
  color: blue
- name: Trabajo en equipo
  percentage: 90
  color: yellow
- name: Comunicación
  percentage: 85
  color: pink
- name: Trabajo duro
  percentage: 85
  color: green
- name: Aprendizaje rápido
  percentage: 85
  color: sky
- name: Solucionador de problemas
  percentage: 85
  color: orange
# también puede dar códigos de colores en vez de un nombre de color predeterminado
# - name: Example 1
#   percentage: 75
#   color: "#00adb5"
# - name: Example 2
#   percentage: 65
#   color: "#8b8383"
```

pon el archivo `resume.pdf` dentro del directorio `/static/files` de tu repositorio. Puedes encontrar el archivo `about.yaml` usado en el sitio web de ejemplo [aquí](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/about.yaml).

###### Añade las otras secciones

Para mantener esta publicación breve, la hemos dividido en distintas publicaciones. A continuación hay la lista de publicaciones que te guiará en cómo configurar las otras secciones.

- [Configurando la sección Sobre mi](/es/posts/configuration/sections/about/).
- [Configurando la sección de Educación](/es/posts/configuration/sections/education/).
- [Configurando la sección de Experiencia](/es/posts/configuration/sections/experiences/).
- [Configurando la sección de Proyectos](/es/posts/configuration/sections/projects/).
- [Configurando la sección de Publicaciones Recientes](/es/posts/configuration/sections/recent-posts/).
- [Configurando la sección de Logros](/es/posts/configuration/sections/achievements/).
- [Configurando la sección de Habilidades](/es/posts/configuration/sections/skills/).

#### Añade Publicaciones

Ahora, ya estamos listos para añadir nuestra primera publicación a nuestro sitio. Aquí, añadiremos [esta publicación](https://hugo-toha.github.io/posts/introduction/).

- Para empezar, crea un directorio `posts` dentro del directorio `content` de tu sitio.
- Después, crea un archivo `_index.md` dentro del directorio `posts`. Copia el contenido de [este archivo](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/_index.md) y pégalo dentro del archivo `_index.md` creado recientemente.
- Crea un directorio `introduction` dentro del directorio `posts`.
- Añade el siguiente [hero.svg](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/introduction/hero.svg) dentro de tu directorio `introduction`.
- Ahora, crea un archivo `index.md` dentro del directorio `introduction`. Este `index.md` tendrá el contenido de la publicación.
- Añade el siguiente [contenido de ejemplo](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/introduction/index.md) dentro del archivo `index.md` creado recientemente.

Ahora, tu publicación debería aparecer en `http://localhost:1313/posts` y tu sección `Publicaciones Recientes` también mostrarán esta tarjeta. Para traducir una publicación, simplemente crea un archivo con el nombre `index.<código de idioma>.md` en el mismo directorio. Después, añade el contenido traducido ahí.

Para más publicaciones de ejemplo, por favor, visite [aquí](https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio/content/posts).

### Siguientes pasos

En este punto, tu sitio debería ser similar al de [ejemplo](https://hugo-toha.github.io/). Ahora, es hora de desplegar tu sitio web. Puedes seguir las siguientes guías de despliegue:

- [Despliegue en Github Pages](/es/posts/getting-started/github-pages/)
- [Despliegue en Netlify](/es/posts/getting-started/netlify/)
