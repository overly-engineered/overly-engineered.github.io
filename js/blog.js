$.get('http://cors.io/?https://medium.com/feed/@jwrpettman', function (data) {
    $(data).find("item").each(function () { // or "item" or whatever suits your feed
        $('#postLoad').fadeOut(100);
        var el = $(this);
        var pod = document.createElement('div');
        $(pod).addClass('displayPod');
        var heading = document.createElement('div');
        $(heading).addClass('displayPod__heading');
        $(heading).html('<a href="'+el.find("guid").text().replace("<![CDATA[", "").replace("]]>", "")+'">' +el.find("title").text().replace("<![CDATA[", "").replace("]]>", "") + '</a>');
        var body = document.createElement('div');
        $(body).addClass('displayPod__body');
        $(body).text(el.find("description").text().replace("<![CDATA[", "").replace("]]>", "").replace("Continue reading on Medium »", ""));
        var link = document.createElement('a');
        $(link).addClass('displayPod__cta');
        $(link).html('<a href="'+el.find("guid").text().replace("<![CDATA[", "").replace("]]>", "")+'">' + 'Continue reading on Medium » </a>');
        pod.appendChild(heading);
        pod.appendChild(body)
        pod.appendChild(link);
        document.getElementById('blogPage').appendChild(pod);
    });
});
