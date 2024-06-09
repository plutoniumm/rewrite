const ignore_lists = [
  {
    includes: [ "not supported by Markdown renderer", "math_display" ]
  }
]

window.onerror = function ( msg, url, line, col, error ) {
  const href = window.location.href;
  url = url.replace( href, '' );
  const loc = `${ url }:${ line }:${ col }`;

  // ignore
  for ( const ignore of ignore_lists ) {
    let match = true;
    for ( const include of ignore.includes ) {
      if ( !msg.includes( include ) ) {
        match = false;
        break;
      }
    }
    if ( match ) return true;
  }

  const data = {
    loc,
    error: error.toString(),
  };

  console.log( data );
  return true;
};