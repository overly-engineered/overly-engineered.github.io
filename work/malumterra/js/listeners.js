var auth = require('./auth.js');
function init(){
  document.getElementById('loginbutton').addEventListener("click", function(){
    auth.login();
  }, false);
  document.getElementById('signupbutton').addEventListener("click", function(){
    auth.signup();
  }, false);
  document.getElementById('signout').addEventListener("click", function(){
    auth.signout();
  }, false);
  document.getElementById('newUserbutton').addEventListener("click", function(){
    data.createUserName();
  }, false);
}

function response(elem){
  elem.addEventListener("click", function(){
    response(elem.getAttribute('data-responseNumber'));
    //return true;
  }, false);
}

module.exports = {
	init : init,
  responseListeners : response
};
