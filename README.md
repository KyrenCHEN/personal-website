# Pengfei Chen · Academic Homepage

Bilingual (English / 中文) faculty website built with [Hugo](https://gohugo.io) (≥ 0.156) and deployed on [Netlify](https://www.netlify.com). Self-contained: all templates live in `layouts/`, no external theme.

Pages: Home · Publications (filter + search) · News · CV.
Desktop uses a sticky profile sidebar; phones get a single column with a bottom tab bar.

## Homepage

Profile (photo with animated contour halo, coordinates, local time) → lede + short bio → Updates (`data/updates.yaml`) → Research topics → Latest News → Recent Publications → Talks (`data/talks.yaml`, hidden while empty) → Contact.

Headings use Newsreader (self-hosted, SIL OFL, `static/fonts/`); body text uses system fonts, so Chinese renders with PingFang / Microsoft YaHei.

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
category: paper            # paper | award | talk | event | media | team (sets card color)
keywords: [遥感, 绿视率]     # colored chips under the title
pdf: paper.pdf             # buttons under the title: a file in this folder or a full URL
code: https://github.com/...
data: https://...
slides: talk.pdf
links:
  - name: 项目主页
    url: https://...
---
```

Writing syntax:

| Purpose | Syntax |
|---|---|
| Yellow highlight | `==text==` |
| Colored highlight | `{{< hl blue >}}text{{< /hl >}}` (blue, green, red, violet, yellow) |
| Sub / superscript | `PM~2.5~`, `R^2^` |
| Strikethrough | `~~text~~` |
| Callout box | `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]` (optional title after the tag) |
| Image (click to enlarge) | `{{< img src="photo.jpg" caption="..." >}}` |
| Local video | `{{< video src="talk.mp4" poster="cover.jpg" >}}` |
| Bilibili / YouTube | `{{< bilibili id="BV1xx411c7mD" >}}`, `{{< youtube VIDEO_ID >}}` |
| Photo album | `{{< gallery >}}` (all images in `gallery/`) |
| PDF (viewer on desktop, card on phones) | `{{< pdf src="paper.pdf" title="..." >}}` |
| Code file with download | `{{< code file="analysis.py" >}}` |
| Inline code block | fenced block with a language, e.g. ` ```python ` |

Highlights and sub/superscripts also work in the YAML text fields (bio, research, updates).
Publications accept the same `pdf / code / data / slides / doi / links` fields (see `data/publications.yaml`).

Images are resized and converted to WebP automatically. Keep local videos under ~20 MB; host longer ones on Bilibili.
`content/news/sample-media-post/` demonstrates every feature — delete it when no longer needed.

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
