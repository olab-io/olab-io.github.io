$( document ).ready(function() {

    // grab the events json from talk.olab.io
    $.getJSON('https://talk.olab.io/category/openlab-projects.json', function(data) {
        // make a few empty arrays
        var projectsArray = new Array();

        // cycle through the topics list from talk
        $.each(data.topic_list.topics, function(i, item) {

            if (item.slug != "openlab-projects")
            {
                var project = new Object();
                project.title = item.title;
                project.link = "https://talk.olab.io/t/" + item.slug + "/" + item.id;
                project.image = "https://talk.olab.io" + item.image_url;
                projectsArray.push(project);
            }
        });

        var projects = { projects: projectsArray };

        var projectsTemplate = $('#projects_template').html();

        console.log()

        $("#projects").html(Mustache.to_html(projectsTemplate, projects));

    });
});