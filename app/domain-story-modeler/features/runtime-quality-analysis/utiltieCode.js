
/**
 * Now we need to find a way to iterate over all canvasItems and retrieve their names in a
 * loop. This way, we can actually extract the "service" names.
 * 
 * We can actually differentiate the items by their id's containing 'connection_' for activities
 * and containing 'shape_' for nodes, i.e., work objects and actors.
 */

// Get item on canvas
let canvasItemsList = document.getElementsByClassName('djs-group');

// Get the first item on the canvas
let SVGItemParent = canvasItemsList[0];

// First level
let SVGItemFirstChild = SVGItemParent.firstChild;

let SVGItemSecondChild = SVGItemFirstChild.firstChild;

// Actual text node containing the text value
let SVGItemText = SVGItemSecondChild.children[1];

// this is the actual name of the node!
let canvasItemName = SVGItemText.textContent;

