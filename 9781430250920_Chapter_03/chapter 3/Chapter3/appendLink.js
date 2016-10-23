function appendLink(sourceLink,elementId){
  var element=false;
  if (elementId==null || !document.getElementById(elementId)) { 
    element=document.body;
  }
  if(!element) { 
    element=document.getElementById(elementId); 
  }
  element.appendChild(sourceLink);
}