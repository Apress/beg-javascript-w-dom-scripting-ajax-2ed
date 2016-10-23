simplexhr={
  doxhr:function(container,url){
  	if(!document.getElementById || !document.createTextNode){return;}
    simplexhr.outputContainer=document.getElementById(container);
    if(!simplexhr.outputContainer){return;}
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
        simplexhr.outputContainer.innerHTML='loading...';
      }
      if(request.readyState == 4){
        if (request.status && /200|304/.test(request.status))
        {
          simplexhr.retrieved(request);
        } else{
          simplexhr.failed(request);
        }
      }
    }
    request.setRequestHeader('If-Modified-Since','Mon, 21 Jan 2013 00:00:00 GMT');
    request.send(null);
    return false;
  },
  retrieved:function(requester){
    var data=requester.responseText;
	data=data.replace(/\n/g,'<br />');
    simplexhr.outputContainer.innerHTML=data;
	return false;
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
  	return true;
  }
}
