badge={
  badgeClass:'badge',
  containerID:'badgecontainer',
  init:function(){
    var newUL,parent;
    if(!document.getElementById || !document.createTextNode){return;}
    var links=document.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
      parent=links[i].parentNode;
      if(!DOMhelp.cssjs('check',parent,badge.badgeClass)){
        continue;
      }
      newUL=document.createElement('ul');
      newUL.className=badge.badgeClass;
      var dir=links[i].getAttribute('href');
      var loc=window.location.toString().match(/(^.*\/)/g);
      dir=dir.replace(loc,'');
      badge.doxhr('badge.php?cd='+dir,newUL);
      parent.parentNode.insertBefore(newUL,parent);
      parent.parentNode.removeChild(parent);
      i--;
    }
    badge.container=document.createElement('div');
    badge.container.id=badge.containerID;  
    document.body.appendChild(badge.container);  
  },
  assignHandlers:function(o){
    var links=o.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
      links[i].parent=o;
      if(/badgeprev|badgenext/.test(links[i].parentNode.className)){
        DOMhelp.addEvent(links[i],'click',badge.load,false);
        links[i].onclick=function(){return false;}
      } else {
        DOMhelp.addEvent(links[i],'click',badge.show,false);
        links[i].onclick=function(){return false;}
      }
    }
  },
  load:function(e){
    var t=DOMhelp.getTarget(e);
    if(t.nodeName.toLowerCase()!='a'){
      t=t.parentNode;
    }
    var dir=t.getAttribute('href');
    var loc=window.location.toString().match(/(^.*\/)/g);
    dir=dir.replace(loc,'');
    badge.doxhr('badge.php?cd='+dir,t.parent);
    DOMhelp.cancelClick(e);
  },
  show:function(e){
    var t=DOMhelp.getTarget(e);
    if(t.nodeName.toLowerCase()!='a'){
      t=t.parentNode;
    }
    var y=0;
    if(self.pageYOffset){
      y=self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop){
      y=document.documentElement.scrollTop;
      
    } else if(document.body){
      y=document.body.scrollTop;
    }  
    var source=t.getAttribute('href');
    badge.container.style.top=y+'px';  
    badge.container.style.left=0+'px';  
    
    var newImg=document.createElement('img');
    badge.deletePic();
    newImg.setAttribute('src',source);
    badge.container.appendChild(newImg);        
    DOMhelp.cancelClick(e);
    DOMhelp.addEvent(badge.container,'click',badge.deletePic,false);
  },
  deletePic:function(){
    badge.container.innerHTML='';
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
    }
    if(request.readyState == 4){
        if (request.status && /200|304/.test(request.status))
        {
          badge.retrieved(request,container);
        } else{
          badge.failed(request);
        }
      }
    }
    request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00 GMT');
    request.send(null);
    return false;
  },
  retrieved:function(request,container){
  var data=request.responseText;
  container.innerHTML=data;
  badge.assignHandlers(container);
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
    return true;
  }
}
DOMhelp.addEvent(window,'load',badge.init,false);
