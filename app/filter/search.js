'use strict';

module.exports = function() {
  return function(galleries, query) {
    let fuzzyRegEx = generateFuzzyRegEx(query);

    return galleries.filter(gallery => {
      return fuzzyRegEx.test(gallery.name.toUpperCase());
    });
  };
};

function generateFuzzyRegEx(userInput) {
  if (!userInput) return /.*/;
  let fuzzyString = '.*' + userInput.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
};
