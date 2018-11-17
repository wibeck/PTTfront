
	function cancelTask() {
		log  +="<br>" + 
		 "click " + "cancel " + "0 " + " - " + totalTime;
		window.document.cookie = "finishStatus=cancelled;path=/";
		sendData();
		window.location.replace("http://localhost:8330/PTT2/finish");

	}
	
	function stop(){
		clearInterval(time);
		window.document.getElementById("pause-btn").innerHTML = "continue";
		window.document.getElementById("pause-btn").setAttribute("onclick","cont()");
		stopped = true; 
	}
	
	function cont(){
		time = setInterval(clock, 1000);
		document.getElementById("pause-btn").innerHTML = "pause";
		document.getElementById("pause-btn").setAttribute("onclick","stop()");
		stopped = false;
		
	}
	
	function showQuiz() {
		document.getElementById("quizPopup").style.display="block";
		document.getElementById("quizPopup").style.position="absolute";
		document.getElementById("quizPopup").style.zIndex="1";
		document.getElementById("quizPopup").style.height="500px";
		document.getElementById("quizPopup").style.backgroundColor="white";
		document.getElementsByTagName("body")[0].style.zIndex="0";
	}
	function closeQuiz() {
		document.getElementById("quizPopup").style.display="none";
	}
	
	
	
	function giveHint(){
		alert(mileStones[currentStage]);
	}
		