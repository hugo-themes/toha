---
title: Configurando la sección Sobre mi
date: '2020-06-08T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección Sobre mi
weight: 110
aliases:
  - /posts/configuration/sections/about/
  - /docs/configuration/sections/about/
---

El propósito de la sección `Sobre mi` es proveer una breve introducción sobre ti en tu sitio web. En esta publicación, te guiaré en cómo configurar la sección `Sobre mi`. Para obtener una referencia completa, consulte el archivo de ejemplo [about.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/about.yaml).

Para empezar, crea un archivo `about.yaml` dentro del directorio `data/es/sections` de tu sitio web. Después sigue las instrucciones de abajo.

### Añade la información de la sección

```yaml
section:
  name: Sobre mi # Título de la sección (predeterminado: "")
  id: about # id del url de la sección *se requiere*
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 1 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  template: sections/about.html # Permite apuntar a una plantilla específica
```

#### Configuración de la plantilla

Tienes la opción de personalizar el "partial" usado para esta sección especificando la propiedad `template.` Simplemente, guarde la nueva plantilla en el directorio `layout/partials`.

### Añade tu información de trabajo

Para incluir detalles sobre tu trabajo actual, puedes añadir la siguiente sección en el archivo `about.yaml`:

```yaml
# Tu designación
designation: Ingeniero de Software
# Información de tu empresa
company:
  name: Example Co.
  url: "https://www.example.com"
```

### Añade un resumen sobre ti

Para proporcionar una descripción general concisa de su experiencia profesional, añadimos una sección de resumen. Esto les dará a los visitantes una idea rápida de lo que haces. Añade la siguiente sección al archivo `about.yaml`:

```yaml
# Un resumen sobre ti
summary: 'Soy un ingeniero de software apsionado con x años de experiencia. He creado herramientas OSS para [Kubernetes](https://kubernetes.io/) utilizando Go. Mis herramientas ayudan a personas a desplegar sus workloads en Kubernetes. A veces trabajo en projectos divertidos como crear un tema, etc.'
```

Intenta que sea lo más breve posible. No lo hagas demasiado largo. Tenemos otras secciones que brindan más información sobre su experiencia.

>Puedes usar la sintáctica de markdown en el campo `summary`.

### Añade tus links de redes sociales

Para añadir enlaces de tus perfiles de plataformas como LinkedIn, Twitter y Github, incluye esta sección `socialLinks` en tu archivo `about.yaml`.

```yaml
# tus links de redes sociales
# da tantos como quieras. Utilitza font-awesome para los iconos.
socialLinks:
- name: Email
  icon: "fas fa-envelope"
  url: "example@gmail.com"

- name: Github
  icon: "fab fa-github"
  url: "https://www.github.com/example"

- name: Stackoverflow
  icon: "fab fa-stack-overflow"
  url: "#"

- name: LinkedIn
  icon: "fab fa-linkedin"
  url: "#"

- name: Twitter
  icon: "fab fa-twitter"
  url: "#"

- name: Facebook
  icon: "fab fa-facebook"
  url: "#"
```

Puedes usar cualquier icono gratis de [Font Awesome](https://fontawesome.com/icons?d=gallery) en este campo.

### Añade un Currículum

Para añadir un currículum, pon tu archivo PDF dentro del directorio `files` localizado dentro del directorio `static`. Después incluye la siguiente sección en el archivo `about.yaml`:

```yaml
# tu currículum. Este archivo debe ser relativo a tu directorio "static"
resourceLinks:
- title: "Mi Curríulum"
  url: "files/curriculum.pdf"
```

### Añade tus competencias sociales

Ahora, vamos a añadir tus competencias sociales y un indicador para diversas habilidades sociales como liderazgo, comunicación, trabajo en equipo, etc. Incluye la siguiente sección dentro del archivo `about.yaml`:

```yaml
# Muestra tus certificaciones
# Puedes mostrar tus certificaciones verificables de https://www.credly.com.
# También puedes mostrar una barra circular indicando el nivel de experiencia en una habilidad determinada
badges:
- type: certification
  name: Especialista Certificado de Seguridad de Kubernetes
  url: "https://www.credly.com/org/the-linux-foundation/badge/exam-developer-certified-kubernetes-security-specialist"
  badge: "https://images.credly.com/size/680x680/images/f4bf92ed-8985-40b2-bc07-2f9308780854/kubernetes-security-specialist-logo-examdev.png"

- type: certification
  name: Istio and IBM Cloud Kubernetes Service
  url: "https://www.credly.com/org/the-linux-foundation/badge/exam-developer-certified-kubernetes-security-specialist"
  badge: "https://images.credly.com/size/680x680/images/8d34d489-84bf-4861-a4a0-9e9d68318c5c/Beyond_basics_of_Istio_on_Cloud_v2.png"

- type: certification
  name: Inteligencia Artificial y Aprendizaje Automático
  url: "https://www.credly.com/org/grupo-bancolombia/badge/artificial-intelligence-and-machine-learning"
  badge: "https://images.credly.com/size/680x680/images/e027514f-9d07-4b29-862f-fe21a8aaebf1/ae.png"


- name: Liderazgo
  percentage: 85
  color: blue
- name: Trabajo en equipo
  percentage: 90
  color: yellow
- name: Comunicación
  percentage: 85
  color: pink
```

Actualmente, el porcentaje de habilidades debe estar entre 0 y 100 y debe ser divisible por 5. Los siguientes colores están disponibles para el indicador de porcentaje de habilidades,

- blue
- yellow
- pink
- green
- sky
- orange

>También puedes usar cualquier código de color HEX en el campo `color`.

{{< vs 2 >}}

La siguiente imagen muestra cómo el contenido de `about.yaml` está distribuido en la sección `Sobre mi`. (La porción de configuración de la imagen está obsoleta y la sección de habilidades sociales han sido reemplazadas por certificaciones)

{{< img src="images/about.png" >}}
