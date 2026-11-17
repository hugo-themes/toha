---
title: Soporte Mermaid
date: '2022-03-14T06:15:35+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
mermaid: true
linkTitle: Mermaid
weight: 60
aliases:
  - /posts/writing-posts/mermaid/
  - /docs/writing-posts/mermaid/
---

Este tema soporta mermaid, desarrollado por [mermaid-js](https://mermaid-js.github.io/mermaid). Para habilitar mermaid para una página, tienes que poner `mermaid: true` en tu página de front-matter. Por ejemplo, esta página tiene el siguiente front-matter:

```yaml
title: "Soporte Mermaid"
date: 2022-03-14T06:15:35+06:00
menu:
  sidebar:
    name: Mermaid
    identifier: writing-post-mermaid
    parent: writing-post
    weight: 60
mermaid: true
```

Después, puede usar el shortcode `mermaid` para añadir contenido de mermaid. Por ejemplo:

```bash
{{</* mermaid align="center"*/>}}
  # su contenido de mermaid aquí
{{</* /mermaid */>}}
```

El shortcode de `mermaid` acepta los siguientes parámetros:

- **align**: Permite alinear el diagrama a la izquierda, derecha o centro. La alineación predeterminada es el centro.
- **background:** Permite cambiar el color de fondo del diagrama.

Además, también puedes personalizar el tema de tus diagramas, por ejemplo:

```bash
{{</* mermaid align="center" */>}}
%%{init: {'theme':'default'}}%%
  # your mermaid content here
{{</* mermaid */>}}
```

El parámetro `theme` acepta los siguientes valores:
- `default`
- `neutral`
- `dark`
- `forest`
- `base`

## Ejemplos

Aquí hay algunos ejemplos de distintos diagramas usando mermaid.

#### Grafo

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


#### Diagrama de secuencia

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


#### Diagrama de Gantt

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


#### Diagrama de Clases

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


#### Grafo de Git

```bash
{{</* mermaid background="black" align="center" */>}}
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


#### Diagrama Entidad-Relación

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
