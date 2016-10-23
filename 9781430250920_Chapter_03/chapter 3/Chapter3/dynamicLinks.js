var dynamicLinks={
  linksInit:function(){
    if (!document.getElementById || !document.createTextNode) { return; }
    var openLink=dynamicLinks.createLink('#','open');
    dynamicLinks.appendLink(openLink);
    var closeLink=dynamicLinks.createLink('closed.html','close');
    dynamicLinks.appendLink(closeLink,'main');
  },
  createLink:function(linkTarget,linkName){
    if (linkTarget == null) { linkTarget = '#'; }
    if (linkName == null) { linkName = 'dummy'; }
    var tempLink=document.createElement('a');
    tempLink.setAttribute('href',linkTarget);
    tempLink.appendChild(document.createTextNode(linkName));
    return tempLink;
  },
  appendLink:function(sourceLink,elementId){
    var element=false;
    if (elementId==null || !document.getElementById(elementId)){element=document.body;}
    if(!element){element=document.getElementById(elementId)}
    element.appendChild(sourceLink);
  }
}  
window.onload=dynamicLinks.linksInit;

