# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Code Architecture and Structure

This is a static, single-page website for the software company KOR Bytes S.A.S. The main page is `index.html`.

- **Styling**: The project uses Tailwind CSS loaded via a CDN. Custom styles and Tailwind configuration are located in a `<style>` block and a `<script>` block respectively in the `<head>` of `index.html`.
- **JavaScript**: The site uses minimal vanilla JavaScript for mobile menu functionality, which is inlined in a `<script>` tag at the end of the `<body>` in `index.html`.
- **Assets**: Images are in the `images/` directory. The `css/` and `js/` directories are currently empty.
- **Content**: All content is within `index.html`.
- **Task Management**: The `PENDIENTES.md` file tracks to-do items and future enhancements, such as adding project images and social media links.
- **Performance**: The `OPTIMIZACIONES.md` file documents performance optimizations that have been implemented, such as image optimization, lazy loading, and browser caching configurations for Apache, Netlify, and Nginx.

## Common Development Tasks

### Running a local server

Since this is a static website with no build process, you can view your changes by opening the `index.html` file directly in a browser. However, to avoid potential issues with file path routing and to better simulate a production environment, it is recommended to use a simple local server.

One of the easiest ways to do this is with Python's built-in HTTP server. Run the following command in the root of the project:

```sh
python3 -m http.server
```

You can then access the website at `http://localhost:8000`.

### Making Changes

- To edit the content or structure of the website, modify `index.html`.
- To add or update images, place them in the `images/` directory and reference them in `index.html`.
- To add custom CSS, you can add it to the `<style>` block in `index.html` or create a new CSS file in the `css/` directory and link it in `index.html`.

### Future Enhancements

Refer to `PENDIENTES.md` for a list of planned improvements, including:

- Adding real project screenshots to the `images/proyectos/` directory.
- Adding social media links to the footer.
- Implementing a contact form.
- Adding a blog and case studies.
- Advanced SEO and performance optimizations like generating a sitemap, creating a `robots.txt` file, and adding structured data.
