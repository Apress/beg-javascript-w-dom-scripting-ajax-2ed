readrss={
  timeOutDuration:10,
  toolong:false,
    doxhr:function(container,url){
  	readrss.timedout=false;
    if(!document.getElementById || !document.createTextNode){return;}
    readrss.outputContainer=document.getElementById(container);
    if(!readrss.outputContainer){return;}
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
    request.onreadystatechange=function(){
      if(request.readyState==1){
      readrss.toolong=window.setTimeout(
        function(){
          if(request.readyState==1){
            readrss.timedout=true;
            request.abort();
            readrss.outputContainer.innerHTML='The request took too long';
          }
        },
        readrss.timeOutDuration
      );
      readrss.outputContainer.innerHTML='loading...';
      }
      if(request.readyState==4 && !readrss.timedout){
      window.clearTimeout(readrss.toolong);
      if (/200|304/.test(request.status)){        
          readrss.retrieved(request);
        } else{
          readrss.failed(request);
        }
      }
    }
    request.open('get','loadrss.php?url='+encodeURI(url));
    request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00 GMT');
    request.send(null);
    return false;
  },
  retrieved:function(requester){
    readrss.outputContainer.innerHTML='';
    var data=requester.responseXML;
    if(data.getElementsByTagName('error').length>0){
      var error=data.getElementsByTagName('error')[0].firstChild.nodeValue;
      readrss.outputContainer.innerHTML='<p>'+error+'</p>'
    } else {
      var items=data.getElementsByTagName('item');
      var end=items.length;
      var item,feedlink,name,description,content='';
      if(end<1){return;}
      for(var i=0;i<5;i++){
        feedlink=items[i].getElementsByTagName('link').item(0).firstChild.nodeValue;
        name=items[i].getElementsByTagName('title').item(0).firstChild.nodeValue;
        item='<li><a href="'+feedlink+'">'+name+'</a></li>'
        content+=item;
      }  
      readrss.outputContainer.innerHTML='<ul>'+content+'</ul>';
      return false;
    }
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
    return true;
  }
}
