---
title: Support de Mermaid
date: '2022-03-14T06:15:35+06:00'
mermaid: true
linkTitle: Mermaid
weight: 60
aliases:
  - /posts/writing-posts/mermaid/
  - /docs/writing-posts/mermaid/
---

Ce thème est construit avec le support de Mermaid propulsé par [mermaid-js](https://mermaid-js.github.io/mermaid). Pour activer mermaid pour une page, vous devez mettre `mermaid: true` dans le front matter de votre page. Par exemple, cette page a le front matter suivant:

```yaml
title: "Support de Mermaid"
date: 2022-03-14T06:15:35+06:00
menu:
  sidebar:
    name: Mermaid
    identifier: writing-post-mermaid
    parent: writing-post
    weight: 60
mermaid: true
```

Ensuite, vous pouvez utiliser le shortcode `mermaid` pour ajouter du contenu mermaid. Par exemple:

```bash
{{</* mermaid align="center"*/>}}
  # Votre contenu mermaid ici
{{</* /mermaid */>}}
```

Le shortcode `mermaid` accepte les paramètres suivants:

- **align**: aligne votre diagramme à gauche, à droite, ou au centre. L'alignement par défaut est le centre.
- **background:** change la couleur d'arrière plan de votre diagramme.

De plus, vous pouvez également personnaliser le thème de vos diagrammes, par exemple:

```bash
{{</* mermaid align="center" */>}}
%%{init: {'theme':'default'}}%%
  # your mermaid content here
{{</* mermaid */>}}
```

Le paramètre `theme` accepte les valeurs suivantes:
- `default`
- `neutral`
- `dark`
- `forest`
- `base`

## Exemples

Voici quelques exemples de différents diagrammes utilisant mermaid.

#### Graphique

```bash
{{</* mermaid align="left" */>}}
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{</* /mermaid */>}}
```

{{< mermaid align="left" >}}
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{< /mermaid >}}


---


#### Diagramme de séquence

```bash
{{</* mermaid */>}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
{{</* /mermaid */>}}
```

{{< mermaid >}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
{{< /mermaid >}}


---


#### Diagramme de Gantt

```bash
{{</* mermaid */>}}
gantt
  dateFormat  YYYY-MM-DD
  title Adding GANTT diagram to mermaid
  excludes weekdays 2014-01-10

section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2               :         des4, after des3, 5d
{{</* /mermaid */>}}
```

{{< mermaid >}}
gantt
  dateFormat  YYYY-MM-DD
  title Adding GANTT diagram to mermaid
  excludes weekdays 2014-01-10

section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2               :         des4, after des3, 5d
{{< /mermaid >}}


---


#### Diagramme de classes

```bash
{{</* mermaid */>}}
classDiagram
  Class01 <|-- AveryLongClass : Cool
  Class03 *-- Class04
  Class05 o-- Class06
  Class07 .. Class08
  Class09 --> C2 : Where am i?
  Class09 --* C3
  Class09 --|> Class07
  Class07 : equals()
  Class07 : Object[] elementData
  Class01 : size()
  Class01 : int chimp
  Class01 : int gorilla
  Class08 <--> C2: Cool label
{{</* /mermaid */>}}
```

{{< mermaid >}}
classDiagram
  Class01 <|-- AveryLongClass : Cool
  Class03 *-- Class04
  Class05 o-- Class06
  Class07 .. Class08
  Class09 --> C2 : Where am i?
  Class09 --* C3
  Class09 --|> Class07
  Class07 : equals()
  Class07 : Object[] elementData
  Class01 : size()
  Class01 : int chimp
  Class01 : int gorilla
  Class08 <--> C2: Cool label
{{< /mermaid >}}


---


#### Graphique de Git

```bash
{{</* mermaid background="black" align="center" */>}}
%%{init: { 'themeVariables': {
           'commitLabelColor': '#000000',
           'commitLabelFontSize': '12px'
  } } }%%
gitGraph:
  commit
  branch newbranch
  checkout newbranch
  commit
  commit
  branch master
  checkout master
  commit
  commit
  merge newbranch
{{</* /mermaid */>}}
```

{{< mermaid background="black" align="center" >}}
%%{init: { 'themeVariables': {
           'commitLabelColor': '#000000',
           'commitLabelFontSize': '12px'
  } } }%%
gitGraph
  commit
  branch newbranch
  checkout newbranch
  commit
  commit
  branch master
  checkout master
  commit
  commit
  merge newbranch
{{< /mermaid >}}


---


#### Diagramme ER

```bash
{{</* mermaid */>}}
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
{{</* /mermaid */>}}
```

{{< mermaid >}}
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
{{< /mermaid >}}
