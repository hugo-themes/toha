---
title: Despliegue el sitio en Github Pages
date: '2020-06-08T22:00:20+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Despliegue en Github Pages
weight: 20
aliases:
  - /posts/getting-started/github-pages/
---

En esta publicación, vamos a desplegar el sitio que hemos creado en la pasada publicación en [Github Pages](https://pages.github.com/). Para empezar, debemos asegurarnos que el nombre de su repositorio es `<tu usuario>.github.io`. Después, haz commit de todos los cambios no publicados y haz push a Github.

#### Crea una rama `gh-pages`

Para empezar, crea una nueva rama llamada `gh-pages`. Github automáticamente establecerá las respectivas configuraciones para Github pages cuando vea la rama con este nombre.

```bash
# crea la rama gh-pages
$ git checkout -b gh-pages
# hace push de la rama source a Github
$ git push gh-pages gh-pages
```

#### Habilite Github Action

Vamos a automatizar el proceso de despliegue usando [Github Actions](https://github.com/features/actions). En un principio, asegúrese de que Github Action esté habilitado en su repositorio. Vaya a `Settings > Actions` de su repositorio y asegúrese de que `Action permissions` esté en modo `Allow all actions`. Aquí hay una captura de pantalla de la configuración respectiva:

{{< img src="images/enable_action.png" align="center" >}}

#### Añade un Workflow

Usaremos la acción [peaceiris/actions-hugo](https://github.com/peaceiris/actions-hugo) para inicializar hugo y [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) para desplegar el sitio web. Crea un directorio `.github` en la raíz de tu repositorio. Después, crea un directorio `workflows` dentro del directorio `.github`. Finalmente, crea un archivo `deploy-site.yaml` dentro del directorio `workflows` y añade el siguiente contenido:

```yaml
name: Deploy to Github Pages

# se ejecuta cuando un commit es pusheado a la rama "source"
on:
  push:
    branches:
    - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    # checkout del commit que ha sido pusheado
    - uses: actions/checkout@v4

    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v3
      with:
        hugo-version: 'latest'
        extended: true

    - name: Update Hugo Modules
      run: hugo mod tidy

    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20

    - name: Install node modules
      run: |
        hugo mod npm pack
        npm install

    - name: Build
      run: hugo --minify

    # hace push del contenido generado a la rama `gh-pages`.
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_branch: gh-pages
        publish_dir: ./public
```

Esta acción se ejecutará en cada push de la rama `main`. Se creará el sitio web y hará un commit a la rama `gh-pages` con el contenido generado.

#### Despliegue

Si ha seguido la guía adecuadamente, su sitio debería estar listo para el despliegue en Github Pages. Ahora, si haces un push de cualquier commit a tu rama `main`, se empezará una Github Action y se desplegará su sitio web automáticamente.

Haz push de un commit a la rama `main` y vaya a la pestaña `Actions` de su repositorio para verificar que la acción ha empezado.

{{< img src="images/action_running.png" align="center" >}}

{{< vs 2 >}}

Ahora, espere que las acciones se completen. Si se han completado correctamente, debería ver un tick verde indicado que se han ejecutado correctamente.

{{< img src="images/action_completed.png" align="center" >}}

{{< vs 2 >}}

Una vez la Github Action se ha completado correctamente, puede navegar a su sitio web en `https://<su usuario>.github.io`.

{{< img src="images/site_deployed.png" align="center" >}}

#### Añade un dominio personalizado

Si posee un dominio y desea utilizarlo en este sitio web, vaya al sitio web de su proveedor del dominio. Ahí, añade los siguientes Resource Records:
```
@      3600    IN A     185.199.108.153
@      3600    IN A     185.199.109.153
@      3600    IN A     185.199.110.153
@      3600    IN A     185.199.111.153

WWW    3600    IN A     185.199.108.153
WWW    3600    IN A     185.199.109.153
WWW    3600    IN A     185.199.110.153
WWW    3600    IN A     185.199.111.153
```

Para verificar que su dominio y asegurarse que nadie de Github pueda usarlo excepto tu, puedes seguir los pasos en [esta guía](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

Finalemente, crea un archivo `CNAME` dentro del directorio `/static` de tu repositorio. Ahí añade tu dominio:

```
example.com
```

Una vez que la Github Action se haya completado correctamente, puede navegar a su sitio web en `https://<su dominio>`.

Ten en cuenta que navegando a `https://<su usuario>.github.io` será redirigido automáticamente a `https://<su dominio>`.
