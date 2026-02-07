# KS2 Lab Web Migration Plan (GitHub Pages)

This plan starts the migration from the Electron app (`homeschool-hub`) into a new web-focused repo named **`ks2-lab`** while preserving the existing Electron project.

## Target remote

- GitHub repo: `https://github.com/hadefuwa/ks2-lab`

## Goals

1. Preserve the existing Electron app as-is.
2. Create/use a new repo/folder called `ks2-lab`.
3. Copy app code to `ks2-lab` **without `assets/videos`**.
4. Prepare the new project for GitHub Pages hosting.

## Fit for GitHub Pages

- Current production build is approximately 11 MB (`dist/`) and is suitable for GitHub Pages.
- Removing `assets/videos` significantly reduces repository and deploy size.
- Routing already uses `HashRouter`, which is friendly to GitHub Pages.

## Phase 1 (started): repo split + size cleanup

- [x] Create this migration plan document.
- [x] Add a copy script that creates `../ks2-lab` and excludes heavy/non-web artifacts.
- [x] Exclude `assets/videos` when copying.
- [x] Default copy workflow configured to use the provided `ks2-lab` GitHub remote.
- [ ] Push initial `ks2-lab` baseline commit to remote.

## Phase 2: web persistence + Electron feature gates

- Replace direct Electron-only persistence usage with a storage adapter:
  - Electron adapter (existing IPC)
  - Browser adapter (IndexedDB/localStorage)
- Keep UI behavior the same, but disable or replace Electron-only features on web:
  - updater UI
  - native TTS process calls
  - drawing file-system persistence

## Phase 3: GitHub Pages deployment

- Add GitHub Actions workflow for Pages deployment:
  - install deps
  - `npm run build`
  - deploy `dist/`
- Verify app loads and refreshes reliably via hash routes.

## Command to start `ks2-lab` locally from this repo

```bash
./scripts/start-ks2-lab-copy.sh . ../ks2-lab https://github.com/hadefuwa/ks2-lab.git
```

## Suggested initial repo commands (inside `../ks2-lab`)

```bash
npm install
npm run build
git add .
git commit -m "Initial ks2-lab web baseline (no local videos)"
git push -u origin main
```


## If GitHub shows an empty repo / no site

1. Run the publish helper from this repo root:

```bash
./scripts/publish-ks2-lab.sh . ../ks2-lab https://github.com/hadefuwa/ks2-lab.git
```

2. In `https://github.com/hadefuwa/ks2-lab` open **Settings → Pages** and confirm:
   - **Source** is set to **GitHub Actions**.

3. After push, check **Actions** tab for the `Deploy KS2 Lab to GitHub Pages` workflow.
