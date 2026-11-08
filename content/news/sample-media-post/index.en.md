---
title: "Sample post: images, video and galleries"
date: 2026-11-08
category: media
summary: Demonstrates a single image, a local video, a Bilibili embed and an image gallery inside a news post. Delete this post once you are familiar with the syntax.
---

This is a **sample post** showing the supported media. Each news item is a folder under `content/news/`; put images and videos next to `index.en.md` / `index.zh.md` and reference them by file name. An image named `cover.jpg` becomes the card thumbnail automatically.

### Single image

{{< img src="gallery/01.jpg" caption="Single image — click to enlarge. `{{</* img src=\"gallery/01.jpg\" caption=\"...\" */>}}`" >}}

### Local video

{{< video src="demo.mp4" poster="poster.jpg" caption="Local MP4 (keep under ~20 MB). `{{</* video src=\"demo.mp4\" poster=\"poster.jpg\" */>}}`" >}}

### Bilibili / YouTube

For longer videos, upload to Bilibili and embed with `{{</* bilibili id="BV..." */>}}`, or use `{{</* youtube VIDEO_ID */>}}`.

### Gallery

{{< gallery match="gallery/*" caption="Gallery — every image in the `gallery/` folder. `{{</* gallery */>}}`" >}}
