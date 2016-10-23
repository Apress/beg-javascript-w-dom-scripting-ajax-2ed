df={
	error:[],
	errorMessage:null,
	errorClass:'error',
	errorTitle:'Please fix the marked issues',
	init:function(){
		var elm;
		df.sendButton=document.getElementById('send');
		if(!df.sendButton){return;}
		df.f=document.getElementsByTagName('form')[0];
		DOMhelp.addEvent(df.f,'submit',df.send,false);
		for(var i in validationRules){
			elm=document.getElementById(i);
			if(!elm){continue;}
			DOMhelp.addEvent(elm,'blur',df.sendField,false);
		}
	},
	sendField:function(e){
		var t=DOMhelp.getTarget(e);
		if(t.previousSibling && 
		   t.previousSibling.nodeName.toLowerCase()=='span' && 
		   t.previousSibling.className==df.errorClass){
			t.parentNode.removeChild(t.previousSibling);
		}
		df.checkValue(t.id);
	},
	send:function(e){
		df.flushErrors();
		for(var i in validationRules){
			if(!document.getElementById(i)){continue;}
			df.checkValue(i);
		}
		if(df.error.length>0){
			df.errorMessage=document.createElement('div');
			df.errorMessage.className=df.errorClass;
			var errorTitle=document.createElement('h2');
			errorTitle.appendChild(document.createTextNode(df.errorTitle));
			df.errorMessage.appendChild(errorTitle);
			var sendPara=df.sendButton.parentNode;	
			sendPara.parentNode.insertBefore(df.errorMessage,sendPara);
			DOMhelp.cancelClick(e);		
		}
	},
	flushErrors:function(){
		var elm;
		df.error=[];
		if(df.errorMessage){
			df.errorMessage.parentNode.removeChild(df.errorMessage);
			df.errorMessage=null;
		}			
		for(var i in validationRules){
			elm=document.getElementById(i);
			if(!elm){continue;}
			if(elm.previousSibling && 
			   elm.previousSibling.nodeName.toLowerCase()=='span' && 
			   elm.previousSibling.className==df.errorClass){
				elm.parentNode.removeChild(elm.previousSibling);
			}
		}
	},
	checkValue:function(o){
		var elm=document.getElementById(o);
		switch(elm.type){
			case 'text':
				if(!validationRules[o]['pattern'].test(elm.value)){
					df.error.push(validationRules[o]['error']);
					df.addErrorMsg(elm,validationRules[o]['error']);
				}
			break;
			case 'textarea':
				if(!validationRules[o]['pattern'].test(elm.value)){
					df.error.push(validationRules[o]['error']);
					df.addErrorMsg(elm,validationRules[o]['error']);
				}
			break;
			case 'select-one':
				var curelm=elm.options[elm.selectedIndex].value;
				if(elm.selectedIndex==5){
					curelm=document.getElementById('otherSubject').value;
				}
				if(!validationRules[o]['pattern'].test(curelm)){
					df.error.push(validationRules[o]['error']);
					df.addErrorMsg(elm,validationRules[o]['error']);
				}
			break;
		}				
	},
	addErrorMsg:function(o,msg){
		var errorMsg=document.createElement('span');
		errorMsg.className=df.errorClass;
		errorMsg.appendChild(document.createTextNode(msg));
		o.parentNode.insertBefore(errorMsg,o);
	}
}
DOMhelp.addEvent(window,'load',df.init,false);
