# Tanlinell Framework

Tanlinell Framework is a modular, design agnostic CSS framework designed from scratch to facilitate the rapid production of UI.

It is by no means comprehensive but it aims to build upon best practice and draws inspiration from OOCSS, Bootstrap, Inuit CSS, Zurb Foundation, Bourbon Refills and the HTML5 Boilerplate.


## Getting Started

We recommend using [Bower](http://bower.io/) to install Tanlinell. Simply define this repoistory as a dependency in your `bower.json` file. 

```json
"dependencies": {
	"tanlinell-framework": "getdave/tanlinell-framework"
}
```

Next we advise you review the example usage of the framework in the Tanlinell Wordpress theme at https://github.com/getdave/Tanlinell/. Pay particular attention to `Gruntfile.js` which shows how the framework can be utilised.


## CSS Framework

The following assumes you have installed the framework via Bower.

From your primary `scss` file simply @import `tanlinell-framework.scss` from your `bower_components` directory.

```sass
// Import the Tanlinell Framework CSS 
@import "bower_components/tanlinell-framework/sass/tanlinell-framework.scss";

// include your site specific sass files go after this point
...
```

### Overides

Tanlinell's default settings are defined in the `_defaults.scss` file contained within the framework. To overide the defaults simply create a `_config.scss` file and include this before `tanlinell-framework.scss"` in your main `scss` file.

```sass

// Custom Config
@import "_config.scss";

// Tanlinell Framework CSS 
@import "tanlinell-framework.scss";
```

Within your `_config.scss` file simply overide and redefine variables as required to modify the framework's behaviour.


### Reducing Page Weight - selective component inclusion

Tanlinell comes with a large number of components but in order to reduce page-weight, we encourage you to only utilise those components which you require for your project's purposes.

To do this Tanlinell allows you to select which components are included at compile time by setting the [appropriate Boolean variables](https://github.com/getdave/tanlinell-framework/blob/develop/sass/_defaults.scss#L257) in the framework configuration file.

For example, if your project does not require base pagination styles simply set the appropriate variable to `false` and those styles will not be included:

```scss
// in your _config.scss file
$use-pagination: false;
```

See the Tanlinell WordPress theme for [a more detailed example](https://github.com/getdave/Tanlinell/blob/develop/assets/sass/site/_config.scss#L96).


## JS Framework

To utilise the JS framework we advise manual compliation via Grunt. An example of this is included in the [Tanlinell WordPress theme's Gruntfile](https://github.com/getdave/Tanlinell/blob/develop/Gruntfile.js#L83).



## Requirements

Requires minimum of Sass 3.3.0. To update your SASS gem run: `gem install sass`.

