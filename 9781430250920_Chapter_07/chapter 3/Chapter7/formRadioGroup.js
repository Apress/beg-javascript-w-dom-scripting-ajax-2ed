function getChoice(){
  var f=document.forms[0];
  var choices=f.elements.character;
  for(var i=0;i<choices.length;i++){
    if(choices[i].checked){break;}
  }
  alert('Favourite Character is: '+choices[i].value);
}
function setChoice(n){
  var f=document.forms[0];
  f.character[n].checked=true;
}
