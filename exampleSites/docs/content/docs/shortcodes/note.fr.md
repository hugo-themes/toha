---
title: note
linkTitle: note
weight: 140
---

Créez une fiche avec un titre. Séparez les cartes internes par trois tirets. Son apparence dépend des styles historiques.

## Utilisation

```html
{{</* note title="Notes" */>}}
**First note.**

---
Second note.
{{</* /note */>}}
```

### Aperçu

{{< docs-preview page="/shortcode-previews/note" title="note" >}}

Cet aperçu exécute le shortcode historique dans un cadre séparé. Les intégrations distantes et le lecteur PDF nécessitent un accès réseau.

Le paramètre facultatif `size` ajoute une classe CSS `<size>-note`. Le thème ne définit pas de variantes de taille ; ajoutez vos propres styles avant de l’utiliser.
