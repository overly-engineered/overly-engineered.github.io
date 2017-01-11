var display = require('./display.js');
var data = require('./data.js');
var listeners = require('./listeners.js');

function init(){
  if(data.returnUserDisplayName() == null) {
    display.newUser(true);
  } else {
    display.newUser(false);
    display.updateValue('displayName', data.returnUserDisplayName());
    data.displayStatsData();
    main();
  }
};

function main(){
  data.currentPage();
  listenerPolls();
  //listeners.responseListeners();
  //display.addContent(text);
}

function listenerPolls(){
  var elems = document.getElementsByClassName('story');
  if(elems.length != 0){
    for(i = 0; i < elems.length; i++){
      elems[i].addEventListener("click", function(){
        response(this);
        //return true;
      }, false);
    }
  } else {
    setTimeout(listenerPolls, 100);
  }
}

function response(elem){
  var responseID = elem.getAttribute('data-responsenumber');
  data.inputResponse(responseID);
}

module.exports = {
	start : init,
  response : response
};
