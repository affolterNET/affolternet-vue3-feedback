# affolternet-vue3-feedback

Vue 3 user-feedback UI for affolterNET apps: a global loading bar and
event-driven toasts.

> **Renamed from `affolternet-vue3-library`.** Same code, accurate name — the
> old package was never a general "library", it was always these two things.
> `affolternet-vue3-library` now re-exports this package and is deprecated;
> migrate by swapping the dependency and the import specifier, nothing else
> changes.

```bash
npm i affolternet-vue3-feedback
```

## Usage

```ts
// main.ts
import { AnToast } from 'affolternet-vue3-feedback'
import 'affolternet-vue3-feedback/css'

// AnToasts resolves the "an-toast" tag at runtime, so AnToast must be global.
createApp(App).component('AnToast', AnToast).mount('#app')
```

```pug
//- App.vue — mount the two hosts once
an-loader(color="var(--primary)" :height="3")
an-toasts
```

```ts
// anywhere
import { loaderService, toastService } from 'affolternet-vue3-feedback'

loaderService.showLoader()   // ref-counted; pair with hideLoader()
loaderService.hideLoader()

toastService.showError('Speichern fehlgeschlagen')
toastService.showWarning('…')
toastService.showInfo('…')
toastService.showDone('…')
```

## Exports

| Export | What it is |
| --- | --- |
| `AnLoader` | Top loading bar. Props: `color`, `height`, `showOverlay`, `overlayOpacity`. |
| `AnToasts` | Toast host. Per-type `*Classes` / `*Icon` props (keep `an-toast-default`). |
| `AnToast` | Single toast. Must be registered globally — see above. |
| `loaderService` / `LoaderService` | `showLoader()` / `hideLoader()`, ref-counted. |
| `toastService` / `ToastService` | `showError` / `showWarning` / `showInfo` / `showDone`. |
| `eventService` / `EventService` | mitt bus (`showLoader`, `hideLoader`, `showToast`) the services talk over. |
| `AnIcon`, `ToastType`, `ToastParams` | Types. |

`vue` is the only peer dependency; `mitt` is bundled.

## Development

```bash
npm install
npm run build          # vue-tsc --noEmit && vite build

cd scripts && ./link.sh                        # register a *-local npm link
cd <consuming-app> && npm link affolternet-vue3-feedback-local
```

The package name appears in **seven** places in `package.json` (`style`,
`main`, `module`, `exports` ×3, `unpkg`, `jsdelivr`) plus `build.lib.fileName`
in `vite.config.ts`. They must all agree or `import 'pkg/css'` resolves to a
missing file — that was a real bug in the predecessor.

Note `package.json` is rewritten by CI with 1-space indentation on every
release — don't reformat it, the next release will undo you.

## Release

Push to `main` → CI bumps the patch version, tags, builds and publishes to npm
via **Trusted Publishing (OIDC)**. There is no `NPM_TOKEN`. A minor/major bump
means editing `version` by hand; the next CI run then bumps the patch on top.

Configure once on npmjs.com (Package settings → Trusted Publisher → GitHub
Actions). Values are case-sensitive and are **not** validated on save — a typo
surfaces later as a misleading `404 Not Found` at publish time:

| Field | Value |
| --- | --- |
| Organization / user | `affolterNET` |
| Repository | `affolternet-vue3-feedback` |
| Workflow filename | `node.push.js.yml` |
| Environment | `prod` |
| Allowed action | `npm publish` only |

The `prod` GitHub environment must exist on the repo, and the first version has
to be published manually once — a Trusted Publisher can only attach to a
package that already exists.

### Why `npx npm@latest publish` instead of plain `npm publish`

`actions/setup-node` ships an npm CLI older than the 11.5.1 required for OIDC
trusted publishing, and the in-place `npm install -g npm@latest` hits a known
`MODULE_NOT_FOUND` bug on that version — so the workflow runs a fresh npm via
`npx`.
