
	
	var mileStones = [];
	var taskType = "";
	var log = "";
	var answers = "";
	var retrievalStatus = false;
	var preEvent="";
	var testId = "";
	var taskId = "";
	var entryPoint = "";
	var cookies = [];
	var totalTime = 0;
	var hintTimer = null;
	var time = null;
	var stopped = false; 
	
	
	window.onload = function() {
		initializeCookies();
		loadMilestones();
		var totalTime = 0;
		var hintTimer = window.setInterval(displayHint, settings.hintTime);
		var time = setInterval( clock,1000);
		var stopped = false; 
		loadQuizSetup();
		setTaskType();
		
		window.document.getElementById("monitor").addEventListener("load", getEventData);
		window.document.getElementById("monitor").contentWindow.location.replace(entryPoint);
		window.addEventListener("message", receiveMessage);	
		
		window.document.getElementById("hint").addEventListener("click",giveHint);
		window.document.getElementById("quizButton").addEventListener("click",showQuiz);
		window.document.getElementById("quizCloseButton").addEventListener("click",closeQuiz);
		window.document.getElementById("pause-btn").addEventListener("click",stop);
		window.document.getElementById("cancel").addEventListener("click",cancelTask);
	};

	
	
		
	function getEventData(){
		
		var iframe = window.document.getElementById("monitor");
		var idoc = iframe.contentDocument;
		
		iframe.contentDocument.addEventListener("click",function(event){
			var ipar = iframe.contentWindow;
			var el = event.target;
			var info = event.type + " " + event.target.tagName + " " + indexOf(el, idoc.getElementsByTagName(event.target.tagName)) + " " + iframe.contentDocument.URL;
			ipar.parent.postMessage(info, entryPoint);
			document.getElementById("res").innerHTML += info;
		});
		
	}
	
	function clock() {
		totalTime++;
		var timeEl = window.document.getElementById("time");
		timeEl.innerHTML = totalTime;
	}

	function receiveMessage(event) {
	
		if(!stopped) {
			log += event.data + " " + totalTime + "<br>";
			recentActivity = event.data; 
			var preEventReached = (log.includes(preEvent));
			
			
			
			if(log.includes(preEvent) && taskType == "RETRIEVAL") {
				document.getElementById("quizButton").style.display="block";
			}

			if( recentActivity == mileStones[mileStones.length -1] && retrievalStatus ) {
				
				finishTest();
			} else {
				
				var effectiveStage = mileStones.findIndex(recentActivity);
				if( effectiveStage > currentStage) {
					currenStage = effectiveStage + 1;
					clearInterval(hintTimer);
					hintTimer = setInterval(displayHint,settings.hintTime);
					document.getElementById("hint").style.display = "none";
				}  
			}
		}
	}
	
	function displayHint(){
		if(!checkMilestones() && !trailDone) {
			document.getElementById("hint").style.display = "block";
		}
	}
	
	function sendData(){
		var request = new XMLHttpRequest(); 
		request.open("POST","http://localhost:8080/PTT2/save",false);
		request.send(log);
	}
	
	function indexOf( element, nList) {
		var i = 0;
		var res = 0;
		for(i = 0; i < nList.length; i++){
			if(nList[i].isEqualNode(element)){
				res = i;
			} 
		}
		return res;
	}
	
	function setTaskType() {
		var i = 0;
		for( i = 0; i < cookies.length; i++) {
			if(cookies[i].startsWith("taskType")) {
				taskType = cookies[i].split("=")[1];
				break;
			}
		}
		
		if(taskType == "RETRIEVAL") {
			retrievalStatus = false;
		} else {
			retrievalStatus = true; 
		}
	}

	
	var help = ""; 
	function checkConstraints(){
		
		var result =true;
		var counter = 0;
		var ans = answers.split(";");
		document.getElementById("err").innerHTML = "";
		for( counter; counter < ans.length; counter++) {
			help = "q" + counter;
			
			var x = document.getElementById(help).value ;
			
			if(x != ans.find(checkCondition).split(":")[1]) {
				document.getElementById("err").innerHTML += " Wrong answer to question " 
				+ (counter + 1) + ".";
				result &= false;
			} else {
				result &= true;
			}
			
		}
		
		if(result) {
			finishTest();
		}
		
	}
	
	function checkCondition(element) {
		return element.startsWith(help);
	}
	
	function finishTest() {  
				trailDone = true;
				clearInterval(hintTimer);  
				document.getElementById("hint").style.display = "none";
				sendData();
				document.cookie = "finishStatus=completed;path=/";
				window.location.replace("http://localhost:8080/PTT2/finish");
	}
	