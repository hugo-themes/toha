---
title: note
linkTitle: note
weight: 140
---

Crea una tarjeta de notas con un título. Separa las tarjetas internas con tres guiones. Su presentación depende de estilos clásicos.

## Uso

```html
{{</* note title="Notes" */>}}
**First note.**

---
Second note.
{{</* /note */>}}
```

### Vista previa

{{< docs-preview page="/shortcode-previews/note" title="note" >}}

Esta vista previa ejecuta el shortcode heredado en un marco separado. Las integraciones remotas y el visor PDF requieren acceso a la red.

El argumento opcional `size` añade una clase CSS `<size>-note`. El tema no define variantes de tamaño; añade estilos propios antes de usarlo.
