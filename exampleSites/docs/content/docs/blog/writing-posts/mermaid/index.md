---
title: Mermaid Support
date: '2022-03-14T06:15:35+06:00'
mermaid: true
linkTitle: Mermaid
weight: 60
aliases:
  - /posts/writing-posts/mermaid/
  - /docs/writing-posts/mermaid/
---

This theme comes with built in mermaid support powered by [mermaid-js](https://mermaid-js.github.io/mermaid). To enable mermaid for a page, you have to put `mermaid: true` in your page front-matter. For example, this page has the following front-matter:

```yaml
title: "Mermaid Support"
date: 2022-03-14T06:15:35+06:00
menu:
  sidebar:
    name: Mermaid
    identifier: writing-post-mermaid
    parent: writing-post
    weight: 60
mermaid: true
```

Then, you can use `mermaid` short code to add your mermaid content. For example:

```bash
{{</* mermaid align="center"*/>}}
  # your mermaid content here
{{</* /mermaid */>}}
```

The `mermaid` short code accept the following parameters:

- **align**: Let's you align your diagram at left, right, or center. The default alignment is center.
- **background:** Let's you change the background color of your diagram.

In addition, you can also customize the theme of yours diagrams, for example:

```bash
{{</* mermaid align="center" */>}}
%%{init: {'theme':'default'}}%%
  # your mermaid content here
{{</* mermaid */>}}
```

The `theme` parameter accept the following values:
- `default`
- `neutral`
- `dark`
- `forest`
- `base`

## Examples

Here, are few example of different diagram using mermaid.

#### Graph

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


#### Sequence Diagram

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


#### Gantt diagram

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


#### Class Diagram

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


#### Git Graph

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


#### ER Diagram

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
