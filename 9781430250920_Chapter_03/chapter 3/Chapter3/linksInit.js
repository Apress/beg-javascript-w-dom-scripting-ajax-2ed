function linksInit(){
  if (!document.getElementById || !document.createTextNode) { return; }
  var openLink=createLink('#','open');
  appendLink(openLink);
  var closeLink=createLink('closed.html','close');
  appendLink(closeLink,'main');
}
