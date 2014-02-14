$( document ).ready(function() {
    console.log("hellooo");
  // Handler for .ready() called.
    $.getJSON('http://talk.olab.io/category/events.json', function(data) {

        console.log(data);

//        var template = $('#events-template').html();
//        var info = Mustache.to_html(template, data);
//        $('#talktitles').html(info);
    });

});