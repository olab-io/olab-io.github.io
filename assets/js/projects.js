$( document ).ready(function() {

    // grab the events json from talk.olab.io
    $.getJSON('http://talk.olab.io/category/projects.json', function(data) {
        // make a few empty arrays
        var projectsArray = new Array();

        // cycle through the topics list from talk
        $.each(data.topic_list.topics, function(i, item) {

            if (item.slug != "open-projects")
            {
                var project = new Object();
                project.title = item.title;
                project.link = "http://talk.olab.io/t/" + item.slug + "/" + item.id;
                project.image = "http://talk.olab.io" + item.image_url;
                projectsArray.push(project);
            }
        });

        var projects = { projects: projectsArray };

        var projectsTemplate = $('#projects_template').html();

        console.log()

        $("#projects").html(Mustache.to_html(projectsTemplate, projects));

    });
});