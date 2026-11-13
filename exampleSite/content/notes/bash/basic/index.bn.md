---
title: ব্যাশ ভেরিয়েবল
weight: 210
menu:
  notes:
    name: ভেরিয়েবল
    identifier: notes-bash-variables
    parent: notes-bash
    weight: 10
---

<!-- Variable -->
{{< note title="Variable" >}}

```bash
NAME="John"
echo $NAME
echo "$NAME"
echo "${NAME}
```

{{< /note >}}

<!-- Condition -->
{{< note title="Condition" >}}

```bash
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```

{{< /note >}}