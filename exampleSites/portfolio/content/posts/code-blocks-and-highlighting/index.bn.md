---
title: "কোড ব্লক, সিনট্যাক্স হাইলাইটিং এবং ফোল্ডিং"
date: 2026-11-08T12:00:00+06:00
description: "ফাইল শিরোনামসহ কোড হেডার, লাইট/ডার্ক সিনট্যাক্স হাইলাইটিং, ফোল্ডিং প্রিভিউ এবং সম্পূর্ণ সোর্স কপি সুবিধা।"
aliases:
  - /posts/code-blocks/
  - /posts/engineering/code-blocks-and-highlighting/
categories: ["প্রকৌশল"]
tags: ["মার্কডাউন", "কোড-ব্লক", "লেআউট"]
series: ["তোহা পাবলিশিং গাইড"]
series_weight: 20
---

আধুনিক ব্লগ পৃষ্ঠায় কোড ব্লকগুলোতে স্বয়ংক্রিয়ভাবে ভাষা বা ফাইলের নামের হেডার, লাইট/ডার্ক থিম উপযোগী Chroma কালার এবং সম্পূর্ণ কোড কপি করার বাটন থাকে।

## দীর্ঘ কনফিগারেশনে স্বয়ংক্রিয় ফোল্ডিং (`previewLines: 8`)

ব্লক ফোল্ড করা অবস্থায় থাকলেও **Copy** বাটনে চাপ দিলে সম্পূর্ণ কোড ক্লিপবোর্ডে কপি হয়:

```yaml {title="hugo.yaml"}
module:
  imports:
    - path: github.com/hugo-toha/toha/v4

params:
  home:
    layout: portfolio
  features:
    componentsDesign:
      enable: true
    portfolio:
      enable: true
      modern:
        enable: true
        navigation: bar
        hero:
          style: photo
        search:
          enable: true
    codeBlock:
      copyButton:
        enable: true
      folding:
        enable: true
        previewLines: 8
```

## প্রসারিত কোড ও লাইন নম্বর

```go {title="cmd/backup/worker.go" linenos=inline data-expand=true data-max-lines=5}
package backup

import (
	"context"
	"fmt"
	"time"
)

func RunSnapshot(ctx context.Context, volumeID string) error {
	deadline, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	select {
	case <-deadline.Done():
		return fmt.Errorf("snapshot %s timed out: %w", volumeID, deadline.Err())
	default:
		return nil
	}
}
```

## সংক্ষিপ্ত কমান্ড ও সাধারণ টেক্সট লগ

``` {title="deploy.log" data-max-lines=3}
[1/4] Generating build statistics (hugo_stats.json)
[2/4] Compiling semantic Tailwind CSS tokens
[3/4] Bundling modern portfolio and blog scripts
[4/4] Built cleanly
```

```sh
mise run portfolio
```
