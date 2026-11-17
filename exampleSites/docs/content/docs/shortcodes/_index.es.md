---
title: Shortcodes
date: '2020-06-08T08:06:25+06:00'
description: Los Shortcodes
author:
  name: BernatBC
  image: images/author/bernatbc.png
hero: boat.jpg
linkTitle: Shortcodes
weight: 90
aliases:
  - /posts/shortcodes/
---

Adaptadores Markdown para contenido y componentes modernos. Elige un shortcode; las demostraciones originales aparecen debajo.

- [alert]({{< relref "/docs/shortcodes/alert" >}})
- [img]({{< relref "/docs/shortcodes/img" >}})
- [split]({{< relref "/docs/shortcodes/split" >}})
- [vs]({{< relref "/docs/shortcodes/vs" >}})
- [video]({{< relref "/docs/shortcodes/video" >}})
- [mermaid]({{< relref "/docs/shortcodes/mermaid" >}})
- [ui-button]({{< relref "/docs/shortcodes/ui-button" >}})
- [ui-badge]({{< relref "/docs/shortcodes/ui-badge" >}})
- [ui-callout]({{< relref "/docs/shortcodes/ui-callout" >}})
- [ui-disclosure]({{< relref "/docs/shortcodes/ui-disclosure" >}})
- [ui-text]({{< relref "/docs/shortcodes/ui-text" >}})
- [embed-pdf]({{< relref "/docs/shortcodes/embed-pdf" >}})
- [rimg]({{< relref "/docs/shortcodes/rimg" >}})
- [note]({{< relref "/docs/shortcodes/note" >}})
- [gist]({{< relref "/docs/shortcodes/gist" >}})
- [mastodon]({{< relref "/docs/shortcodes/mastodon" >}})


Esta es una publicación de ejemplo con el objetivo de testear lo siguiente:

- Imagen de hero determinada.
- Los distintos shortcodes.

## Alerta

Las siguientes alertas están disponibles en este tema.

#### Éxito

**Código:**

```markdown
{{</* alert type="success" */>}}
Esto es un ejemplo de alerta con `type="success"`.
{{</* /alert */>}}
```

**Resultado:**

{{< alert type="success" >}}
Esto es un ejemplo de alerta con `type="success"`.
{{< /alert >}}

#### Peligro

**Código:**

```markdown
{{</* alert type="danger" */>}}
Esto es un ejemplo de alerta con `type="danger"`.
{{</* /alert */>}}
```

**Resultado:**

{{< alert type="danger" >}}
Esto es un ejemplo de alerta con `type="danger"`.
{{< /alert >}}

#### Advertencia

**Código:**

```markdown
{{</* alert type="warning" */>}}
Esto es un ejemplo de alerta con `type="warning"`.
{{</* /alert */>}}
```

**Resultado:**

{{< alert type="warning" >}}
Esto es un ejemplo de alerta con `type="warning"`.
{{< /alert >}}

#### Inforamación

**Código:**

```markdown
{{</* alert type="info" */>}}
Esto es un ejemplo de alerta con `type="info"`.
{{</* /alert */>}}
```

**Resultado:**

{{< alert type="info" >}}
Esto es un ejemplo de alerta con `type="info"`.
{{< /alert >}}

## Imagen

#### Una imagen de ejemplo sin ningún atributo.

**Código:**

```markdown
{{</* img src="boat.jpg" title="Una barca en el mar" */>}}
```

**Resultado:**

{{< img src="boat.jpg" title="Una barca en el mar" >}}

{{< vs 3 >}}

#### Una imagen de ejemplo con los atributos `height` y `width`.

**Código:**

```markdown
{{</* img src="boat.jpg" height="400" width="600" title="Una barca en el mar" */>}}
```

**Resultado:**

{{< img src="boat.jpg" height="400" width="600" title="Una barca en el mar" >}}

{{< vs 3 >}}

#### Una imagen de ejemplo centrada con los atributos `height` y `width`.

**Código:**

```markdown
{{</* img src="boat.jpg" height="400" width="600" align="center" title="Una barca en el mar" */>}}
```

**Resultado:**

{{< img src="boat.jpg" height="400" width="600" align="center" title="Una barca en el mar" >}}

{{< vs 3 >}}

#### Una imagen de ejemplo con el atributo `float`.

**Código:**

```markdown
{{</* img src="boat.jpg" height="200" width="500" float="right" title="Una barca en el mar" */>}}
```

**Resultado:**

{{< img src="boat.jpg" height="200" width="500" float="right" title="Una barca en el mar" >}}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies. Praesent tellus risus, eleifend vel efficitur ac, venenatis sit amet sem. Ut ut egestas erat. Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat. Suspendisse nec ipsum eu erat finibus dictum. Morbi volutpat nulla purus, vel maximus ex molestie id. Nullam posuere est urna, at fringilla eros venenatis quis.

Fusce vulputate dolor augue, ut porta sapien fringilla nec. Vivamus commodo erat felis, a sodales lectus finibus nec. In a pulvinar orci. Maecenas suscipit eget lorem non pretium. Nulla aliquam a augue nec blandit. Curabitur ac urna iaculis, ornare ligula nec, placerat nulla. Maecenas aliquam nisi vitae tempus vulputate.

## División

Este tema soporta dividir la página en tantas columnas como desee.

#### División en dos columnas

**Código:**

```markdown
{{</* split 6 6 */>}}
##### Columna Izquierda

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Columna Derecha

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{</* /split */>}}
```

**Resultado:**

{{< split 6 6>}}

##### Columna Izquierda

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Columna Derecha

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

#### División en tres columnas

**Código:**

```markdown
{{</* split 4 4 4 */>}}
##### Columna Izquierda

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Columna Central

Aenean dignissim dictum ex. Donec a nunc vel nibh placerat interdum.

---
##### Columna Derecha

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{</* /split */>}}
```

**Resultado:**

{{< split 4 4 4 >}}

##### Columna Izquierda

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Columna Central

Aenean dignissim dictum ex. Donec a nunc vel nibh placerat interdum.

---
##### Columna Derecha

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

## Espacio Vertical

Da espacio vertical entre dos líneas.

**Código:**

```markdown
Esta es la primera línea.
{{</* vs 4*/>}}
This is line two. It should have `4rem` vertical space with previous line.
Esta es la segunda línea. Debería tener un espacio vertical `4rem` con la línea previa.
```

**Resultado:**

Esta es la primera línea.
{{< vs 4>}}
Esta es la segunda línea. Debería tener un espacio vertical `4rem` con la línea previa.

## Vídeo

**Código:**

```markdown
{{</* video src="/videos/sample.mp4" */>}}
```

**Resultado:**

{{< video src="/videos/sample.mp4" >}}

<!-- markdown-link-check-disable-next-line -->
Video por [Rahul Sharma](https://www.pexels.com/@rahul-sharma-493988) de [Pexels](https://www.pexels.com).
