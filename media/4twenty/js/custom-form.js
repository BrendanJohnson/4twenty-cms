window.onload = function(){

	var myLabels = document.getElementsByTagName("label");
	for (myLabel in myLabels)
	{
		var myText = myLabels[myLabel].innerHTML;
		if ( myText )
		{
			myText = myText.replace("*", "<span class='required'>*</span>");
			myLabels[myLabel].innerHTML = myText;	
		}

	}

};