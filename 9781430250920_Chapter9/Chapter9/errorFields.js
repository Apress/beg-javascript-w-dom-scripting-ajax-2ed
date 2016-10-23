ef={
	error:[],
	errorMessage:null,
	errorClass:'error',
	errorTitle:'Please fix the marked issues',
	init:function(){
		ef.sendButton=document.getElementById('send');
		if(!ef.sendButton){return;}
		ef.f=document.getElementsByTagName('form')[0];
		DOMhelp.addEvent(ef.f,'submit',ef.send,false);
	},
	send:function(e){
		ef.flushErrors();
		for(var i in validationRules){
			if(!document.getElementById(i)){continue;}
			ef.checkValue(i);
		}
		if(ef.error.length>0){
			ef.errorMessage=document.createElement('div');
			ef.errorMessage.className=ef.errorClass;
			var errorTitle=document.createElement('h2');
			errorTitle.appendChild(document.createTextNode(ef.errorTitle));
			ef.errorMessage.appendChild(errorTitle);
			var sendPara=ef.sendButton.parentNode;	
			sendPara.parentNode.insertBefore(ef.errorMessage,sendPara);
			DOMhelp.cancelClick(e);		
		}
	},
	flushErrors:function(){
		var elm;
		ef.error=[];
		if(ef.errorMessage){
			ef.errorMessage.parentNode.removeChild(ef.errorMessage);
			ef.errorMessage=null;
		}			
		for(var i in validationRules){
			elm=document.getElementById(i);
			if(!elm){continue;}
			if(elm.previousSibling && 
			   elm.previousSibling.nodeName.toLowerCase()=='span' && 
			   elm.previousSibling.className==ef.errorClass){
				elm.parentNode.removeChild(elm.previousSibling);
			}
		}
	},
	checkValue:function(o){
		var elm=document.getElementById(o);
		switch(elm.type){
			case 'text':
				if(!validationRules[o]['pattern'].test(elm.value)){
					ef.error.push(validationRules[o]['error']);
					ef.addErrorMsg(elm,validationRules[o]['error']);
				}
			break;
			case 'textarea':
				if(!validationRules[o]['pattern'].test(elm.value)){
					ef.error.push(validationRules[o]['error']);
					ef.addErrorMsg(elm,validationRules[o]['error']);
				}
			break;
			case 'select-one':
				var curelm=elm.options[elm.selectedIndex].value;
				if(elm.selectedIndex==5){
					curelm=document.getElementById('otherSubject').value;
				}
				if(!validationRules[o]['pattern'].test(curelm)){
					ef.error.push(validationRules[o]['error']);
					ef.addErrorMsg(elm,validationRules[o]['error']);
				}
			break;
		}				
	},
	addErrorMsg:function(o,msg){
		var errorMsg=document.createElement('span');
		errorMsg.className=ef.errorClass;
		errorMsg.appendChild(document.createTextNode(msg));
		o.parentNode.insertBefore(errorMsg,o);
	}
}
DOMhelp.addEvent(window,'load',ef.init,false);
