'use strict';

import { is } from 'bpmn-js/lib/util/ModelUtil';

function getLabelAttr(semantic) {
  if (is(semantic, 'domainStory:actorPerson') ||
    is(semantic, 'domainStory:actorGroup') ||
    is(semantic, 'domainStory:actorSystem') ||
    is(semantic, 'domainStory:workObject') ||
    is(semantic, 'domainStory:workObjectFolder') ||
    is(semantic, 'domainStory:workObjectCall') ||
    is(semantic, 'domainStory:workObjectEmail') ||
    is(semantic, 'domainStory:workObjectBubble') ||
    is(semantic, 'domainStory:activity') ||
    is(semantic, 'domainStory:group') ||
    is(semantic, 'domainStory:workObjectInfo')) {

    return 'name';
  }

  if (is(semantic, 'domainStory:textAnnotation')) {
    return 'text';
  }
}

function getNumberAttr(semantic) {
  if (is(semantic, 'domainStory:activity')) {

    return 'number';
  }
}

export function getLabel(element) {
  var semantic = element.businessObject,
      attr = getLabelAttr(semantic);

  if (attr) {
    return semantic[attr] || '';
  }
}

export function getNumber(element) {
  var semantic = element.businessObject,
      attr = getNumberAttr(semantic);

  if (attr) {
    return semantic[attr] || '';
  }
}

export function setLabel(element, text) {
  var semantic = element.businessObject,
      attr = getLabelAttr(semantic);

  if (attr) {
    semantic[attr] = text;
  }

  return element;
}

export function setNumber(element, textNumber) {
  var semantic = element.businessObject,
      attr = getNumberAttr(semantic);

  if (attr) {
    semantic[attr] = textNumber;
  }

  return element;
}


/**
 * copied from https://www.w3schools.com/howto/howto_js_autocomplete.asp on 18.09.2018
 */
export function autocomplete(inp, arr, element) {
  closeAllLists();

  /* the autocomplete function takes three arguments,
  the text field element and an array of possible autocompleted values and an optional element to which it is appended:*/
  var currentFocus;
  /* execute a function when someone writes in the text field:*/
  inp.addEventListener('input', function(e) {
    /* the direct editing field of actors and workobjects is a recycled html-element and has old values that need to be overridden*/
    if (element.type.includes('domainStory:workObject')) {
      this.value = this.innerHTML;
    }
    var autocompleteList, autocompleteItem, val = this.value;
    /* close any already open lists of autocompleted values*/
    closeAllLists();
    currentFocus = -1;
    /* create a DIV element that will contain the items (values):*/
    autocompleteList = document.createElement('DIV');
    autocompleteList.setAttribute('id', 'autocomplete-list');
    autocompleteList.setAttribute('class', 'autocomplete-items');
    /* append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(autocompleteList);
    /* for each item in the array...*/
    for (const name of arr) {
      /* check if the item starts with the same letters as the text field value:*/
      if (name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /* create a DIV element for each matching element:*/
        autocompleteItem = document.createElement('DIV');
        /* make the matching letters bold:*/
        autocompleteItem.innerHTML = '<strong>' + name.substr(0, val.length) + '</strong>' + name.substr(val.length);
        /* insert an input field that will hold the current name:*/
        autocompleteItem.innerHTML += '<input type=\'hidden\' value=\'' + name + '\'>';
        /* execute a function when someone clicks on the item (DIV element):*/
        autocompleteItem.addEventListener('click', function(e) {
          /* insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName('input')[0].value;
          inp.innerHTML = this.getElementsByTagName('input')[0].value;
          /* close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        autocompleteList.appendChild(autocompleteItem);
      }
    }
    // if we edit an actor, we do not want auto-complete, since actors generally are unique
    if (element.type.includes('domainStory:actor')) {
      autocompleteList.style.visibility = 'hidden';
    }
  });

  /* execute a function presses a key on the keyboard:*/
  inp.addEventListener('keydown', function(e) {
    var autocompleteList = document.getElementById('autocomplete-list');
    if (autocompleteList) autocompleteList = autocompleteList.getElementsByTagName('div');
    if (e.keyCode == 40) {
      /* If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /* and and make the current item more visible:*/
      addActive(autocompleteList);
    } else if (e.keyCode == 38) { // up
      /* If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /* and and make the current item more visible:*/
      addActive(autocompleteList);
    } else if (e.keyCode == 13) {
      /* If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item:*/
        if (autocompleteList) autocompleteList[currentFocus].click();
      }
    }
  });

  function addActive(autocompleteList) {
    /* a function to classify an item as "active":*/
    if (!autocompleteList || autocompleteList.length < 1) return false;
    /* start by removing the "active" class on all items:*/
    removeActive(autocompleteList);
    if (currentFocus >= autocompleteList.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (autocompleteList.length - 1);
    /* add class "autocomplete-active":*/
    autocompleteList[currentFocus].classList.add('autocomplete-active');
  }

  function removeActive(autocompleteList) {
    /* a function to remove the "active" class from all autocomplete items:*/
    for (const item of autocompleteList) {
      item.classList.remove('autocomplete-active');
    }
  }

  function closeAllLists(survivor) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var autocompleteList = document.getElementsByClassName('autocomplete-items');
    for (const item of autocompleteList) {
      if (survivor != item && survivor != inp) {
        item.parentNode.removeChild(item);
      }
    }
  }

  /* execute a function when someone clicks in the document:*/
  document.addEventListener('click', function(e) {
    closeAllLists(e.target);
  });
}