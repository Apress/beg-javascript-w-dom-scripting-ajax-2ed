toplist={
	error:[],
	errorMessage:null,
	errorClass:'error',
	errorTitle:'Please fix the following problems:',
	sendButtonID:'send',
	init:function(){
		toplist.sendButton=document.getElementById(toplist.sendButtonID);
		if(!toplist.sendButton){return;}
		toplist.f=document.getElementsByTagName('form')[0];
		DOMhelp.addEvent(toplist.f,'submit',toplist.send,false);
	},
	send:function(e){
		toplist.flushErrors();
		for(var i in validationRules){
			if(!document.getElementById(i)){continue;}
			toplist.checkValue(i);
		}
		if(toplist.error.length>0){
			toplist.errorMessage=document.createElement('div');
			toplist.errorMessage.className=toplist.errorClass;
			var errorTitle=document.createElement('h2');
			errorTitle.appendChild(document.createTextNode(toplist.errorTitle));
			toplist.errorMessage.appendChild(errorTitle);
			entry=document.createElement('ul');
			toplist.errorMessage.appendChild(errorTitle);
			toplist.errorMessage.appendChild(entry);
			toplist.errorList=entry;
			for(i=0;i<toplist.error.length;i++){
				entry=document.createElement('li');
				entry.appendChild(document.createTextNode(toplist.error[i]));
				toplist.errorList.appendChild(entry);
			}
			var sendPara=toplist.sendButton.parentNode;	
			sendPara.parentNode.insertBefore(toplist.errorMessage,sendPara);
			DOMhelp.cancelClick(e);		
		}
	},
	flushErrors:function(){
		toplist.error=[];
		if(toplist.errorMessage){
			toplist.errorMessage.parentNode.removeChild(toplist.errorMessage);
			toplist.errorMessage=null;
		}			
	},
	checkValue:function(o){
		var elm=document.getElementById(o);
		switch(elm.type){
			case 'text':
				if(!validationRules[o]['pattern'].test(elm.value)){
					toplist.error.push(validationRules[o]['error']);
				}
			break;
			case 'textarea':
				if(!validationRules[o]['pattern'].test(elm.value)){
					toplist.error.push(validationRules[o]['error']);
				}
			break;
			case 'select-one':
				var curelm=elm.options[elm.selectedIndex].value;
				if(elm.selectedIndex==5){
					curelm=document.getElementById('otherSubject').value;
				}
				if(!validationRules[o]['pattern'].test(curelm)){
					toplist.error.push(validationRules[o]['error']);
				}
			break;
		}				
		
	}
}
DOMhelp.addEvent(window,'load',toplist.init,false);
