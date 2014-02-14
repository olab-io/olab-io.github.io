$( document ).ready(function() {
    console.log("hellooo");
  // Handler for .ready() called.
    $.getJSON('http://talk.olab.io/category/events.json', function(data) {
        var upcomingEventsArray = new Array();
        var pastEventsArray = new Array();

        $.each(data.topic_list.topics, function(i, item) {

            if (item.slug != "open-lab-events")
            {
                var title = item.title;

                if (title.charAt(0) == '[')
                {
                    var date = moment(title.substring(1, title.indexOf(']',2)));
                    var title = title.substring(title.indexOf(']',2)+2);
                    var link = "http://talk.olab.io/t/" + item.slug;

                    var image = item.image_url != null ? "http://talk.olab.io/" + item.image_url : null;

                    if (date.isValid())
                    {
                        var event = new Object();
                        event.title = title;
                        event.link = link;
                        event.date = date;
                        event.date_string = date.format("MMMM Do YYYY");
                        event.image = image;

                        if (date.isAfter())
                        {
                            upcomingEventsArray.push(event);
                        }
                        else
                        {
                            pastEventsArray.push(event);
                        }
                    }
                }
                else
                {
                    console.log("No date:");
                    console.log(item);
                    // no formatted date
                }
            }

        });

        // sort asc            
        upcomingEventsArray.sort(function(a,b) {
            return a.date - b.date;
        });

        // sort desc
        pastEventsArray.sort(function(a,b) {
            return b.date - a.date;
        });

        var upcomingEvents = { events: upcomingEventsArray };
        var pastEvents = { events: pastEventsArray };

        var eventsTemplate = $('#events_template').html();

        $("#upcoming-events").html(Mustache.to_html(eventsTemplate, upcomingEvents));
        $("#past-events").html(Mustache.to_html(eventsTemplate, pastEvents));


    });
});