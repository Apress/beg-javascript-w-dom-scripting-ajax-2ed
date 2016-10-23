dynSelect={
  AJAXlabel:'Only reload the results, not the whole page',
  AJAXofferClass:'ajax',
  containerID:'formOutput',
  backlinkID:'back',
  init:function(){
    if(!document.getElementById || !document.createTextNode){return;}
    var f=document.getElementsByTagName('form')[0];
    dynSelect.selectButton=document.getElementById('select');
    var p=document.createElement('p');
    p.className=dynSelect.AJAXofferClass;
    dynSelect.cb=document.createElement('input');
    dynSelect.cb.setAttribute('type','checkbox');
    dynSelect.cb.setAttribute('name','xhr');
    dynSelect.cb.setAttribute('id','xhr');
    if(window.location.search!=''){
      dynSelect.cb.setAttribute('defaultChecked','checked');  
      dynSelect.cb.setAttribute('checked','checked');  
    }
    p.appendChild(dynSelect.cb);
    var lbl=document.createElement('label');
    lbl.htmlFor='xhr';
    lbl.appendChild(document.createTextNode(dynSelect.AJAXlabel));
    p.appendChild(lbl);
    f.insertBefore(p,f.firstChild);
    dynSelect.addEvent(f,'submit',dynSelect.doxhr,false);
  },
  doxhr:function(e){
    if(!dynSelect.cb.checked){return;}
    dynSelect.outputContainer=document.getElementById(dynSelect.containerID);
    if(!dynSelect.outputContainer){return;}
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
        dynSelect.selectButton.value='loading...';
      }
      if(request.readyState == 4){
        if (request.status && /200|304/.test(request.status))
        {
          dynSelect.retrieved(request);
        } else{
          dynSelect.failed(request);
        }
      }
    }
    var airportValue,destinationValue;
    var airport=document.getElementById('airport');
    if(airport!=undefined){
      if(airport.nodeName.toLowerCase()=='select'){
        airportValue=airport.options[airport.selectedIndex].value;
      } else{
        airportValue=airport.value;
      }
    }
    var destination=document.getElementById('destination');
    if(destination){
      destinationValue=destination.options[destination.selectedIndex].value;
    }
    var parameters='airport='+airportValue
    if(destinationValue!=undefined){
      parameters+='&destination='+destinationValue;
    }
    request.open("POST", "selectBoxes.php");
    request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00 GMT');
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", parameters.length);
    request.setRequestHeader("Connection", "close");
    request.send(encodeURI(parameters));
    if(airport && destination){
      var sendButton=document.getElementById('select');
      sendButton.parentNode.removeChild(sendButton);
    }
    dynSelect.cancelClick(e);
  },
  retrieved:function(requester,e){
    dynSelect.selectButton.value='Select';
    var content=requester.responseText;
    dynSelect.outputContainer.innerHTML=content;
    var backlink=document.getElementById(dynSelect.backlinkID);
    if(backlink){
      var url=backlink.getAttribute('href');
      backlink.setAttribute('href',url+'?ajax');
    }
    dynSelect.cancelClick(e);
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
    return true;
  },
  cancelClick:function(e){
    if (window.event){
      window.event.cancelBubble = true;
      window.event.returnValue = false;
    }
    if (e && e.stopPropagation && e.preventDefault){
      e.stopPropagation();
      e.preventDefault();
    }
  },
  addEvent: function(elm, evType, fn, useCapture){
    if (elm.addEventListener){
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } else if (elm.attachEvent) {
      var r = elm.attachEvent('on' + evType, fn);
      return r;
    } else {
      elm['on' + evType] = fn;
    }
  }  
}
dynSelect.addEvent(window,'load',dynSelect.init,false);