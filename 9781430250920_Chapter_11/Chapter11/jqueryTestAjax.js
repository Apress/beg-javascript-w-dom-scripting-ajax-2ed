$( document ).ready ( 
  function() {
    $('a.codeExample').each (
      function( i ) {
        $( this ).after( '<pre class="codeExample"><code></code></pre>' );
      }
    )
    $('pre.codeExample').hide();
    $('a.codeExample').toggle ( 
      function() {
		if( !this.old ){
		  this.old = $(this).html();
		}
        $(this).html('Hide Code');
        parseCode(this);
      },
      function() {
        $(this).html(this.old);
        $(this.nextSibling).hide();
      }
    )
    function parseCode(o){
      if(!o.nextSibling.hascode){
          $.get(o.href,
            function(code){
              code=code.replace(/</mg,'&#60;');
              code=code.replace(/>/mg,'&#62;');
              code=code.replace(/\"/mg,'&#34;');
              code=code.replace(/\r?\n/g,'<br>');
              code=code.replace(/<br><br>/g,'<br>');
              code=code.replace(/ /g,'&nbsp;');
              o.nextSibling.innerHTML='<code>'+code+'</code>';
              o.nextSibling.hascode=true;
            }
          );
      }
      $(o.nextSibling).show();
    }
  }
)
