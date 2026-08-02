# Jonathan ND — The Atlas

A personal field atlas for software, security, systems and the questions that keep returning.

## Local development

```bash
npm install
npm run dev
```

Build and serve the production output:

```bash
npm run check
npm run build
npm run preview
```

## Assets

The hero uses `public/media/atlas.mp4` and `public/media/atlas-poster.jpg`.
The current video is a 1280×720, ~4-second H.264 clip. The poster is the final frame and is the required fallback for reduced motion, mobile and failed playback.

Before publishing:

- replace the temporary GitHub contact link in `src/pages/index.astro` with the preferred contact path;
- add only verified project links and statuses;
- add a production domain and canonical URL in the layout;
- export a real social preview if the SVG preview is not sufficient;
- test the video crop on the actual target devices.
