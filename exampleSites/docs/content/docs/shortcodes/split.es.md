---
title: split
linkTitle: split
weight: 30
---

Divide Markdown en columnas de una cuadrícula de 12 unidades; separa cada columna con tres guiones. Las columnas modernas se apilan en pantallas pequeñas.

Disponible en páginas clásicas y modernas activadas; cada una usa sus propios recursos.

## Uso

```html
{{</* split 6 6 */>}}
**Left**

---
**Right**
{{</* /split */>}}
```

### Vista previa

{{< split 6 6 >}}
**Left**

---
**Right**
{{< /split >}}

## Variaciones: `4 / 4 / 4`

```html
{{</* split 4 4 4 */>}}
**Left**

---
**Middle**

---
**Right**
{{</* /split */>}}
```

### Vista previa

{{< split 4 4 4 >}}
**Left**

---
**Middle**

---
**Right**
{{< /split >}}
