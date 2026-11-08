---
title: "Sample post: every writing feature"
date: 2026-11-08
category: media
summary: Highlights, callouts, keywords, PDF and code attachments, video and galleries. Delete this post once you are familiar with the syntax.
keywords: [Writing guide, Remote sensing, Deep learning, Hugo]
# Buttons under the title: a file name in this folder or a full URL; delete the ones you don't need
pdf: sample.pdf
code: ndvi.py
data: https://example.com/dataset
links:
  - name: Project page
    url: https://example.com
---

This is a **sample post**. Each news item is a folder under `content/news/`; write the text in `index.en.md` and drop images, PDFs and code files into the same folder.

### Highlights

Wrap text in double equals signs for a ==yellow highlight==, or use
{{< hl blue >}}blue{{< /hl >}}, {{< hl green >}}green{{< /hl >}}, {{< hl red >}}red{{< /hl >}} and {{< hl violet >}}violet{{< /hl >}}.
Subscripts and superscripts work too: PM~2.5~, CO~2~, R^2^ = 0.87.

> [!IMPORTANT]
> Start a block with `> [!IMPORTANT]`. Also available: `[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!CAUTION]`.

> [!TIP] Custom title
> Put a title right after the type, e.g. `> [!TIP] Custom title`.

### PDF

{{< pdf src="sample.pdf" title="Full paper.pdf" >}}

### Code

Paste code in a fenced block:

```python
import ee
ee.Initialize()
s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate("2025-06-01", "2025-09-01")
ndvi = s2.median().normalizedDifference(["B8", "B4"])
```

Or show a file from the folder with a download link:

{{< code file="ndvi.py" >}}

### Images, video and galleries

{{< img src="gallery/01.jpg" caption="Single image — click to enlarge" >}}

{{< video src="demo.mp4" poster="poster.jpg" caption="Local video (keep under ~20 MB; use `{{</* bilibili id=\"BV...\" */>}}` for longer ones)" >}}

{{< gallery caption="Gallery — every image in the gallery/ folder" >}}
