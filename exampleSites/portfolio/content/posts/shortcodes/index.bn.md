---
title: "শর্টকোডের  নমুনা"
date: 2020-06-08T08:06:25+06:00
description: Shortcodes sample
menu:
  sidebar:
    name: শর্টকোডের  নমুনা
    identifier: shortcodes
    weight: 40
---

এই নমুনা পোস্টটি এই বিষয়গুলো পরীক্ষা করার জন্যে করা হয়েছেঃ

- ডিফল্ট হিরো ইমেজ।
- বিভিন্ন শর্টকোড।

## এলার্ট

এই থিমের মধ্যে এই সকল এলার্ট রয়েছেঃ

{{< alert type="success" >}}
এটা `type="success"` দিয়ে নমুনা এলার্ট।
{{< /alert >}}

{{< alert type="danger" >}}
এটা `type="danger"` দিয়ে নমুনা এলার্ট।
{{< /alert >}}

{{< alert type="warning" >}}
এটা `type="warning"` দিয়ে নমুনা এলার্ট।
{{< /alert >}}

{{< alert type="info" >}}
এটা `type="info"` দিয়ে নমুনা এলার্ট।
{{< /alert >}}

{{< alert type="dark" >}}
এটা `type="dark"` দিয়ে নমুনা এলার্ট।
{{< /alert >}}

{{< alert type="primary" >}}
এটা `type="primary"` দিয়ে নমুনা এলার্ট।
{{< /alert >}}

{{< alert type="secondary" >}}
এটা `type="secondary"` দিয়ে নমুনা এলার্ট।
{{< /alert >}}

## ছবি

#### কোন ধরনের attribute ছাড়া ছবির একটি নমুনা। 

{{< img src="/posts/shortcodes/boat.jpg" title="A boat at the sea" >}}

{{< vs 3 >}}

#### `height` এবং `width` attribute সহ ছবির একটি নমুনা।

{{< img src="/posts/shortcodes/boat.jpg" height="400" width="600" title="A boat at the sea" >}}

{{< vs 3 >}}

#### `height` এবং `width` attribute সহ মাঝখানে স্তাপিত ছবির একটি নমুনা।

{{< img src="/posts/shortcodes/boat.jpg" height="400" width="600" align="center" title="A boat at the sea" >}}

{{< vs 3 >}}

#### `float` attribute সহ ছবির একটি নমুনা।

{{< img src="/posts/shortcodes/boat.jpg" height="200" width="500" float="right" title="A boat at the sea" >}}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies. Praesent tellus risus, eleifend vel efficitur ac, venenatis sit amet sem. Ut ut egestas erat. Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat. Suspendisse nec ipsum eu erat finibus dictum. Morbi volutpat nulla purus, vel maximus ex molestie id. Nullam posuere est urna, at fringilla eros venenatis quis.

Fusce vulputate dolor augue, ut porta sapien fringilla nec. Vivamus commodo erat felis, a sodales lectus finibus nec. In a pulvinar orci. Maecenas suscipit eget lorem non pretium. Nulla aliquam a augue nec blandit. Curabitur ac urna iaculis, ornare ligula nec, placerat nulla. Maecenas aliquam nisi vitae tempus vulputate.

## বিভাজন

এই থিম আপনার পেইজকে  যত খুশি ভাগে ভাগ করা সমর্থন করে।

#### দুই কলামে ভাগ করা

{{< split 6 6>}}

##### বামের কলাম

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---

##### ডানের কলাম

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

#### তিন কলামে ভাগ করা

{{< split 4 4 4 >}}

##### বামের কলাম

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---

##### মাঝের কলাম

Aenean dignissim dictum ex. Donec a nunc vel nibh placerat interdum. 

---

##### ডানের কলাম

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

## উলম্ব জায়গা

দুই লাইনের মাঝে উলম্ব জায়গা দিতে পারেন।

এটি প্রথম লাইন
{{< vs 4>}}
এটি দ্বিতীয় লাইন। প্রথম লাইনের সাথে `4rem` উলম্বভাবে বাব্যধান থাকার কথা।