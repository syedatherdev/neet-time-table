# NEAT NEET Planner

A personal NEET study planner built with React, TypeScript, TanStack Start, Vite, and Tailwind CSS.

The planner includes a four-subject chapter tracker, a date-wise study schedule, exam milestones, daily study sessions, progress tracking, and an animated study-desk hero.

## Project structure

- `app/` - the web application, source code, assets, workspace packages, and build configuration.
- `.github/workflows/` - GitHub Actions validation workflow.

## Requirements

- [Bun](https://bun.sh/) (the project uses `bun.lock`).

## Run locally

```bash
cd app
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by Vite.

## Validate and build

```bash
cd app
bun run check:ui
bun run typecheck
bun run lint
bun run test
bun run build
```

## Notes

- The planner's study schedule and exam dates are defined in the application source. Review them in `app/src/routes/index.tsx` before adapting the timetable.
- The animated hero videos and their posters are in `app/public/assets/world/`.
- Branding assets are in `app/public/assets/brand/`.
- Browser-based progress storage is local to the browser/device; it is not a cross-device account sync service.
- The source includes the workspace packages required by this application in `app/packages/`.

## License

No license has been granted. All rights reserved unless the repository owner adds a license.
