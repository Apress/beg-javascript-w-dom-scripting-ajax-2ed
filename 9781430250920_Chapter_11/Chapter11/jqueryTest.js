$( document ) . ready ( 
  function() {
    $( 'pre' ).before( '<p><a class="trigger" href="#">Show code</a></p>' );
    $( 'pre' ).hide();
    $('a.trigger').toggle ( 
      function() {
        $(this).html('Hide Code');
        $(this.parentNode.nextSibling).slideDown('slow');
      },
      function() {
        $(this).html('Show Code');
        $(this.parentNode.nextSibling).slideUp('slow');
      }
    )
  }
)
