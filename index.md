---
layout: swccgpc
title: SWCCGPC Streaming
permalink: /
---


Welcome to the streaming home page.

{% if site.pages.size > 0 %}
  <!-- h2>Pages</h2 -->
  <ul>
    {% for page in site.pages %}
      {% unless page.url == "/" %}
        {% unless page.url == "/feed.xml" %}
          <li><a href="{{ page.url }}">{{ page.title }}</a></li>
        {% endunless %}
      {% endunless %}
    {% endfor %}
  </ul>
{% endif %}

{% if site.posts.size > 0 %}
  <h2>Blog Posts</h2>
  <ul>
    {% for post in site.posts limit:10 %}
      <li><a href="{{ post.url }}">{{ post.title }}</a><br />
      {{ post.description }}<br />
      {{ post.date | date: "%a, %d %b %Y %H:%M:%S %z" }}</li>
    {% endfor %}
  </ul>
{% endif %}


