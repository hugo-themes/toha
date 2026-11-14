---
title: Basic Types
weight: 20
menu:
  notes:
    name: Basic Types
    identifier: notes-go-basics-types
    parent: notes-go-basics
    weight: 20
---
<!-- String Type -->
{{< note title="Strings" >}}
```go
str := "Hello"
```

Multiline string
```go
str := `Multiline
string`
```
{{< /note >}}

<!-- Number Types -->
{{< note title="Numbers" >}}
Typical types

```go
num := 3          // int
num := 3.         // float64
num := 3 + 4i     // complex128
num := byte('a')  // byte (alias for uint8)
```

Other Types

```go
var u uint = 7        // uint (unsigned)
var p float32 = 22.7  // 32-bit float
```

{{< /note >}}

<!----------- Arrays  ------>

{{< note title="Arrays" >}}

```go
// var numbers [5]int
numbers := [...]int{0, 0, 0, 0, 0}
```

{{< /note >}}

<!-- Pointers -->

{{< note size="medium" title="Pointers">}}

```go
func main () {
  b := *getPointer()
  fmt.Println("Value is", b)
```

```go
func getPointer () (myPointer *int) {
  a := 234
  return &a
```

```go
a := new(int)
*a = 234
```

Pointers point to a memory location of a variable. Go is fully garbage-collected.

{{< /note >}}

<!-- Type Conversion -->

{{< note title="Type Conversion" >}}

```go
i := 2
f := float64(i)
u := uint(i)
```

{{< /note >}}

<!-- Slice -->

{{< note title="Slice" >}}

```go
slice := []int{2, 3, 4}
```

```go
slice := []byte("Hello")
```

{{< /note >}}
