---
title: "সমৃদ্ধ মিডিয়া, মারমেইড ডায়াগ্রাম এবং নেস্টেড সেকশন"
date: 2026-11-02T14:00:00+06:00
description: "ফ্রন্ট-ম্যাটার ক্যাটাগরি ও সাব-ক্যাটাগরি, মারমেইড ডায়াগ্রাম, বান্ডল ছবি এবং HTML5 ভিডিও এম্বেড।"
aliases:
  - /posts/category/sub-category/rich-content/
  - /posts/authoring/media/diagrams-media-and-embeds/
hero: images/forest.jpg
heroAlt: "সবুজ অরণ্যের ওপর দিয়ে পড়া সূর্যের আলো"
categories: ["লেখালেখি"]
subcategories: ["মিডিয়া ও ডায়াগ্রাম"]
tags: ["কম্পোনেন্ট", "মিডিয়া", "নেভিগেশন"]
series: ["সমৃদ্ধ কন্টেন্ট তৈরি"]
series_weight: 30
---

পোস্টের জন্য আলাদা নেস্টেড ফোল্ডার না বানিয়েও ফ্রন্ট-ম্যাটারে `categories` এবং `subcategories` ব্যবহার করে সাইডবারে পরিষ্কার ক্যাটাগরি → সাব-ক্যাটাগরি ও ব্রেডক্রাম্ব তৈরি করা যায়।

## মারমেইড ডায়াগ্রাম

ফ্রন্ট-ম্যাটারে `mermaid: true` বা `{{</* mermaid */>}}` থাকলে কেবল প্রয়োজনীয় পোস্টেই ডায়াগ্রাম স্ক্রিপ্ট লোড হয়।

### রেন্ডারিং ফ্লোচার্ট

{{< mermaid align="center" >}}
flowchart LR
    A[Markdown ও ফ্রন্ট-ম্যাটার] --> B[Hugo কন্টেন্ট ট্রি]
    B --> C{আধুনিক ব্লগ চালু?}
    C -->|হ্যাঁ| D[আধুনিক আর্কাইভ ও রিডার]
    C -->|না| E[ক্লাসিক লেআউট]
{{< /mermaid >}}

### সার্চ সিকোয়েন্স ডায়াগ্রাম

{{< mermaid >}}
sequenceDiagram
    participant পাঠক
    participant সার্চ as সার্চ ডায়ালগ
    participant ইন্ডেক্স as JSON ইন্ডেক্স
    পাঠক->>সার্চ: Cmd+K অথবা সার্চ বাটন
    সার্চ->>ইন্ডেক্স: ভাষার ইন্ডেক্স লোড
    ইন্ডেক্স-->>সার্চ: ফলাফল ও স্নিপেট
    পাঠক->>সার্চ: Enter চেপে পোস্টে প্রবেশ
{{< /mermaid >}}

## বান্ডল ছবি এবং HTML5 ভিডিও

{{< img src="images/forest.jpg" width="720" height="440" align="center" title="বান্ডল থেকে লোড হওয়া অরণ্যের ছবি" >}}

{{< vs 2 >}}

{{< video src="/videos/sample.mp4" >}}

## ডাউনলোডযোগ্য নথি

{{< button label="নমুনা পিডিএফ রেজুমে দেখুন" href="/files/resume.pdf" variant="secondary" icon="file-text" >}}
