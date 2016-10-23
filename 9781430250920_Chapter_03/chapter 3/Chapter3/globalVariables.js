<script type="text/javascript">
var demoVar=1 // global variable 
alert('Before withVar demoVar is' +demoVar);
function withVar(){
  var demoVar=3;
}
withVar();
alert('After withVar demoVar is' +demoVar);
function withoutVar(){
  demoVar=3;
}
withoutVar();
alert('After withoutVar demoVar is' +demoVar);
</script>
