fb-pages-ui
===========

UI for a Facebook Page based on public APIs available via the companion NodeJS app at: https://github.com/pherris/fb-pages-api

Usage
------------------
````
git clone https://github.com/pherris/fb-pages-ui/
cd fb-pages-ui
edit Gruntfile.js to point to your API under the 'ngconstant' section.
grunt serve
````

TODO
------------------
Handle conditions where no server connection is available. Options include local storage, followed by default content to notify of the outage.
Tests.
Encapsulate post rendering in directive.
Encapsulate like rendering in directive.
Pull in some FB images.
