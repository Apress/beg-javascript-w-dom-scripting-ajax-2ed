sn={
	dynamicClass:'dyn',
	showClass:'show',
	parentClass:'parent',
	openClass:'open',
	parentIndicator:'<img src="plus.gif" alt="open section" title="open section">',
	openIndicator:'<img src="minus.gif" alt="close section" title="close section">',
	navID:'nav',
	init:function(){
		if(window.location.search.indexOf('ajax')==-1){return;}
		var parentLI,triggerLink;
		if(!document.getElementById || !document.createTextNode){return;}
		var nav=document.getElementById(sn.navID);
		if(!nav){return;}
		DOMhelp.cssjs('add',nav,sn.dynamicClass);		
		var nested=nav.getElementsByTagName('ul');
		for(var i=0;i<nested.length;i++){
			parentLI=nested[i].parentNode;
			triggerLink=document.createElement('a');
			triggerLink.setAttribute('href','#')
			triggerLink.innerHTML=sn.parentIndicator;
			parentLI.insertBefore(triggerLink,parentLI.firstChild);
			DOMhelp.addEvent(triggerLink,'click',sn.changeSection,false);
			DOMhelp.cssjs('add',parentLI,sn.parentClass);		
			triggerLink.onclick=DOMhelp.safariClickFix;
			if(parentLI.getElementsByTagName('strong').length>0){
				DOMhelp.cssjs('add',parentLI,sn.openClass);		
				DOMhelp.cssjs('add',nested[i],sn.showClass);		
				parentLI.getElementsByTagName('a')[0].innerHTML=sn.openIndicator
			}
		}
	},
	changeSection:function(e){
		var t=DOMhelp.getTarget(e);
		while(t.nodeName.toLowerCase()!='a'){
			t=t.parentNode;
		}
		var firstList=t.parentNode.getElementsByTagName('ul')[0];
		if(DOMhelp.cssjs('check',firstList,sn.showClass)){
			DOMhelp.cssjs('remove',firstList,sn.showClass)
			DOMhelp.cssjs('swap',t.parentNode,sn.openClass,sn.parentClass);
			t.innerHTML=sn.parentIndicator;
		} else {
			DOMhelp.cssjs('add',firstList,sn.showClass)
			DOMhelp.cssjs('swap',t.parentNode,sn.openClass,sn.parentClass);
			t.innerHTML=sn.openIndicator;
		}
		DOMhelp.cancelClick(e);
	}
}
DOMhelp.addEvent(window,'load',sn.init,false);
