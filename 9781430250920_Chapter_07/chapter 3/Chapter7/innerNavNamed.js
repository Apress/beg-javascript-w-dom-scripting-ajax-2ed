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
	sections:[],
	sectionLinks:[],
	init:function(){
		var targetName,targetElement;
		if(!document.getElementById || !document.createTextNode){return;}
		var parent=document.getElementById(iv.parentID);
		var toc=document.getElementById(iv.tocID);
		if(!parent || !toc){return;}
		DOMhelp.cssjs('add',parent,iv.dynamicClass);
		var toclinks=toc.getElementsByTagName('a');
		for(var i=0;i<toclinks.length;i++){
			DOMhelp.addEvent(toclinks[i],'click',iv.getSection,false);
			DOMhelp.addEvent(toclinks[i],'mouseover',iv.getSection,false);
			targetName=toclinks[i].getAttribute('href').replace(/.*#/,'');
			toclinks[i].targetName=targetName;
			if(i==0){var presetLink=targetName}
			targetElement=document.getElementById(targetName);
			if(targetElement){
				iv.sections[targetName]=targetElement.parentNode.parentNode;
				iv.sectionLinks[targetName]=toclinks[i];
			}
		}
		var loc=window.location.hash.replace('#','');
		loc=document.getElementById(loc)?loc:presetLink;
		iv.showSection(loc);
	},
	getSection:function(e){
		var t=DOMhelp.getTarget(e);		
		iv.showSection(t.targetName);
	},
	showSection:function(sectionName){
		if(iv.current!=null){
			DOMhelp.cssjs('remove',iv.sections[iv.current],iv.showClass);
			DOMhelp.cssjs('remove',iv.sectionLinks[iv.current],iv.currentLinkClass);
		}
		DOMhelp.cssjs('add',iv.sections[sectionName],iv.showClass);
		DOMhelp.cssjs('add',iv.sectionLinks[sectionName],iv.currentLinkClass);
		iv.current=sectionName;
	}
}
DOMhelp.addEvent(window,'load',iv.init,false);
