pn={
  // CSS classes
  paginationClass:'paginated',
  dynamicClass:'dynamic',
  showClass:'show',
  paginationNavClass:'paginatedNav',

  // pagination counter properties
  // number of elements shown on one page
  increase:5,
  // counter: _x_ will become the current start position
  //          _y_ the current end position and 
  //          _z_ the number of all data rpws
  counter:'&#160;_x_&#160;to&#160;_y_&#160;of&#160;_z_&#160;',
  // previous and next links, only text is allowed
  nextLabel:'next',
  previousLabel:'previous',

  init:function(){
    var tablebody;
    if(!document.getElementById || !document.createTextNode){return;}
    var ts=document.getElementsByTagName('table');
    for(var i=0;i<ts.length;i++){
      if(!DOMhelp.cssjs('check',ts[i],pn.paginationClass)){continue;}
      if(ts[i].getElementsByTagName('tr').length<pn.increase+1){continue;}
	  tablebody=ts[i].getElementsByTagName('tbody')[0];
      ts[i].datarows=tablebody.getElementsByTagName('tr');
      ts[i].datarowsize=ts[i].datarows.length;
      ts[i].current=null;
      DOMhelp.cssjs('add',ts[i],pn.dynamicClass);
      pn.createPaginationNav(ts[i]);
      pn.showSection(ts[i],0);
    }
  },
  createPaginationNav:function(table){
    var navBefore,navAfter;
    navBefore=document.createElement('p');
	DOMhelp.cssjs('add',navBefore,pn.paginationNavClass);
    navBefore.appendChild(DOMhelp.createLink('#',pn.previousLabel));
    navBefore.appendChild(document.createElement('span'));
    counter=pn.counter.replace('_x_',1);
    counter=counter.replace('_y_',pn.increase);
    counter=counter.replace('_z_',table.datarowsize-1);
    navBefore.getElementsByTagName('span')[0].innerHTML=counter;
    navBefore.appendChild(DOMhelp.createLink('#',pn.nextLabel));
    table.parentNode.insertBefore(navBefore,table);
    navAfter=navBefore.cloneNode(true);
    table.parentNode.insertBefore(navAfter,table.nextSibling);
    table.topPrev=navBefore.getElementsByTagName('a')[0];
    table.topNext=navBefore.getElementsByTagName('a')[1];
    table.bottomPrev=navAfter.getElementsByTagName('a')[0];
    table.bottomNext=navAfter.getElementsByTagName('a')[1];
    DOMhelp.addEvent(table.topPrev,'click',pn.navigate,false);  
    DOMhelp.addEvent(table.bottomPrev,'click',pn.navigate,false);  
    DOMhelp.addEvent(table.topNext,'click',pn.navigate,false);  
    DOMhelp.addEvent(table.bottomNext,'click',pn.navigate,false);  
    table.bottomNext.onclick=DOMhelp.safariClickFix;
    table.topPrev.onclick=DOMhelp.safariClickFix;
    table.bottomPrev.onclick=DOMhelp.safariClickFix;
    table.topNext.onclick=DOMhelp.safariClickFix;
	table.topCounter=navBefore.getElementsByTagName('span')[0];
	table.bottomCounter=navAfter.getElementsByTagName('span')[0];
  },
  navigate:function(e){
    var start,table;
    var t=DOMhelp.getTarget(e);
    while(t.nodeName.toLowerCase()!='a'){
      t=t.parentNode;
    }
    if(t.getAttribute('href')==null || t.getAttribute('href')==''){return;}
    if(t.parentNode.previousSibling && 
       t.parentNode.previousSibling.nodeName.toLowerCase()=='table'){
      table=t.parentNode.previousSibling;
    } else {
      table=t.parentNode.nextSibling;
    }
    if(t==table.topNext || t==table.bottomNext){
      start=table.current+pn.increase;
    } else if(t==table.topPrev|| t==table.bottomPrev){
      start=table.current-pn.increase;
    }
    pn.showSection(table,start);
  },
  showSection:function(table,start){
    var i;
    pn.changePaginationNav(table,start);
    if(table.current != null){
      for(i=table.current;i<table.current+pn.increase;i++){
        if(table.datarows[i]){
          DOMhelp.cssjs('remove',table.datarows[i],pn.showClass);
        }
      }
    }
    for(i=start;i<start+pn.increase;i++){
      if(table.datarows[i]){
	      DOMhelp.cssjs('add',table.datarows[i],pn.showClass);
      }
    }
    table.current=start;
  },
  changePaginationNav:function(table,start){
    if(start-pn.increase<0){
      table.bottomPrev.removeAttribute('href');
      table.topPrev.removeAttribute('href');
    } else{
      table.bottomPrev.setAttribute('href','#');
      table.topPrev.setAttribute('href','#');
    }
    if(start+pn.increase>table.datarowsize-2){
      table.bottomNext.removeAttribute('href');
      table.topNext.removeAttribute('href');
    }else{
      table.bottomNext.setAttribute('href','#');
      table.topNext.setAttribute('href','#');
    }
    var counter=pn.counter.replace('_x_',start+1)
    var last=start+pn.increase;
    if(last>table.datarowsize){last=table.datarowsize;}
    counter=counter.replace('_y_',last)
    counter=counter.replace('_z_',table.datarowsize)
    table.topCounter.innerHTML=counter;
    table.bottomCounter.innerHTML=counter;
  }
}
DOMhelp.addEvent(window,'load',pn.init,false);
