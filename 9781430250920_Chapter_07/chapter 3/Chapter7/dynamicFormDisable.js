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
		df.newsOpt=df.newsOpt.getElementsByTagName('input');
		for(var i=0;i<df.newsOpt.length;i++){
			df.newsOpt[i].disabled=1;
		}		
		df.subjectOpt=DOMhelp.closestSibling(df.subject.parentNode,1);
		df.subjectOpt=df.subjectOpt.getElementsByTagName('input')[0];
		df.subjectOpt.disabled=1;
		DOMhelp.addEvent(df.news,'click',df.letterChange,false);
		DOMhelp.addEvent(df.subject,'change',df.subjectChange,false);
	},
	letterChange:function(e){
		var i;
		var t=DOMhelp.getTarget(e);
		var disable=t.checked?null:1;
		for(i=0;i<df.newsOpt.length;i++){
			df.newsOpt[i].disabled=disable;
		}		
	},
	subjectChange:function(e){
		var t=DOMhelp.getTarget(e);
		if(t.selectedIndex==5){
			df.subjectOpt.disabled=null;
			df.subjectOpt.focus();
		} else {
			df.subjectOpt.disabled=1;
		}
	}
}
DOMhelp.addEvent(window,'load',df.init,false);