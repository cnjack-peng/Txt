 $(document).ready(function(){

   var options = {
     editor: document.getElementById('mdcontent'), // {DOM Element} [required]
     class: 'txt', // {String} class of the editor,
     debug: true, // {Boolean} false by default
     textarea: '<textarea name="content"></textarea>', // fallback for old browsers
     linksInNewWindow: true  // open hyperlinks in a new windows/tab
  }
  var editor = new Txt(options);

});
