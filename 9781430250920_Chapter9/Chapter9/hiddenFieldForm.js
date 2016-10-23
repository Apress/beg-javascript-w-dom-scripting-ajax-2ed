hfv={
	error:[],
	errorMessage:null,
	errorClass:'error',
	errorTitle:'Please fix the following problems:',
	init:function(){
		hfv.sendButton=document.getElementById('send');
		if(!hfv.sendButton){return;}
		hfv.f=document.getElementsByTagName('form')[0];
		var mandatory=document.getElementById('mandatory');
		if(!mandatory){return;}
		hfv.mandatory=mandatory.value.split(',');
		DOMhelp.addEvent(hfv.f,'submit',hfv.send,false);
	},
	send:function(e){
		hfv.flushErrors();
		for(var i=0;i<hfv.mandatory.length;i++){
			if(!document.getElementById(hfv.mandatory[i])){continue;}
			hfv.checkValue(hfv.mandatory[i]);
		}
		if(hfv.error.length>0){
			hfv.errorMessage=document.createElement('div');
			hfv.errorMessage.className=hfv.errorClass;
			var errorTitle=document.createElement('h2');
			errorTitle.appendChild(document.createTextNode(hfv.errorTitle));
			hfv.errorMessage.appendChild(errorTitle);
			entry=document.createElement('ul');
			hfv.errorMessage.appendChild(errorTitle);
			hfv.errorMessage.appendChild(entry);
			for(i=0;i<hfv.error.length;i++){
				entry=document.createElement('li');
				entry.appendChild(document.createTextNode(hfv.error[i]));
				hfv.errorMessage.getElementsByTagName('ul')[0].appendChild(entry);
			}
			var sendPara=hfv.sendButton.parentNode;	
			sendPara.parentNode.insertBefore(hfv.errorMessage,sendPara);
			DOMhelp.cancelClick(e);		
		}
	},
	flushErrors:function(){
		hfv.error=[];
		if(hfv.errorMessage){
			hfv.errorMessage.parentNode.removeChild(hfv.errorMessage);
			hfv.errorMessage=null;
		}			
	},
	checkValue:function(o){
		var elm=document.getElementById(o);
		switch(elm.type){
			case 'text':
				if(elm.value==''){
					hfv.error.push('Please enter a '+elm.id);
				}
			break;
			case 'textarea':
				if(elm.value==''){
					hfv.error.push('Please enter a '+elm.id);
				}
			break;
			case 'select-one':
				var curelm=elm.options[elm.selectedIndex].value;
				if(elm.selectedIndex==5){
					curelm=document.getElementById('otherSubject').value;
				}
				if(curelm==''){
					hfv.error.push('Please enter a '+elm.id);
				}
			break;
		}				
	}
}
DOMhelp.addEvent(window,'load',hfv.init,false);
