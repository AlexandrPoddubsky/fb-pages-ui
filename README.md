fb-pages-ui
===========

UI for a Facebook Page based on public APIs available via the companion NodeJS app at: https://github.com/pherris/fb-pages-api.

This UI takes posts from your Facebook page and displays them as a web site. The posts you make are prioritized higher on the page than shared posts. This is done to keep your business specific content at the top of the screen.

Development
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

Embedded Pages

This app can be configured to have embedded pages that are simply specific facebook posts with configuration. Use the markdown guide below for some examples of the formatting you can add to your posts.

````
A First Level Header
====================

A Second Level Header
---------------------

stringing hypens together with a leading space creates a horizontal line
 -----------
 
 Paragraphs are separated
 by a blank line.
 
 Text attributes *italic*,
 **bold**.
 
 A [link](http://example.com).

 A image: ![Image Alt Text] (http://w3.org/Icons/valid-xhtml10) 
 
 A list:
 
   * [this text is hyperlinked to that url ->](http://apples.com)
   * oranges
   * pears

Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.

The quick brown fox jumped over the lazy
dog's back.

### Header 3

> This is a blockquote.
> 
> This is the second paragraph in the blockquote.
>
> ## This is an H2 in a blockquote
````

TODO
------------------
Handle conditions where no server connection is available. Options include local storage, followed by default content to notify of the outage.
Tests.
Add testing to controllers defined in app.js.
Move hour object formatting to hour directive.
End to end testing.
