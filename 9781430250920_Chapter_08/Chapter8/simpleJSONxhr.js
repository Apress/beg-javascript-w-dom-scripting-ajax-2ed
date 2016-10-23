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
    request.open('get',url,true);
    request.setRequestHeader('If-Modified-Since','Mon, 21 Jan 2013 00:00:00 GMT');
    request.send(null);
    return false;
  },
  retrieved:function(requester){
    simplexhr.outputContainer.removeChild(simplexhr.outputContainer.firstChild);
    var content='<table><thead>';
	content+='<tr><th>ID</th><th>Artist</th>';
	content+='<th>Title</th><th>Comment</th>';
	content+='</tr></thead><tbody>';
 	var data = eval('('+requester.responseText+')');
	var albums=data.album;
	for(var i=0;i<albums.length;i++){
		content+='<tr><td>'+albums[i]['id']+'</td>';
		content+='<td>'+albums[i].artist+'</td>';
		content+='<td>'+albums[i].title+'</td>';
		content+='<td>'+albums[i].comment+'</td></tr>';
	}
	content+='</tbody></table>';
    simplexhr.outputContainer.innerHTML=content;
    return false;
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
    return true;
  }
}