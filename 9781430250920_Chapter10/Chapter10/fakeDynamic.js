fakegal={

	// IDs
	thumbsListID:'thumbs',
	largeContainerID:'photo',
	// CSS classes
	closeClass:'close',
	nextClass:'next',
	prevClass:'prev',
	hideClass:'hide',
	closeLabel:'close',
	// labels
	showClass:'show',
	prevContent:'<img src="last.gif" alt="previous photo" />',
	nextContent:'<img src="next.gif" alt="next photo" />',

	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		fakegal.tlist=document.getElementById(fakegal.thumbsListID);
		if(!fakegal.tlist){return;}
		var thumbsLinks=fakegal.tlist.getElementsByTagName('a');
		fakegal.all=thumbsLinks.length;
		for(var i=0;i<thumbsLinks.length;i++){
			DOMhelp.addEvent(thumbsLinks[i],'click',fakegal.showPic,false);
			thumbsLinks[i].onclick=DOMhelp.safariClickFix;
			thumbsLinks[i].i=i;
		}
		fakegal.createContainer();
	},
	showPic:function(e){
		var t=DOMhelp.getTarget(e);	
		if(t.nodeName.toLowerCase()!='a'){
			t=t.parentNode;
		}
		fakegal.current=t.i;
		var largePic=t.getAttribute('href');
		fakegal.setPic(largePic);
		DOMhelp.cancelClick(e);
	},
	setPic:function(pic){
		var a;
		var picLink=fakegal.c.getElementsByTagName('a')[1];
		picLink.innerHTML='';
		if(typeof pic=='string'){
			fakegal.c.className=fakegal.showClass;
			var i=document.createElement('img');
			i.setAttribute('src',pic);
			picLink.appendChild(i);
		} else {
			fakegal.c.className='';
		}
		a=fakegal.current==0?'add':'remove';
		DOMhelp.cssjs(a,fakegal.prev,fakegal.hideClass);
		a=fakegal.current==fakegal.all-1?'add':'remove'
		DOMhelp.cssjs(a,fakegal.next,fakegal.hideClass);
	},
	navPic:function(e){
		var t=DOMhelp.getTarget(e);	
		if(t.nodeName.toLowerCase()!='a'){
			t=t.parentNode;
		}
		var c=fakegal.current;
		if(t==fakegal.prev){
			c-=1;
		} else {
			c+=1;
		}
		fakegal.current=c;
		var pic=fakegal.tlist.getElementsByTagName('a')[c];
		fakegal.setPic(pic.getAttribute('href'));
		DOMhelp.cancelClick(e);
	},
	createContainer:function(){
		fakegal.c=document.createElement('div');
		fakegal.c.id=fakegal.largeContainerID;

		var p=document.createElement('p');
		var cl=DOMhelp.createLink('#',fakegal.closeLabel);
		cl.className=fakegal.closeClass;
		p.appendChild(cl);
		DOMhelp.addEvent(cl,'click',fakegal.setPic,false);
		cl.onclick=DOMhelp.safariClickFix;
		fakegal.c.appendChild(p);

		var il=DOMhelp.createLink('#','');
		DOMhelp.addEvent(il,'click',fakegal.setPic,false);
		il.onclick=DOMhelp.safariClickFix;
		fakegal.c.appendChild(il);

		fakegal.next=DOMhelp.createLink('#','');
		fakegal.next.innerHTML=fakegal.nextContent;
		fakegal.next.className=fakegal.nextClass;
		DOMhelp.addEvent(fakegal.next,'click',fakegal.navPic,false);
		fakegal.next.onclick=DOMhelp.safariClickFix;
		fakegal.c.appendChild(fakegal.next);

		fakegal.prev=DOMhelp.createLink('#','');
		fakegal.prev.innerHTML=fakegal.prevContent;
		fakegal.prev.className=fakegal.prevClass;
		DOMhelp.addEvent(fakegal.prev,'click',fakegal.navPic,false);
		fakegal.prev.onclick=DOMhelp.safariClickFix;
		fakegal.c.appendChild(fakegal.prev);

		fakegal.tlist.parentNode.appendChild(fakegal.c);
	}
}
DOMhelp.addEvent(window,'load',fakegal.init,false);