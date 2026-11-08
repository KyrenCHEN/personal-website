---
title: 示例：在动态中插入图片、视频与相册
date: 2026-11-08
category: media
summary: 演示如何在一条动态中插入单张图片、本地视频、B 站视频和图片相册。确认用法后可删除本条。
---

这是一条**示例动态**，用于演示页面支持的多媒体格式。每条动态是 `content/news/` 下的一个文件夹，把图片、视频与 `index.zh.md` / `index.en.md` 放在同一文件夹即可引用。命名为 `cover.jpg` 的图片会自动作为封面。

### 单张图片

{{< img src="gallery/01.jpg" caption="单张图片：点击可放大。`{{</* img src=\"gallery/01.jpg\" caption=\"...\" */>}}`" >}}

### 本地视频

{{< video src="demo.mp4" poster="poster.jpg" caption="本地 MP4 视频（建议压缩至 20 MB 以内）。`{{</* video src=\"demo.mp4\" poster=\"poster.jpg\" */>}}`" >}}

### B 站 / YouTube 视频

较大的视频建议上传到 B 站，再用 `{{</* bilibili id="BV号" */>}}` 嵌入；YouTube 视频用 `{{</* youtube 视频ID */>}}`。

### 相册

{{< gallery match="gallery/*" caption="相册：自动读取 `gallery/` 文件夹中的全部图片。`{{</* gallery */>}}`" >}}
