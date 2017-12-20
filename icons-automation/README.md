# Icons automation for qgrid

First of all, install `gulp` and all dependencies:

    $ npm install

Put SVG icons to `/raw-icons`. Then run

    $ gulp simple

to generate various fonts and css

    $ gulp embedded

to generate css with embedded `.woff2` font

Executing `gulp all` or `gulp` (default task) will generate all font files and two versions of css: with linked and embedded font files.

