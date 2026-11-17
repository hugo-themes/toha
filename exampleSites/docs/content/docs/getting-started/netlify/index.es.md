---
title: Despliegue el sitio en Netlify
date: '2020-06-08T21:00:15+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Despliegue en Netlify
weight: 30
aliases:
  - /posts/getting-started/netlify/
---

[Netlify](https://www.netlify.com/) ofrece un excelente y fácil proceso para desplegar un sitio de hugo estático. Puedes desplegar su sitio web en cuestión de unos solos clics. A diferencia de Github Pages, puedes nombrar su repositorio como quieras. También puede personalizar el URL del sitio.

En esta publicación, mostraremos paso a paso el proceso de despliegue de un sitio hugo con netlify.

### Añade configuración de Netlify

Para empezar, cree un archivo `netlify.toml` a la raíz de su repositorio y añade las siguientes configuraciones:

```toml
[build]
command = "hugo --gc --minify"
publish = "public"

[context.production.environment]
HUGO_ENABLEGITINFO = "true"
HUGO_ENV           = "production"
HUGO_VERSION       = "0.120.1"
NODE_VERSION       = "v18.12.1"
NPM_VERSION        = "8.19.2"

[context.split1]
command = "hugo mod tidy && hugo mod npm pack && npm install && hugo --gc --minify --enableGitInfo"

    [context.split1.environment]
    HUGO_ENV     = "production"
    HUGO_VERSION = "0.120.1"
    NODE_VERSION = "v18.12.1"
    NPM_VERSION  = "8.19.2"

[context.deploy-preview]
command = "hugo mod tidy && hugo mod npm pack && npm install && hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"

    [context.deploy-preview.environment]
    HUGO_VERSION = "0.120.1"
    NODE_VERSION = "v18.12.1"
    NPM_VERSION  = "8.19.2"

[context.branch-deploy]
command = "hugo mod tidy && hugo mod npm pack && npm install && hugo --gc --minify -b $DEPLOY_PRIME_URL"

    [context.branch-deploy.environment]
    HUGO_VERSION = "0.120.1"
    NODE_VERSION = "v18.12.1"
    NPM_VERSION  = "8.19.2"

[context.next.environment]
HUGO_ENABLEGITINFO = "true"
```

Haz commit y haz push del archivo `netlify.toml` en Github. Ahora, está listo para desplegar su sitio con netlify.

### Despliegue el sitio

Ahora, accede a [netlify](https://www.netlify.com/). Después, vaya a la pestaña `Sites` del panel de netlify y pulsa el botón `New site from Git`.

{{< img src="images/2.png" align="center" >}}

{{< vs 2 >}}

Aparecerá una nueva ventana. Seleccione `Github` y autentificate con tu cuenta de Github.

{{< img src="images/3.png" align="center" >}}

{{< vs 2 >}}

Después de la autentificación, le pedirá que seleccione el repositorio deseado. Seleccione el repositorio que está usando para su sitio web.

{{< img src="images/4.png" align="center" >}}

{{< vs 2 >}}

Ahora, netlify te llevará a la página de despliegue. Seleccione la rama que quieres desplegar. Netlify debería completar automáticamente los campos obligatorios del archivo `netlify.toml` que creó anteriormente en esta publicación. Cuando estés satisfecho con las configuraciones, pulse el botón `Deploy`.

{{< img src="images/5.png" align="center" >}}

{{< vs 2 >}}

Ahora, netlify empezará a publicar su sitio web inmediatamente. Espera que el proceso de publicación se complete. Una vez el sitio se halla publicado, puede navegar a su sitio en el URL generado automáticamente por netlify. Este URL autogenerado ha sido apuntado por un rectángulo rojo en la captura de pantalla de abajo.

{{< img src="images/6.png" align="center" >}}

### Personaliza la URL

Puede personalizar fácilmente la URL de tu sitio con unos pocos clics mostrados a continuación.

1. Pulsa el botón `Domain Setting` debajo de la pestaña `Site Overview`.

{{< img src="images/7.png" align="center" >}}

2. Ahora, puede añadir tu dominio personal pulsando el botón `Add custom domain`, o puede usar el dominio `<su prefijo personalizado>.netlify.app`. Aquí vamos con lo último. Haga clic en `options` y seleccione `Edit site name`.

{{< img src="images/8.png" align="center" >}}

{{< vs 2 >}}

3. Después, da el nombre que quieras a tu sitio web.

{{< img src="images/9.png" align="center" >}}

{{< vs 2 >}}

4. Una vez haya guardado el nombre nuevo, verá que el URL de su sitio web se ha actualizado instantáneamente. Ahora, puede navegar a su sitio web con la nueva URL.

{{< img src="images/10.png" align="center" >}}
