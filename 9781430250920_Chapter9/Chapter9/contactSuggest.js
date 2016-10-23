cs={
  init:function(){
    if(!document.getElementById || !document.createTextNode){return;}
  cs.f=document.getElementById('contact');
  if(!cs.f){return;}
  cs.output=document.createElement('span');
  cs.f.parentNode.insertBefore(cs.output,cs.f.nextSibling)
  DOMhelp.addEvent(cs.f,'keyup',cs.check,false);  
  },
  check:function(e){
    if(window.event){
      var key = window.event.keyCode;
    } else if(e){
      var key=e.keyCode;
    }
  if(key==8){return;}
  if(key==40){
	if(cs.output.innerHTML==''){return;}
    cs.f.value=cs.output.innerHTML.replace(/\s\(.*\)$/,'');
    cs.output.innerHTML='';
    return;
  }
    cs.doxhr('contacts.xml');
  },
  doxhr:function(url){
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
      if(request.readyState == 4){
        if (request.status && /200|304/.test(request.status))
        {
          cs.retrieved(request);
        } else{
          cs.failed(request);
        }
      }
    }
    request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00 GMT');
    request.send(null);
    return false;
  },
  retrieved:function(requester){
    var v;
  var pattern=new RegExp('^'+cs.f.value,'i');
  var data=requester.responseXML;
  var names=data.getElementsByTagName('name');
  for(var i=0;i<names.length;i++){
    v=names[i].firstChild.nodeValue;
    if(pattern.test(v)){
      cs.output.innerHTML=v+' (cursor down to copy)';
      break;
    }
  }
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
    return true;
  }
}
DOMhelp.addEvent(window,'load',cs.init,false);  

