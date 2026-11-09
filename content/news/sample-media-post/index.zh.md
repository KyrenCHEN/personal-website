---
title: 示例：动态的全部写法（高亮、关键词、PDF、代码、视频、相册）
date: 2026-11-08
category: media
summary: 演示动态中可用的全部功能：彩色高亮、提示框、关键词、PDF 与代码附件、视频和相册。确认用法后可删除本条。
keywords: [写作示例, 遥感, 深度学习, Hugo]
# 标题下方的按钮：填文件名（放在本文件夹）或完整网址；不需要的删掉即可
pdf: sample.pdf
code: ndvi.py
data: https://example.com/dataset
links:
  - name: 项目主页
    url: https://example.com
---

这是一条**示例动态**。每条动态是 `content/news/` 下的一个文件夹，文字写在 `index.zh.md`，图片、PDF、代码文件放在同一文件夹即可引用。

### 文字高亮

用两个等号包住文字即可 ==黄色高亮==。需要其他颜色时写成
{{< hl blue >}}蓝色{{< /hl >}}、{{< hl green >}}绿色{{< /hl >}}、{{< hl red >}}红色{{< /hl >}}、{{< hl violet >}}紫色{{< /hl >}}。
还支持下标与上标：PM~2.5~、CO~2~、R^2^ = 0.87。

> [!IMPORTANT]
> 重点框：以 `> [!IMPORTANT]` 开头。另有 `[!NOTE]` 说明、`[!TIP]` 提示、`[!WARNING]` 注意、`[!CAUTION]` 警告五种颜色。

> [!TIP] 自定义标题
> 在类型后面直接写标题即可，例如 `> [!TIP] 自定义标题`。

### PDF

{{< pdf src="sample.pdf" title="示例论文全文.pdf" >}}

### 代码

直接粘贴代码（三个反引号后写语言名）：

```python
import ee
ee.Initialize()
s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate("2025-06-01", "2025-09-01")
ndvi = s2.median().normalizedDifference(["B8", "B4"])
```

或展示文件夹中的代码文件（带下载按钮）：

{{< code file="ndvi.py" >}}

### 图片、视频与相册

{{< img src="gallery/01.jpg" caption="单张图片，点击可放大" >}}

{{< video src="demo.mp4" poster="poster.jpg" caption="本地视频（建议 20 MB 以内；更长的视频用 `{{</* bilibili id=\"BV号\" */>}}`）" >}}

{{< gallery caption="相册：自动读取 gallery/ 文件夹中的全部图片" >}}
