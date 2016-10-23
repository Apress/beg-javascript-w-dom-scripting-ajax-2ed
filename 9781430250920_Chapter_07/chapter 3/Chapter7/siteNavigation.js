sn={
	dynamicClass:'dyn',
	showClass:'show',
	parentClass:'parent',
	openClass:'open',
	navID:'nav',
	init:function(){
		var triggerLink;
		if(!document.getElementById || !document.createTextNode){return;}
		var nav=document.getElementById(sn.navID);
		if(!nav){return;}
		DOMhelp.cssjs('add',nav,sn.dynamicClass);		
		var nested=nav.getElementsByTagName('ul');
		for(var i=0;i<nested.length;i++){
			triggerLink=nested[i].parentNode.getElementsByTagName('a')[0];
			DOMhelp.cssjs('add',triggerLink.parentNode,sn.parentClass);		
			DOMhelp.addEvent(triggerLink,'click',sn.changeSection,false);
			triggerLink.onclick=DOMhelp.safariClickFix;
			if(nested[i].parentNode.getElementsByTagName('strong').length>0){
				DOMhelp.cssjs('add',triggerLink.parentNode,sn.openClass);		
				DOMhelp.cssjs('add',nested[i],sn.showClass);		
			}
		}
	},
	changeSection:function(e){
		var t=DOMhelp.getTarget(e);
		var firstList=t.parentNode.getElementsByTagName('ul')[0];
		if(DOMhelp.cssjs('check',firstList,sn.showClass)){
			DOMhelp.cssjs('remove',firstList,sn.showClass)
			DOMhelp.cssjs('swap',t.parentNode,sn.openClass,sn.parentClass);
		} else {
			DOMhelp.cssjs('add',firstList,sn.showClass)
			DOMhelp.cssjs('swap',t.parentNode,sn.openClass,sn.parentClass);
		}
		DOMhelp.cancelClick(e);
	}
}
DOMhelp.addEvent(window,'load',sn.init,false);
