# Personal Academic Homepage

Bilingual (English / 中文) single-page academic profile built with [Hugo](https://gohugo.io) and deployed on [Netlify](https://www.netlify.com). No theme or external dependency; all templates live in `layouts/`.

## Edit content

| File | Contents |
|---|---|
| `data/en.yaml`, `data/zh.yaml` | Name, position, bio, research, education, grants, honors, teaching, contact |
| `data/publications.yaml` | Publications (shared by both languages) |
| `data/site.yaml` | Email, photo, CV paths, academic profile links, author-name highlighting, hero coordinates |
| `hugo.toml` | Site URL and per-language page titles |
| `static/images/` | Portrait (replace `avatar.svg`, or add `avatar.jpg` and update `data/site.yaml`) |
| `static/uploads/` | CV PDFs (`cv_en.pdf`, `cv_zh.pdf`) |

A section disappears automatically when its data field is empty.

## Local preview

```bash
pip install hugo      # or: brew install hugo
hugo server           # http://localhost:1313  (Chinese: /zh/)
```

## Deploy (Netlify)

1. Netlify → *Add new site* → *Import an existing project* → select this GitHub repository.
2. Build settings are read from `netlify.toml`; no manual configuration needed.
3. Set `baseURL` in `hugo.toml` to the final domain.
