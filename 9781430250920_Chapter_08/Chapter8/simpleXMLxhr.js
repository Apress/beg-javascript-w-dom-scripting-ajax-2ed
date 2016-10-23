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
  	simplexhr.outputContainer.removeChild(simplexhr.outputContainer.firstChild);
    var i,albumId,artist,albumTitle,comment,td,tr,th;
	var data=requester.responseXML;
	var albums=data.getElementsByTagName('album');
	var table=document.createElement('table');
	var tablehead=document.createElement('thead');
	table.appendChild(tablehead);
	tr=document.createElement('tr');
	th=document.createElement('th');
	th.appendChild(document.createTextNode('ID'));
	tr.appendChild(th);
    th=document.createElement('th');
	th.appendChild(document.createTextNode('Artist'));
	tr.appendChild(th);
	th=document.createElement('th');
	th.appendChild(document.createTextNode('Title'));
	tr.appendChild(th);
	th=document.createElement('th');
	th.appendChild(document.createTextNode('Comment'));
	tr.appendChild(th);
	tablehead.appendChild(tr);
	var tablebody=document.createElement('tbody');
	table.appendChild(tablebody);
	var all=albums.length;
	for(i=0;i<all;i++){
		tr=document.createElement('tr');
		albumId=data.getElementsByTagName('id')[i].firstChild.nodeValue;
		artist=data.getElementsByTagName('artist')[i].firstChild.nodeValue;
		albumTitle=data.getElementsByTagName('title')[i].firstChild.nodeValue;
		comment=data.getElementsByTagName('comment')[i].firstChild.nodeValue;
		td=document.createElement('th');
		td.appendChild(document.createTextNode(albumId));
		tr.appendChild(td);		
		td=document.createElement('td');
		td.appendChild(document.createTextNode(artist));
		tr.appendChild(td);		
		td=document.createElement('td');
		td.appendChild(document.createTextNode(albumTitle));
		tr.appendChild(td);		
		td=document.createElement('td');
		td.appendChild(document.createTextNode(comment));
		tr.appendChild(td);		
		tablebody.appendChild(tr);
	}
    simplexhr.outputContainer.appendChild(table);
	return false;
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
  	return true;
  }
}
