# Static SPA
Static Single Page Application with routing that uses only Web Standards (HTML, JavaScript, CSS, [The DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)).

Even though libraries like Bootstrap, Backbone, Angular, Knockout and Ember do most of the work for you when implementing this kind of system, this project does not use any libraries at all. This emphasizes the core technogies, and provides a foundation for understanding how those libraries work.

## Background

Single Page Application

 * One page only, no page loads.
 * Information fetched on the fly using [XMLHTTPRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
 * [AJAX](http://en.wikipedia.org/wiki/Ajax_(programming))
 * Related concept: "Server Side Push"
   * [Comet (programming) (also known as Reverse Ajax)](http://en.wikipedia.org/wiki/Comet_(programming)) long polling XMLHTTPRequest
   * [WebSocket](http://en.wikipedia.org/wiki/WebSocket) full-duplex communications channels over a single TCP connection
   * [Socket.io Node.js library for WebSocket](http://socket.io/)
 * [Fragment Identifier](http://en.wikipedia.org/wiki/Fragment_identifier) used for routing
   * `index.html#pageA`
   * `index.html#pageB`

Workflow Review

 * Editor / IDE
   * Needs to insert only spaces or only tabs
   * Mixed tabs and spaces causes editor-specific indentation errors
     * My Vim configuration uses 2 spaces for a single tab
     * [CodeMirror Visible Tabs Demo](http://codemirror.net/demo/visibletabs.html)
     * Chrome Source view uses 8 spaces to represent a tab
 * Git Command Line
   * Running on your machine in same directory as the editor
 * Local Server (e.g. [`python -m SimpleHTTPServer 8080`](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/))
   * This is far better than doing your development over an SSH connection
 * DOM Inspector ([`<p>Hello</p>`](http://jsbin.com/nuduzahoga/1/edit))
 * JavaScript Console ([`console.log("Hello");`](http://jsbin.com/luxiqonefa/1/edit))

Navigation Interfaces

 * [Wordpress Blogs](https://wordpress.com/fresh/)
   * [Citizen Sketcher](http://citizensketcher.wordpress.com/2014/10/23/in-which-holmes-creates-a-painting-in-the-rain-or-the-case-of-the-vanishing-castle/)
   * [The New West](http://thewpsa.wordpress.com/)
   * These use separate HTML pages
 * Approaches
   * Separate HTML pages
     * e.g. PHP applications
     * Used to be standard practice
     * Replaced by the "Single Page Application"
   * Single Page Application
     * A single page with no reload
     * Dynamic behavior added using JavaScript
     * Content fetched as needed
     * Routing using a [fragment identifier](http://en.wikipedia.org/wiki/Fragment_identifier)
       * Was the standard practice for a long time
       * Slowly being replaced by HTML5 History API
     * Routing using [HTML5 History API](http://diveintohtml5.info/history.html)
       * [CanIUse Report](http://caniuse.com/#search=history)
     * Caching
