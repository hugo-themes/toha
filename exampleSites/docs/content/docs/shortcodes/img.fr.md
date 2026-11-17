---
title: img
linkTitle: img
weight: 20
---

Une image provenant d’un bundle, des assets ou d’une URL statique. Ajoutez un texte alternatif utile.

Disponible sur les pages historiques et modernes activées ; chacune utilise ses propres ressources.

## Utilisation

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" */>}}
```

### Aperçu

{{< img src="boat.jpg" title="A boat at sea" >}}

## Variantes: `width, align`

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" width="600" align="center" */>}}
```

### Aperçu

{{< img src="boat.jpg" title="A boat at sea" width="600" align="center" >}}

## Variantes: `height, width`

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" height="200" width="300" */>}}
```

### Aperçu

{{< img src="boat.jpg" title="A boat at sea" height="200" width="300" >}}
