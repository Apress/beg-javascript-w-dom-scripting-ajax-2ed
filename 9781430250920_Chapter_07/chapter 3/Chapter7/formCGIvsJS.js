validate={
	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		if(document.forms.length<1){return;}
		DOMhelp.addEvent(document.forms[0],'submit',validate.validateForm,false);
	},
	validateForm:function(e){
		var error='';
		t=DOMhelp.getTarget(e);
		var elms=t.elements;
		for(var i=0;i<elms.length;i++){
			if(elms[i].name.indexOf('amount')!=-1){
				if(elms[i].value=='' || !parseInt(elms[i].value)){
					error+='Please enter a valid amount';
					alert(error);
					elms[i].value='';
					elms[i].focus();
					break;
				}
			}
		}
		if(error!=''){
			DOMhelp.cancelClick(e);
			return false;
		} else {
			t.submit();
					alert(t.nodeName);
		}
	}

}
DOMhelp.addEvent(window,'load',validate.init,false);