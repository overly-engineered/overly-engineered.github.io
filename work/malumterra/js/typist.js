var textCounter = 0;
function main(textToInsert, destination, i){
	setTimeout(function () {
		destination.innerHTML += textToInsert.charAt(textCounter);
		textCounter++;
		if(textCounter < textToInsert.length){
			main(textToInsert, destination, i);
		} else {
			textCounter = 0;
			document.getElementById('buttonSection').style.display = 'block';
			return false;
		}
	}, 1)
}
module.exports = {
	type : main
};
