'use strict';

var BASE_URI='http://demo.nutrio.com'
function buildURI(path) {
  return BASE_URI + path
}
function getImageSource(recipe: Object, type: ?int): {uri: ?string} {
  var uri = {uri: null};
  var image = recipe.images.find( function(image) {
    if(image.type_id === type){
      return image;
    }
  });
  if(image){
    uri.uri = buildURI(image.url)
  }
  return uri;
}

module.exports = getImageSource;