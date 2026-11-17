---
title: Guía de Sintxis de Markdown
date: '2020-06-08T06:15:40+06:00'
hero: /images/posts/writing-posts/code.svg
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Guía de Markdown
weight: 30
aliases:
  - /posts/writing-posts/markdown-syntax/
  - /docs/writing-posts/markdown-syntax/
---

Este artículo ofrece un ejemplo de las bases de la sintaxis de Markdown que se pueden usar en los archivos de contenido de Hugo. También muestra cómo los elementos básicos de HTML están decorados con CSS en un tema Hugo.
<!--more-->

## Encabezados

Los siguientes elementos de HTML `<h1>`—`<h6>` representan seis niveles de encabezados de secciones. `<h1>` es el mayor nivel, mientras `<h6>` es el menor.

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Parágrafo

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Citas en bloque

El elemento de citas en bloque representa contenido citado de otra fuente, opcionalmente con una cita que debe estar dentro de un elemento `pie de página` o `cita`, y opcionalmente con cambios en línea, como anotaciones y abreviaturas.

#### Citas en bloque sin atribución

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Nota** puede usar *sintaxis de markdown* dentro de una cita en bloque.

#### Citas en bloque con atribución

> Don't communicate by sharing memory, share memory by communicating.
> — *Rob Pike[^1]*


[^1]: La cita anterior está extraída de la [charla](https://www.youtube.com/watch?v=PAAkCSZUG1c) de Rob Pike durante el Gopherfest, el 18 de noviembre de 2015.

## Tablas

Las tablas no son parte de la especificación principal de Markdown, pero Hugo las admite.

   | Nombre | Edad |
   | ------ | ---- |
   | Bob    | 27   |
   | Alice  | 23   |

#### Markdown en línea dentro de tablas

| Markdown&nbsp;&nbsp;&nbsp; | en línea&nbsp;&nbsp;&nbsp; | dentro de&nbsp;&nbsp;&nbsp;         | tablas    |
| -------------------------- | -------------------------- | ----------------------------------- | --------- |
| *cursiva*                  | **negrita**                | ~~tachado~~&nbsp;&nbsp;&nbsp;       | `código`  |

## Bloques de código

#### Bloques de código con comillas inveridas

```
html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ejemplo de documento de HTML5</title>
</head>
<body>
  <p>Prueba</p>
</body>
</html>
```
#### Bloques de código identado con cuatro espacios

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Ejemplo de documento de HTML5</title>
    </head>
    <body>
      Prueba
    </body>
    </html>

#### Bloques de código con el shortcode de resalto interno de Hugo
{{< highlight html >}}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ejemplo de documento de HTML5</title>
</head>
<body>
  Prueba
</body>
</html>
{{< /highlight >}}

## Tipos de Lista

#### Lista Ordenada

1. Primer elemento
2. Segundo elemento
3. Tercer elemento

#### Lista Desordenada

* Elemento de la lista
* Otro elemento
* Y otro elemento

#### Lista Anidada

* Fruta
  * Manzana
  * Naranja
  * Plátano
* Lácteos
  * Leche
  * Queso

## Otros Elementos — abbr, sub, sup, kbd, mark

{{< text kind="abbr" title="Graphics Interchange Format" >}}GIF{{< /text >}} es un formato de imagen de mapa de bits.

H{{< text kind="sub" >}}2{{< /text >}}O

X{{< text kind="sup" >}}n{{< /text >}} + Y{{< text kind="sup" >}}n{{< /text >}} = Z{{< text kind="sup" >}}n{{< /text >}}

Presione {{< text kind="kbd" >}}CTRL + ALT + Delete{{< /text >}} para finalizar la sesión.

La mayoría de las {{< text kind="mark" >}}salamandras{{< /text >}} son nocturnas y cazan insectos, gusanos y otras criaturas pequeñas.
