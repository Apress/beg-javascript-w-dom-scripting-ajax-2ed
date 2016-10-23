/*
  addPopUpLink 
  opens the linked document of all links with a certain 
  class in a popup window and adds a message to the 
  link text that there will be a new window
*/
function addPopUpLink(){
  if(!document.getElementById || !document.createTextNode){return;}

  // assets of the link - the class to find out which link should 
  // get the functionality and the message to add to the link text
  var popupClass='smallpopup';
  var popupMessage=document.createTextNode(' (opens in new window)');

  var pop,t;
  var as=document.getElementsByTagName('a');
  for(var i=0;i<as.length;i++){
    t=as[i].className;
    if(t && t.toString().indexOf(popupClass)!=-1){
      as[i].appendChild(popupMessage);
      as[i].onclick=function(){
        pop=window.open(this.href,'popup','width=400,height=400');
        return false;
      }
    }
  }
}
window.onload=addPopUpLink;
