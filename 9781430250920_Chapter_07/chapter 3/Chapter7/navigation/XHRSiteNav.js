xhrsitenav={
	navID:'nav',
	trigger:null,
	triggerID:'AJAXtrigger',
	triggerLabel:'Switch to advanced navigation',
	downLabel:'Switch to basic navigation',
	output:'content',
	loadingMessage: '<img src="../indicator_big.gif" alt="loading..." />',
	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		xhrsitenav.nav=document.getElementById(sn.navID);
		if(!xhrsitenav.nav){return;}
		xhrsitenav.outputContainer=document.getElementById(xhrsitenav.output);
		if(!xhrsitenav.outputContainer){return;}

		xhrsitenav.createTrigger();

		if(window.location.search.indexOf('ajax')==-1){return;}

		var navlinks=xhrsitenav.nav.getElementsByTagName('a');
		for(var i=0;i<navlinks.length-1;i++){
			if(navlinks[i].href=='#'){continue;}
			DOMhelp.addEvent(navlinks[i],'click',xhrsitenav.xhr,false);
			navlinks[i].onclick=DOMhelp.safariClickFix;
		}

		var triggerlink=xhrsitenav.trigger.getElementsByTagName('a')[0];
		triggerlink.href=triggerlink.href.replace(/\?.*/,'');
		triggerlink.innerHTML=xhrsitenav.downLabel;
	},
	shorturl:function(url){
		return url.replace(/.*\//g,'');
	},
	createTrigger:function(){
		if(!xhrsitenav.trigger){
			xhrsitenav.trigger=document.createElement('li');
			xhrsitenav.trigger.id=xhrsitenav.triggerID;
			var loc=xhrsitenav.shorturl(window.location.href);
			var newlink=DOMhelp.createLink(loc+'?ajax=1',xhrsitenav.triggerLabel);
			xhrsitenav.trigger.appendChild(newlink);
			xhrsitenav.nav.appendChild(xhrsitenav.trigger);
		}	
	},
	xhr:function(e){
		var t=DOMhelp.getTarget(e);
		while(t.nodeName.toLowerCase()!='a'){
			t=t.parentNode;
		}
		var parentLI=t.parentNode;
		if(t.parentNode.getElementsByTagName('ul').length>0){
			var firstList=t.parentNode.getElementsByTagName('ul')[0];
			DOMhelp.cssjs('add',firstList,sn.showClass)
			DOMhelp.cssjs('swap',parentLI,sn.openClass,sn.parentClass);
			parentLI.getElementsByTagName('a')[0].innerHTML=sn.openIndicator;
		}
		var url=xhrsitenav.removeOldHighlight(t);
		var request;
		try{
			request = new XMLHttpRequest();
		}catch(error){
			try{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(error){
				return true;
			}
		}
		request.open('get',url,true);
		request.onreadystatechange=function(){
			if(request.readyState == 1){
				xhrsitenav.outputContainer.innerHTML=xhrsitenav.loadingMessage;
			}
			if(request.readyState == 4){
				if (request.status && /200|304/.test(request.status))
				{
					xhrsitenav.retrieved(request);
				} else{
					xhrsitenav.failed(request);
				}
			}
		}
		request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00 GMT');
		request.send(null);
		DOMhelp.cancelClick(e);	
		return false;
	},
	retrieved:function(requester,e){
		var data=requester.responseText;
		xhrsitenav.outputContainer.innerHTML=data;
		DOMhelp.cancelClick(e);	
		return false;
	},
	failed:function(requester){
		alert('The XMLHttpRequest failed. Status: '+requester.status);
		return true;
	},	
	removeOldHighlight:function(o){
		var highlight=xhrsitenav.nav.getElementsByTagName('strong')[0];
		var current=highlight.className+'.php';
		var newlink=document.createElement('a');
		newlink.appendChild(document.createTextNode(highlight.innerHTML));
		newlink.setAttribute('href',current);
		DOMhelp.addEvent(newlink,'click',xhrsitenav.xhr,false);
		newlink.onclick=DOMhelp.safariClickFix;
		highlight.parentNode.replaceChild(newlink,highlight);
		var shorturl=xhrsitenav.shorturl(o.getAttribute('href'));
		var url='content/'+shorturl;
		var st=document.createElement('strong');
		st.className=shorturl.replace('.php','');
		st.innerHTML=o.innerHTML;
		o.parentNode.replaceChild(st,o);
		return url;
	}
}
DOMhelp.addEvent(window,'load',xhrsitenav.init,false);

