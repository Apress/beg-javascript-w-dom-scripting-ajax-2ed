function createLink(linkTarget,linkName){
  if (linkTarget == null) { linkTarget = '#'; }
  if (linkName == null) { linkName = 'dummy'; }

  var tempLink=document.createElement('a');
  tempLink.setAttribute('href',linkTarget);
  tempLink.appendChild(document.createTextNode(linkName));

  return tempLink;
}
