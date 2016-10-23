/*
  addPopUpLink 
  opens the linked document of all links with a certain 
  class in a popup window and adds a message to the 
  link text that there will be a new window
*/
function addPopUpLink(){
  // check for DOM and leave if it is not supported
  if(!document.getElementById || !document.createTextNode){return;}
  // assets of the link - the class to find out which link should 
  // get the functionality and the message to add to the link text
  var popupClass='smallpopup';
  var popupMessage= ' (opens in new window)';
  // temporary variables to use in a loop
  var pop,t;
  // get all links in the document
  var as=document.getElementsByTagName('a');
  // loop over all link
  for(var i=0;i<as.length;i++){
    t=as[i].className;
    // check if the link has a class and the class is the right one
    if(t && t.toString().indexOf(popupClass)!=-1){
      // add the message
      as[i].appendChild(document.createTextNode(popupMessage));
      // assign a function when the user clicks the link
      as[i].onclick=function(){
        // open a new window with
        pop=window.open(this.href,'popup','width=400,height=400');
        // don't follow the link (otherwise the linked document 
        // would be opened in the popup and the document).
        return false;
      }
    }
  }
}
window.onload=addPopUpLink;
