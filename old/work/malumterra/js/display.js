var typist = require('./typist.js');
var main = document.getElementById('main');
var footer = document.getElementById('footer');
var login = document.getElementById('login');
var newUser = document.getElementById('newUser');
var health = document.getElementById('health');
var purity = document.getElementById('purity');
var coin = document.getElementById('coin');
var mainContent = document.getElementById('mainContent');
var buttonSection = document.getElementById('buttonSection');


function init(loggedIn){
	if(loggedIn) {
		main.style.display = 'block';
		footer.style.display = 'block';
		login.style.display = 'none';
		return true;
	} else {
		main.style.display = 'none';
		footer.style.display = 'none';
		login.style.display = 'block';
		return false;
	}
}

function newUserForm(bool){
	if(bool){
		newUser.style.display = 'block';
	} else {
		newUser.remove();
	}
}

function updateValue(elem, value){
	document.getElementById(elem).innerHTML = value;
}

function setStats(data){
	health.innerHTML = data.val().health;
	purity.innerHTML = data.val().purity;
	coin.innerHTML = data.val().coin;
}

function addContent(val){
		typist.type(val, mainContent, 0);
}

function addChoices(val){
	for(i = 0; i < val.length; i++) {
		var newButton = document.createElement('button');
		newButton.className = "third story";
		newButton.appendChild(document.createTextNode(val[i].text));
		newButton.setAttribute('data-responseNumber', i);
		buttonSection.appendChild(newButton);
	}
}

module.exports = {
	init : init,
	newUser : newUserForm,
	updateValue : updateValue,
	setStats : setStats,
	addContent : addContent,
	addChoices : addChoices
};
