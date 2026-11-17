---
title: Shortcodes
date: '2023-11-05T14:06:25+02:00'
description: Codes abrégés
hero: boat.jpg
linkTitle: Shortcodes
weight: 90
aliases:
  - /posts/shortcodes/
---

Adaptateurs Markdown pour le contenu et les composants modernes. Choisissez un shortcode ci-dessous ; les démonstrations originales suivent.

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


Ce billet d'échantillon est destiné à tester les éléments suivants :

- Différents blocs d'alerte.
- Manipulation d'une image.
- Différents shortcodes.

## Alerte

Les alertes suivantes sont disponibles dans ce thème.

### Succès

**code**

```markdown
{{</* alert type="success" */>}}
This is sample alert with `type="success"`.
{{</* /alert */>}}
```

**Résultat:**

{{< alert type="success" >}}
This is sample alert with `type="success"`.
{{< /alert >}}

#### Danger

**Code:**

```markdown
{{</* alert type="danger" */>}}
This is sample alert with `type="danger"`.
{{</* /alert */>}}
```

**Résultat:**

{{< alert type="danger" >}}
This is sample alert with `type="danger"`.
{{< /alert >}}

#### Warning

**Code:**

```markdown
{{</* alert type="warning" */>}}
This is sample alert with `type="warning"`.
{{</* /alert */>}}
```

**Résultat:**

{{< alert type="warning" >}}
This is sample alert with `type="warning"`.
{{< /alert >}}

#### Info

**Code:**

```markdown
{{</* alert type="info" */>}}
This is sample alert with `type="info"`.
{{</* /alert */>}}
```

**Résultat:**

{{< alert type="info" >}}
This is sample alert with `type="info"`.

{{< /alert >}}

## Image

#### Une image sans attributs.

**Code:**

```markdown
{{</* img src="boat.jpg" title="A boat at the sea" */>}}
```

**Résultat:**

{{< img src="boat.jpg" title="A boat at the sea" >}}

{{< vs 3 >}}

#### Une image avec les attributs `height` et `width`.

**Code:**

```markdown
{{</* img src="boat.jpg" height="400" width="600" title="A boat at the sea" */>}}
```

**Résultat:**

{{< img src="boat.jpg" height="400" width="600" title="A boat at the sea" >}}

{{< vs 3 >}}

#### Une image centrée avec les attributs `height` et `width`.

**Code:**

```markdown
{{</* img src="boat.jpg" height="400" width="600" align="center" title="A boat at the sea" */>}}
```

**Résultat:**

{{< img src="boat.jpg" height="400" width="600" align="center" title="A boat at the sea" >}}

{{< vs 3 >}}

#### Une image avec l'attribut `float`.

**Code:**

```markdown
{{</* img src="boat.jpg" height="200" width="500" float="right" title="A boat at the sea" */>}}
```

**Résultat:**

{{< img src="boat.jpg" height="200" width="500" float="right" title="A boat at the sea" >}}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies. Praesent tellus risus, eleifend vel efficitur ac, venenatis sit amet sem. Ut ut egestas erat. Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat. Suspendisse nec ipsum eu erat finibus dictum. Morbi volutpat nulla purus, vel maximus ex molestie id. Nullam posuere est urna, at fringilla eros venenatis quis.

Fusce vulputate dolor augue, ut porta sapien fringilla nec. Vivamus commodo erat felis, a sodales lectus finibus nec. In a pulvinar orci. Maecenas suscipit eget lorem non pretium. Nulla aliquam a augue nec blandit. Curabitur ac urna iaculis, ornare ligula nec, placerat nulla. Maecenas aliquam nisi vitae tempus vulputate.

## Diviser

Ce thème supporte le découpage de la page en autant de colonnes que vous le souhaitez.

#### Diviser en 2 colonnes

**Code:**

```markdown
{{</* split 6 6 */>}}
##### Colonne de gauche

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Colonne de droite

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{</* /split */>}}
```

**Résultat:**

{{< split 6 6>}}

##### Colonne de gauche

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Colonne de droite

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

#### Diviser en 3 colonnes

**Code:**

```markdown
{{</* split 4 4 4 */>}}
##### Colonne de gauche

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Colonne du milieu

Aenean dignissim dictum ex. Donec a nunc vel nibh placerat interdum.

---
##### Colonne de droite

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{</* /split */>}}
```

**Résultat:**

{{< split 4 4 4 >}}

##### Colonne de gauche

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Colonne du milieu

Aenean dignissim dictum ex. Donec a nunc vel nibh placerat interdum.

---
##### Colonne de droite

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

## Espace vertical

Donner un espace vertical entre deux lignes.

**Code:**

```markdown
Voici la ligne 1.
{{< vs 4>}}
Voici la ligne 2. Il devrait y avoir un espace vertical de `4rem` avec la ligne précédente.
```

**Résultat:**

Voici la ligne 1.
{{< vs 4>}}
Voici la ligne 2. Il devrait y avoir un espace vertical de `4rem` avec la ligne précédente.

## Vidéo

**Code:**

```markdown
{{</* video src="/videos/sample.mp4" */>}}
```

**Résultat:**

{{< video src="/videos/sample.mp4" >}}

<!-- markdown-link-check-disable-next-line -->
Vidéo de [Rahul Sharma](https://www.pexels.com/@rahul-sharma-493988) sur [Pexels](https://www.pexels.com).
