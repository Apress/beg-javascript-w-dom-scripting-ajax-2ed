function addPopUpLink(){
    if(!document.getElementById || !document.createTextNode){return;}
    var popupClass='smallpopup';
    var popupMessage= ' (opens in new window)';
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
