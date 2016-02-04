(function () {

  // This JavaScript program reads "posts.json" and renders the data to the page. Stores the cached partial HTML pages. Keys correspond to fragment identifiers. Values are the text content of each loaded partial HTML file.
  var partialsCache = {}

  // Encapsulates an HTTP GET request using XMLHttpRequest. Fetches the file at the given path, then calls the callback with the text content of the file.
  function fetchFile( path, callback ){
    // Create a new AJAX request for fetching the partial HTML file.
    var request = new XMLHttpRequest();
    // Call the callback with the content loaded from the file.
    request.onload = function () {
      callback( request.responseText );
    };
    // Fetch the partial HTML file for the given fragment id.
    request.open( "GET", path );
    request.send( null );
  }

  // Gets the appropriate content for the given fragment identifier. This function implements a simple cache.
  function getContent( fragmentId, callback ){
    // If the page has been fetched before,
    if( partialsCache[ fragmentId ] ) {
      // pass the previously fetched content to the callback.
      callback( partialsCache[ fragmentId ] );
    } else {
      // If the page has not been fetched before, fetch it.
      fetchFile( fragmentId + ".html", function (content) {
        // Store the fetched content in the cache.
        partialsCache[ fragmentId ] = content;
        // Pass the newly fetched content to the callback.
        callback( content );
      });
    }
  }

  // Sets the "active" class on the active navigation link.
  function setActiveLink( fragmentId ){
    var navbarDiv = document.getElementById( "navbar" ),
        links = navbarDiv.children,
        i, link, pageName;
    for( i = 0; i < links.length; i++ ){
      link = links[i];
      pageName = link.getAttribute( "href" ).substr(1);
      if( pageName === fragmentId ) {
        link.setAttribute( "class", "active" );
      } else {
        link.removeAttribute( "class" );
      }
    }
  }

  // Updates dynamic content based on the fragment identifier.
  function navigate(){
    // Get a reference to the "content" div.
    var contentDiv = document.getElementById( "content" ),
      // Isolate the fragment identifier using substr.
      // This gets rid of the "#" character.
      fragmentId = location.hash.substr(1);
    // Set the "content" div innerHTML based on the fragment identifier.
    getContent( fragmentId, function ( content ) {
      contentDiv.innerHTML = content;
    });
    // Toggle the "active" class on the link currently navigated to.
    setActiveLink( fragmentId );
  }
  // If no fragment identifier is provided,
  if( !location.hash ) {
    // default to #home.
    location.hash = "#home";
  }
  // Navigate once to the initial fragment identifier.
  navigate();
  // Navigate whenever the fragment identifier value changes.
  window.addEventListener( "hashchange", navigate );


  // RENDER POSTS
  // Adds a DOM structure for each post.
  function renderPosts( posts ) {
    // Get the DOM element that will contain the posts.
    var postsDiv = document.getElementById( "posts" );
    posts.forEach(function ( post ) {
      // Create the DOM elements.
      var postDiv = document.createElement( "div" ),
          postNameDiv = document.createElement( "div" ),
          postAuthorDiv = document.createElement( "div" ),
          postContentDiv = document.createElement( "div" ),
          postMainImg = document.createElement( "figure" );
      // Set the content of each element.´
      postNameDiv.innerHTML = post.name;
      postAuthorDiv.innerHTML = post.author;
      postContentDiv.innerHTML = post.content;
      if ( post.image ) {
        postMainImg.innerHTML = "<img src='" + post.image + "'>";
      } else {
        postMainImg.innerHTML = "(aún no hay foto...)";
      }
      // Set CSS classes on each div so they can be styled.
      postDiv.setAttribute( "class", "post" );
      postNameDiv.setAttribute( "class", "post-name" );
      postAuthorDiv.setAttribute( "class", "post-author" );
      postContentDiv.setAttribute( "class", "post-content" );
      postMainImg.setAttribute( "class", "post-main-image" );
      // Assemble the post div.
      postDiv.appendChild( postNameDiv );
      postDiv.appendChild( postAuthorDiv );
      postDiv.appendChild( postContentDiv );
      postDiv.appendChild( postMainImg );
      // Add the post div to the container for posts.
      postsDiv.appendChild( postDiv );
    });
  }

  // Fetches the file "posts.json" and passes the parsed JSON object into the given callback function.
  function getPosts( callback ){
    // Fetch the JSON file using XMLHttpRequest.
    var request = new XMLHttpRequest();
    // When the file has loaded,
    request.onload = function () {
      // parse the JSON text into an array of post objects.
      var posts = JSON.parse( request.responseText );
      // Pass the posts array to the callback.
      callback( posts );
    };
    request.open( "GET", "data/posts.json", true );
    request.send( null );
  }

  // The main program, which gets then renders posts.
  getPosts( function ( posts ) {
    renderPosts( posts );
  });


}());
