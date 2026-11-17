---
title: split
linkTitle: split
weight: 30
---

Répartissez le Markdown en colonnes sur une grille de 12 unités ; séparez chaque colonne par trois tirets. Les colonnes modernes s’empilent sur petit écran.

Disponible sur les pages historiques et modernes activées ; chacune utilise ses propres ressources.

## Utilisation

```html
{{</* split 6 6 */>}}
**Left**

---
**Right**
{{</* /split */>}}
```

### Aperçu

{{< split 6 6 >}}
**Left**

---
**Right**
{{< /split >}}

## Variantes: `4 / 4 / 4`

```html
{{</* split 4 4 4 */>}}
**Left**

---
**Middle**

---
**Right**
{{</* /split */>}}
```

### Aperçu

{{< split 4 4 4 >}}
**Left**

---
**Middle**

---
**Right**
{{< /split >}}
