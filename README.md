# thomasgoggin.com

Personal portfolio. Built in one sitting, late at night, on purpose.

## What it is

Single-page portfolio. Dark, isometric pixel-art office at night. Each desk in the scene is a real client project. Click any desk to open the case study. Voice toggle in the top right flips every line of copy on the site between formal Thomas and real Thomas voice.

## Stack

- Plain HTML / CSS / vanilla JS. No build step. No dependencies.
- Google Fonts: Instrument Serif, Inter Tight, JetBrains Mono.
- Designed for Cloudflare Pages.

## Local preview

Just open `index.html` in a browser. Or:

```bash
cd ~/code/thomasgoggin-com
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy (Cloudflare Pages)

```bash
cd ~/code/thomasgoggin-com
git init
git add .
git commit -m "init: portfolio v1"
# create empty github repo, then:
git remote add origin git@github.com:<you>/thomasgoggin-com.git
git push -u origin main
# then in Cloudflare Pages: connect repo, no build command, output dir = root
```

Then point `thomasgoggin.com` at it.

## Easter eggs

- Press **V** anywhere to toggle voice (formal ↔ real).
- Type **`outtcast`** anywhere on the page to open the Outtcast case study directly.
- Open the browser console for a signed message.

## Files

- `index.html` / structure, isometric scene SVG, every text node has `data-formal` / `data-real`
- `styles.css` / design system, animations, custom cursor, responsive
- `script.js` / voice toggle, case study overlay, easter eggs, ambient interactions

## Things to add later

- Real Twilio numbers wired up so visitors can text/call the bots live from the page
- Outtcast preview screenshots once the app is in TestFlight
- Sound design on hover (subtle clicks, ambient hum), gated behind a sound toggle
- Logo permission check before swapping placeholder client labels for real names

## Notes on the voice toggle

Every line of user-facing copy lives in `data-formal` and `data-real` attributes on the relevant span. The default is `real`. The toggle persists to `localStorage` as `tg-voice`. The case study overlay re-renders on toggle so its copy switches in place.

Don't break this. It's the whole point.
