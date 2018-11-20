	
	function initializeCookies() {
		var i = 0;
		cookies = window.document.cookie.split("; ");
		for(i = 0; i < cookies.length; i++) {
			
				if(cookies[i].startsWith("testId")) {
					testId =cookies[i].split("=")[1];
				}
				if(cookies[i].startsWith("taskCounter")) {
					taskId = cookies[i].split("=")[1];
				}
				if(cookies[i].startsWith("entryPoint")) {
					var value = cookies[i].split("=")[1];
					entryPoint = value.substr(1,value.length-2);
				}if(cookies[i].startsWith("taskType")) {
					taskType = cookies[i].split("=")[1];
				}
		}
	}
	
	function loadMilestones(){
		
		var respText = "";
		var request = new XMLHttpRequest();  
	    request.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	var buf = this.responseText.split(";");
	        	var i = 0;
				for( i = 0; i < buf.length; i++) {
	    			mileStones[i]=buf[i];
	    		}
	       } else {
			   if(this.readyState == 4 && this.status >= 400) {
				 window.location.replace("http://localhost:8330/html-files/testNotAvailable.html");  
			   }
		   }
		   
	    };
	    
		request.open("GET","http://localhost:8330/Hintservice4/hints/hint/" + testId + "/" + taskId,true);
		request.send();
	}
	
	function loadQuizSetup() { 
		
		var request = new XMLHttpRequest();  
	    request.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	document.getElementById("quizForm").innerHTML  = this.responseText + 
				"<button onclick=\"checkConstraints()\" >check answers</button>";
	       }else {
			   if(this.readyState == 4 && this.status >= 400) {
				 window.location.replace("http://localhost:8330/html-files/testNotAvailable.html");  
			   }
		   }
	    };
	    
		request.open("GET","http://localhost:8330/QuestionService/service/get/questions/" 
		+ testId + "/" + taskId,true);
		request.send();
		
		var request2 = new XMLHttpRequest();  
	    request2.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	    			answers+=this.responseText;
	       }else {
			   if(this.readyState == 4 && this.status >= 400) {
				 window.location.replace("http://localhost:8330/html-files/testNotAvailable.html");  
			   }
		   }
	    };
	    
		request2.open("GET","http://localhost:8330/QuestionService/service/get/answers/" 
		+ testId + "/" + taskId,true);
		request2.send();
		
		var request3 = new XMLHttpRequest();  
	    request3.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
				preEvent += this.responseText;
	       } else {
			   if(this.readyState == 4 && this.status >= 400) {
				 window.location.replace("http://localhost:8330/html-files/testNotAvailable.html");  
			   }
		   }
	    };  
		request3.open("GET","http://localhost:8330/QuestionService/service/get/preEvent/" 
		+ testId + "/" + taskId,true);
		request3.send();
			setTaskType();
		
	}
	
	