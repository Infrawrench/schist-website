# schist-website

The marketing site for [Schist](https://schist.app), the open source image editor.

The site is a single static page. React is used only as a build-time templating
language: `build.ts` renders `HTMLDocument.tsx` to a string with
`react-dom/server` and writes it to `public/index.html`. There is no client-side
React and no hydration — the small amount of runtime behaviour (platform
detection for the download button, the Linux download modal, fetching the latest
release tag from the GitHub API) ships as inline `<script>` tags that are
minified at build time.

Cloudflare Workers serves `public/` as static assets on `schist.app`.

## Requirements

- [Bun](https://bun.sh)
- A Cloudflare account, for `dev` and `deploy`

## Getting started

```sh
bun install
bun run dev
```

`bun run dev` builds `public/index.html` and then starts `wrangler dev`.

## Scripts

| Command | Description |
| --- | --- |
| `bun run build` | Render `HTMLDocument.tsx` to `public/index.html`. |
| `bun run dev` | Build, then serve locally with `wrangler dev`. |
| `bun run deploy` | Build, then publish to Cloudflare with `wrangler deploy`. |

Note that `public/index.html` is generated and git-ignored, so a build must run
before anything can serve the site.

## Layout

```
build.ts              Renders the document and writes public/index.html
HTMLDocument.tsx      <html>: meta tags, root styles, page composition
components/
  Header.tsx          Logo, tagline, download button
  DownloadButton.tsx  Platform detection + latest-release lookup (inline JS)
  LinuxDownloadModal.tsx  Per-distro download options
  Main.tsx            Feature sections
  Footer.tsx          Attribution
  Icon.tsx            Logo and favicon, inlined as data URIs
utils/minifiers.ts    cssMinify / jsMinify / svgDataURI template tags
public/               Static assets (fonts, feature screenshots)
```

Styles and scripts live next to the component that uses them, written as tagged
template literals so they are minified as the page is rendered:

```tsx
const styles = cssMinify`
    header { text-align: center; }
`;
```

`svgDataURI` does the same for SVG, encoding it as a `data:` URI so icons need no
extra requests.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Infrawrench LLC.
