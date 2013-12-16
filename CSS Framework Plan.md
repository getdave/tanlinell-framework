# CSS

## Mixins



* Entire Scut framework as a dependency
* Grid
* Typography
* ~~CSS3~~ - deprecated. Now handeled via [Grunt AutoPrefixer](https://npmjs.org/package/grunt-autoprefixer)

## Atoms

Description: http://pattern-lab.info/about.html#atoms

Base building blocks of the framework. Should apply styles to tags.

### Text
* Lead
* preformatted text
* emphasis
* time

### Headings

### Blockquote

### List
 * Unordered
 * Ordered
 * Definition
 * Ticked
 * Crossed
 * Block List (nav-like)

### Spacing
 * Box-model modifiers
 * Landmark
 * Block vertical spacing modifiers (eg: "Flush", "Gap", "Space", "Void")

### Alert

Standard "announcement" message styles.

### Image
 * Ratios (4:3, 16:9, Square)
 * Polaroid
 * Circle
 * Aligned

### Alignment
* Left/Right/Center

### Table

### Forms
#### Layout
 * Inline
 * Block

#### Units
* Elements


### Icons
* Icon
* Sprite

### Links
 * Complex
 * External
 * Media - (eg: PDF icon + link)
 * Share - link + icon
 * Block - creates a blocky link. Similar to a "button" but without any fancy styles. 

### Button

Build upon [Beautons](https://github.com/csswizardry/inuit.css/blob/master/objects/_beautons.scss).




## Molecules

### Containers

"Sectioning" blocks for visually centered and cleared "sections".

### Grid

### Navigation
 * Stacked
 * Horiztonal
 * Dots (used for slider navs)

### Media Block (+ mixin)

Standard pattern as per [this example](https://github.com/getdave/Tanlinell/blob/develop/assets/sass/framework/molecules/_media-block.scss).


### Offscreen (+ mixin) 

Creates an offscreen component.

### Forms
 * Search
 * Newsletter
 * Sign Up
 * Comment

### Text
 * Address
 * Quotation (blockquote + cite)
 * Heading Group (heading + byline)

### Images
 * Captioned

### Blocks

* Island
* Panel
* Thumbnail - as per [here](http://getbootstrap.com/components/#thumbnails)

### Icons
* Social
* UI


## Compounds

Distinct components (typically UI components) created from combining molecules/atoms together with custom CSS. 

### Hero

### Slider/Carousel

### Tabs

### Breadcrumbs

### Pagination

### Scrollable - as per [this](www.456bereastreet.com/archive/201309/responsive_scrollable_tables/)

### Dropdown

### Expandable (should this simply be an accordian?)

### Navigation 

Distinct from "Nav". Implies an actual navigational component.

* Banner
* Sub
* Offcanvas (left/right)
* Sticky


### Button

* Split
* Dropdown Buttons
* Button Groups




## Organisms

Make up distinct units of a template. For example a banner, featured hero block or a footer area.

### Map

Pattern for including a standard map in the page.

### Banner (masthead)

### Footer

### Sub Footer

### hCard

### Logo

Site logo

### Social Links

Unit compromising links to social accounts.

### Social Actions

Unit comprising social *actions* such as "Like", "Tweet"...etc

### Contact Unit 

Use for displaying contact details (tel, email...etc). Typically in a site header. Includes variations for

* Inline
* Block








## Templates




# Tooling

* [Grunt Sass](https://github.com/sindresorhus/grunt-sass) - based on Node Sass. We ditch Compass.
* [Node Bourbon](https://npmjs.org/package/node-bourbon) - superceeds Compass and is Node Sass based
* CSSLint
* Grunt Autoprefixr
* Grunt Fontello
* Grunt SpriteSmith
* Grunt Readme
* Grunt Assemble (for docs)