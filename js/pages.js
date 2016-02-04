// RENDER POSTS
(function () {
  // Adds a DOM structure for each page.
  function renderPages( pages ) {
    // Create the DOM element that will contain the pages.
    var containerDiv = document.getElementById( "mainContent" ),
        pagesDiv = document.createElement( "section" );
    pagesDiv.setAttribute( "id", "pages" );
    containerDiv.appendChild( pagesDiv );

    pages.forEach(function ( page ) {
      // Create the DOM elements.
      var pageDiv = document.createElement( "article" ),
          pageNameDiv = document.createElement( "h2" ),
          pageAuthorDiv = document.createElement( "small" ),
          pageContentDiv = document.createElement( "div" ),
          pageMainImg = document.createElement( "figure" );
      // Set the content of each element.´
      pageNameDiv.innerHTML = page.name;
      pageAuthorDiv.innerHTML = page.author;
      pageContentDiv.innerHTML = page.content;
      if ( page.image ) {
        pageMainImg.innerHTML = "<img src='" + page.image + "'>";
      } else {
        pageMainImg.innerHTML = "(aún no hay foto...)";
      }
      // Set CSS classes on each div so they can be styled.
      pageDiv.setAttribute( "class", "page" );
      pageNameDiv.setAttribute( "class", "page-name" );
      pageAuthorDiv.setAttribute( "class", "page-author" );
      pageContentDiv.setAttribute( "class", "page-content" );
      pageMainImg.setAttribute( "class", "page-main-image" );
      // Assemble the page div.
      pageDiv.appendChild( pageNameDiv );
      pageDiv.appendChild( pageAuthorDiv );
      pageDiv.appendChild( pageContentDiv );
      pageDiv.appendChild( pageMainImg );
      // Add the page div to the container for pages.
      pagesDiv.appendChild( pageDiv );
    });
  }

  // Fetches the file "pages.json" and passes the parsed JSON object into the given callback function.
  function getPages( callback ){
    // Fetch the JSON file using XMLHttpRequest.
    var request = new XMLHttpRequest();
    // When the file has loaded,
    request.onload = function () {
      // parse the JSON text into an array of page objects.
      var pages = JSON.parse( request.responseText );
      // Pass the pages array to the callback.
      callback( pages );
    };
    request.open( "GET", "data/pages.json", true );
    request.send( null );
  }

  if (location.hash.substr(1) !== "blog") {
    console.log(location.hash.substr(1));
    // The main program, which gets then renders pages.
    getPages( function ( pages ) {
      renderPages( pages );
    });
  }

}());
