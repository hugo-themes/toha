---
title: Go পরিচিতি
weight: 10
menu:
  notes:
    name: পরিচিতি
    identifier: notes-go-basics-intro
    parent: notes-go-basics
    weight: 10
---
<!-- A Sample Program -->
{{< note title="Hello World">}}
A sample go program is show here.
  
```go
package main

import "fmt"

func main() {
  message := greetMe("world")
  fmt.Println(message)
}

func greetMe(name string) string {
  return "Hello, " + name + "!"
}
```

Run the program as below:

```bash
$ go run hello.go
```
{{< /note >}}

<!-- Declaring Variables -->

{{< note title="Variables" >}}
**Normal Declaration:**
```go
var msg string
msg = "Hello"
```

**Shortcut:**
```go
msg := "Hello"
```
{{< /note >}}


<!-- Declaring Constants -->

{{< note title="Constants" >}}
```go
const Phi = 1.618
```
{{< /note >}}