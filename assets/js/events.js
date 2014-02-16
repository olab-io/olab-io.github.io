$( document ).ready(function() {

    // grab the events json from talk.olab.io
    $.getJSON('https://talk.olab.io/category/events.json', function(data) {
        // make a few empty arrays
        var upcomingEventsArray = new Array();
        var pastEventsArray = new Array();

        // cycle through the topics list from talk
        $.each(data.topic_list.topics, function(i, item) {

            // ignore things that aren't category markers
            if (item.slug != "open-lab-events")
            {
                // try to extract a date from the title.
                var title = item.title;

                if (title.charAt(0) == '[')
                {
                    var date = moment(title.substring(1, title.indexOf(']',2)));
                    var title = title.substring(title.indexOf(']',2)+2);
                    var link = "http://talk.olab.io/t/" + item.slug;

                    var image = item.image_url != null ? "http://talk.olab.io/" + item.image_url : null;

                    if (date.isValid())
                    {
                        // here's an arbitrary collection of event data
                        var event = new Object();
                        event.title = title;
                        event.link = link;
                        event.date = date;
                        event.date_string = date.format("MMMM Do YYYY");
                        event.image = image; // this will be full for some posts

                        if (date.isAfter())
                        {
                            // add date to upcoming array
                            upcomingEventsArray.push(event);
                        }
                        else
                        {
                            // it's old, so add it to the old array
                            pastEventsArray.push(event);
                        }
                    }
                }
                else
                {
                    // date was not in the title or could not be extracted. skipping.
                }
            }

        });

        // sort the event arrays            
        upcomingEventsArray.sort(function(a,b) {
            return a.date - b.date;
        });

        // sort the event arrays in the other direction          
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