iv={
	// css classes
	dynamicClass:'dyn',
	currentLinkClass:'current',
	showClass:'show',

	// IDs
	parentID:'toolinfo',
	tocID:'toolinfotoc',

	// global properties
	current:null,
	currentLink:null,

	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		iv.parent=document.getElementById(iv.parentID);
		iv.toc=document.getElementById(iv.tocID);
		if(!iv.parent || !iv.toc){return;}
		DOMhelp.cssjs('add',iv.parent,iv.dynamicClass);
		var loc=window.location.hash.replace('#','');
		var toclinks=iv.toc.getElementsByTagName('a');
		for(var i=0;i<toclinks.length;i++){
			if(toclinks[i].getAttribute('href').replace(/.*#/,'')==loc){
				iv.currentLink=toclinks[i];	
			}
			DOMhelp.addEvent(toclinks[i],'click',iv.getSection,false);
		}
		if(!iv.currentLink){
			iv.currentLink=toclinks[0];
		}
		iv.showSection(iv.currentLink);
	},
	getSection:function(e){
		var t=DOMhelp.getTarget(e);		
		iv.showSection(t);
	},
	showSection:function(o){
		var targetName=o.getAttribute('href').replace(/.*#/,'');
		var section=document.getElementById(targetName).parentNode.parentNode;
		if(iv.current!=null){
			DOMhelp.cssjs('remove',iv.current,iv.showClass);
			DOMhelp.cssjs('remove',iv.currentLink,iv.currentLinkClass);
		}
		DOMhelp.cssjs('add',section,iv.showClass);
		DOMhelp.cssjs('add',o,iv.currentLinkClass);
		iv.current=section;
		iv.currentLink=o;
	}
}
DOMhelp.addEvent(window,'load',iv.init,false);
