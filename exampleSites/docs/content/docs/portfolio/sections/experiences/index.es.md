---
title: Configurando la sección de Experiencia
date: '2020-06-08T06:20:40+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección de Experiencia
weight: 130
aliases:
  - /posts/configuration/sections/experiences/
  - /docs/configuration/sections/experiences/
---

La sección de `Experiencia` ha sido diseñada para mostrar su trayectoria profesional y resalte las responsabilidades que ha asumido a lo largo de su trayectoria profesional. En esta publicación, le guiaré a través del proceso de configuración de la sección de `Experiencia` en su sitio web. Para obtener una referencia completa, puede consultar el archivo de ejemplo [experiences.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/experiences.yaml).

Para empezar, crea un nuevo archivo llamado `experiences.yaml` dentro del directorio `data/es/sections` de tu sitio web. Después, sigue las instrucciones de abajo.

### Añade la información de la sección

Añade la siguiente sección de metadatos en el archivo `experiences.yaml`:

```yaml
section:
  name: Experiencia # Título de la sección (predeterminado: "")
  id: experiences # id del url de la sección *se requiere*
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 3 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  # Opcionalmente puede ocultar el título del menú
  # hideTitle: true
```


### Añade tu experiencia

Para añadir una experiencia, añade la respectiva información debajo de la sección `experiences` dentro del archivo `experiences.yaml`, como a continuación:

```yaml
# Tu experiencia
experiences:
- company:
    name: Example Co.
    url: "https://www.example.com"
    location: Dhaka Branch
    logo: /images/experiences/company.png
    darkLogo: /images/experiences/company-dark.png #(opcional), opcionalmente puede mostrar un logo distinto para el tema oscuro.
    # resumen de la empresa
    overview: Example Co. es una empresa ampliamente reconocida de cloud-native development. Crea herramientas para Kubernetes.
  positions:
  - designation: Ingeniero de Software Sénior
    start: Nov 2019
    # No des una fecha de finalización si aún trabajas ahí. Será sustituida "Presente"
    # end: Dec 2020
    # Da unos puntos sobre tus responsablildades en la empresa.
    responsibilities:
    - Diseñar y desarollar la herramienta XYZ para la tarea ABC
    - Diseñar, desarollar y administrar herramienta de recuperación de desastres [Xtool](https://www.example.com) que hace copias de seguridad de volúmenes de Kubernetes, Bases de Datos y definición de recursos del clúster.
    - Líder del equipo de backend.

  - designation: Ingeniero de Software Júnior
    start: Nov 2017
    end: Oct 2019
    responsibilities:
    - Implementar y testear la funcionalidad xyz de la herramienta abc.
    - Dar soporte al cliente de la herramienta abc.
    - Aprender tecnología k,d,w de xyz.
```

Cada entrada de la sección `experiences` debería tener la siguiente información,

- **company**: Información sobre tu empresa. Deberías proveer `name`, `url`, `location`, `logo`, y un breve `overview` de la empresa.
- **positions**: Lista de posiciones que has tenido en la empresa. Puedes proveer múltiples posiciones si has cambiado de posición en la empresa.
- **designation**: Representa los roles que has tenido en la posición correspondiente.
- **start**: Fecha en que te uniste en la respectiva posición.
- **end**: Fecha en que dejaste la posición. Si aún está trabajando en esa posición, no llenes este campo.
- **responsibilities**: Lista de responsabilidades que tuviste en esa posición. Esta sección es muy importante, ya que el visitante podrá tener una idea sobre las responsabilidades profesionales que eres capaz de manejar.

> Puedes usar la sintáctica de markdown en el campo `overview` de la sección `company` y el campo de `responsibilities`.

<!-- {{< vs 2 >}}

La siguiente imagen muestra cómo se distribuye el contenido de `experiences.yaml` de la sección de `Experiencia`.

{{< img src="images/experiences.png" >}} -->
