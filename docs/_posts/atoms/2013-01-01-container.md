---
layout: default
title:  "Container"
date:   2013-08-23 15:28:10
categories: atoms
---
Standard object for dividing pages into "sections" and horizontally centering them in the viewport.

## Base

`.container` - centers and applies clearfix to an element on the page. Width applied is equal to the `$containerWidth` variable.

<section class="docs-example">
	<div class="container">
		I'm a section on the layout/page which should be centered in the window
	</div>
</section>

{% highlight html %}
<div class="container">
	I'm a section on the layout/page which should be centered in the window
</div>
{% endhighlight %}

## Modifiers

### Reduced

`.container--reduced` - halves the default width of the container.

<section class="docs-example">
	<div class="container container--reduced">
		I'm a section of half the default width
	</div>
</section>

{% highlight html %}
<div class="container container--reduced">
	I'm a section of half the default width
</div>
{% endhighlight %}


### Padded

`.container--padded` - applies top and bottom vertical padding to the container

<section class="docs-example">
	<div class="container container--padded">
		I'm a section with vertical padding
	</div>
</section>

{% highlight html %}
<div class="container container--padded">
	I'm a section with vertical padding
</div>
{% endhighlight %}