
// RENDER POSTS
(function () {
  // Adds a DOM structure for each post.
  function renderPosts( posts ) {
    // Create the DOM element that will contain the posts.
    var containerDiv = document.getElementById( "mainContent" ),
        postsDiv = document.createElement( "section" );
    postsDiv.setAttribute( "id", "posts" );
    containerDiv.appendChild( postsDiv );

    posts.forEach(function ( post ) {
      // Create the DOM elements.
      var postDiv = document.createElement( "article" ),
          postNameDiv = document.createElement( "h2" ),
          postAuthorDiv = document.createElement( "small" ),
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
      postNameDiv.setAttribute( "class", "post__name" );
      postAuthorDiv.setAttribute( "class", "post__author" );
      postContentDiv.setAttribute( "class", "post__content" );
      postMainImg.setAttribute( "class", "post__main-image" );
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

  if (location.hash.substr(1) === "blog") {
    console.log(location.hash.substr(1));
    // The main program, which gets then renders posts.
    getPosts( function ( posts ) {
      renderPosts( posts );
    });
  }
}());
