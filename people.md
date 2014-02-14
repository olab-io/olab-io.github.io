---
layout: page
title: "People"
css: general
---

<ul class="list-inline">
{% for person in site.data.people %}
<li>
	<a href="http://talk.olab.io/users/{{person.username}}">
		<img src="{{person.avatar}}" alt="{{person.username}}" class="img-circle"/>
	</a>
</li>
{% endfor %}
</ul>


### Friends
<ul class="list-inline">
{% for friend in site.data.friends %}
<li>
	<a href="{{friend.homepage}}">
		<img src="{{friend.avatar}}" alt="{{friend.name}}" class="img-rounded"/>
	</a>
</li>
{% endfor %}
</ul>
