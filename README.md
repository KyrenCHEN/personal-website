# Pengfei Chen · Academic Homepage

Bilingual (English / 中文) faculty website built with [Hugo](https://gohugo.io) (≥ 0.156) and deployed on [Netlify](https://www.netlify.com). Self-contained: all templates live in `layouts/`, no external theme.

Pages: Home (bio + latest news + recent papers) · Biography · Research · Publications · News · Teaching & Students.

## Homepage sections

About (photo, bio, interests, education) → 进展 Updates (`data/updates.yaml`, one line per item, first 6 shown) → Latest News → Recent Publications → Talks (`data/talks.yaml`, hidden while empty) → Contact.

## Edit profile content

| File | Contents |
|---|---|
| `data/zh.yaml`, `data/en.yaml` | Name, bio, research interests, education, appointments, grants, awards, courses, recruitment, office address |
| `data/publications.yaml` | Journal articles (shared by both languages; `*` marks corresponding author; optional `doi`) |
| `data/site.yaml` | Email, phone, photo, CV, academic profile links (Google Scholar / ORCID …) |
| `static/images/` | Portrait — add `avatar.jpg` (4:5) and update `photo` in `data/site.yaml` |

## Post news (动态)

Each post is a folder under `content/news/`:

```
content/news/2026-03-new-paper/
├── index.zh.md        # Chinese text
├── index.en.md        # English text (optional; omit for a Chinese-only post)
├── cover.jpg          # optional card thumbnail
├── talk.mp4           # optional video
└── gallery/           # optional photo album
    ├── 01.jpg
    └── 02.jpg
```

Front matter:

```yaml
---
title: 论文发表于 Remote Sensing of Environment
date: 2026-03-15
category: paper      # paper | award | talk | event | media | team
---
```

Media shortcodes inside the text:

| Purpose | Syntax |
|---|---|
| Image (click to enlarge) | `{{< img src="photo.jpg" caption="..." >}}` |
| Local video | `{{< video src="talk.mp4" poster="cover.jpg" caption="..." >}}` |
| Bilibili | `{{< bilibili id="BV1xx411c7mD" >}}` |
| YouTube | `{{< youtube VIDEO_ID >}}` |
| Photo album | `{{< gallery >}}` (all images in `gallery/`) |

Images are resized and converted to WebP automatically. Keep local videos under ~20 MB; host longer ones on Bilibili.
`content/news/sample-media-post/` demonstrates every format — delete it when no longer needed.

## Local preview

```bash
pip install hugo      # or: brew install hugo
hugo server           # http://localhost:1313  (Chinese: /zh/)
```

## Deploy

The site is plain static HTML: `hugo --gc --minify` writes everything to `public/`, which any static host can serve.

### Netlify (current)

1. Netlify → *Add new site* → *Import an existing project* → select this repository.
2. Build settings are read from `netlify.toml`.
3. Set `baseURL` in `hugo.toml` to the final domain.

### Mainland China hosting

Custom domains on mainland servers/CDN require ICP filing (ICP 备案).

- **Tencent EdgeOne Pages / Makers**: connect this GitHub repo, framework *Hugo*, build command `hugo --gc --minify`, output `public`. Free plan available; mainland acceleration with a custom domain needs ICP filing.
- **Alibaba Cloud OSS / Tencent COS static website + CDN**: upload `public/`; low cost, ICP filing required for a custom domain.
- **SYSU personal homepage hosting**: ask the university IT center whether static uploads under `*.sysu.edu.cn` are supported.
