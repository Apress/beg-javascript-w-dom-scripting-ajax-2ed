df={
	hideClass:'hide',
	letterOption:'newsletter',
	subjectOption:'subject',
	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		df.news=document.getElementById(df.letterOption);
		df.subject=document.getElementById(df.subjectOption);
		if(!df.subject || !df.news){return;}
		
		df.newsOpt=DOMhelp.closestSibling(df.news.parentNode,1);
		df.subjectOpt=DOMhelp.closestSibling(df.subject.parentNode,1);
		DOMhelp.cssjs('add',df.newsOpt,df.hideClass);
		DOMhelp.cssjs('add',df.subjectOpt,df.hideClass);
		DOMhelp.addEvent(df.news,'click',df.letterChange,false);
		DOMhelp.addEvent(df.subject,'change',df.subjectChange,false);
	},
	letterChange:function(e){
		var t=DOMhelp.getTarget(e);
		var action=t.checked?'remove':'add';
		DOMhelp.cssjs(action,df.newsOpt,df.hideClass);
	},
	subjectChange:function(e){
		var t=DOMhelp.getTarget(e);
		var action=t.selectedIndex==5?'remove':'add';
		DOMhelp.cssjs(action,df.subjectOpt,df.hideClass);
		if(action=='remove'){
			df.subjectOpt.getElementsByTagName('input')[0].focus();
		}
	}
}
DOMhelp.addEvent(window,'load',df.init,false);