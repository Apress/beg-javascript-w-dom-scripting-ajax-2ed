dyngal={
	contentID:'content',
	originalPHP:'examplePHPXHRgallery.php',
	dynamicPHP:'gallerytools.php',
	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		dyngal.assignHandlers(dyngal.contentID);
	},
	assignHandlers:function(o){
		if(!document.getElementById(o)){return;}
		o=document.getElementById(o);
		var gLinks=o.getElementsByTagName('a');
		for(var i=0;i<gLinks.length;i++){
			DOMhelp.addEvent(gLinks[i],'click',dyngal.load,false);
			gLinks[i].onclick=DOMhelp.safariClickFix;
		}
	},
	load:function(e){
		var t=DOMhelp.getTarget(e);
		if(t.nodeName.toLowerCase()!='a'){
			t=t.parentNode;
		}
		var h=t.getAttribute('href');
		h=h.replace(dyngal.originalPHP,dyngal.dynamicPHP);
		dyngal.doxhr(h,dyngal.contentID);
		DOMhelp.cancelClick(e);
	},
  doxhr:function(url,container){
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
		container.innerHTML='Loading...';
      }
	  if(request.readyState == 4){
        if (request.status && /200|304/.test(request.status))
        {
          dyngal.retrieved(request,container);
        } else{
          dyngal.failed(request);
        }
      }
    }
    request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00 GMT');
    request.send(null);
    return false;
  },
  retrieved:function(request,container){
	var data=request.responseText;
	document.getElementById(container).innerHTML=data;
	dyngal.assignHandlers(container);
  },
  failed:function(request){
    alert('The XMLHttpRequest failed. Status: '+request.status);
    return true;
  }
}
DOMhelp.addEvent(window,'load',dyngal.init,false);
