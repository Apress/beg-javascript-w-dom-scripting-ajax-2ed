		toplist={
			error:[],
			errorMessage:null,
			errorClass:'error',
			errorTitle:'Please fix the following problems:',
			errorLink:'Back to form',
			errorLinkClass:'errorlink',
			init:function(){
				toplist.sendButton=document.getElementById('send');
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
					entry=document.createElement('li');
					var closeLink=DOMhelp.createLink('#',toplist.errorLink);
					DOMhelp.addEvent(closeLink,'click',toplist.flushErrors,false);
					closeLink.onclick=function(){return false;}
					entry.appendChild(closeLink);
					entry.className=toplist.errorLinkClass;		
					toplist.errorList.appendChild(entry);			
					toplist.f.style.display='none';	
					toplist.f.parentNode.insertBefore(toplist.errorMessage,toplist.f);
					DOMhelp.cancelClick(e);		
				}
			},
			flushErrors:function(){
				toplist.error=[];
				if(toplist.errorMessage){
					toplist.errorMessage.parentNode.removeChild(toplist.errorMessage);
					toplist.errorMessage=null;
				}			
				toplist.f.style.display='block';	
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
