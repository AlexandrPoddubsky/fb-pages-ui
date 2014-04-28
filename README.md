fb-pages-ui
===========

UI for a Facebook Page based on public APIs available via the companion NodeJS app at: https://github.com/pherris/fb-pages-api.

This UI takes posts from your Facebook page and displays them as a web site. The posts you make are prioritized higher on the page than shared posts. This is done to keep your business specific content at the top of the screen.

Usage
------------------
````
git clone https://github.com/pherris/fb-pages-ui/
cd fb-pages-ui
edit Gruntfile.js to point to your API under the 'ngconstant' section.
grunt serve
````
Note that 'clean' environments will need to:
````
install nodejs (brew install node)
npm install -g yo
npm install
bower install

````

TODO
------------------
Handle conditions where no server connection is available. Options include local storage, followed by default content to notify of the outage.
Tests.
Add testing to controllers defined in app.js.
Move hour object formatting to hour directive.
End to end testing.
