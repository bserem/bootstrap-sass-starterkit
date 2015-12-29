<!-- @file Instructions for subtheming using the Sass Starterkit. -->
<!-- @defgroup subtheme_sass -->
<!-- @ingroup subtheme -->

# SASS Starterkit

Below are instructions on how to create a Bootstrap sub-theme using a SASS
preprocessor.

- [Requirements](#requirements)
- [Setup](#setup)
- [Compiling - Using Compass/Sass](#compass)
- [Compiling - Using NPM, Bower & Grunt](#npm)
- [Override Styles](#styles)
- [Override Settings](#settings)
- [Override Templates and Theme Functions](#registry)

## Requirements {#requirements}
This starter theme assumes that you have:
- An understanding of SASS and web programming
- The Drupal Bootstrap Theme: https://www.drupal.org/project/bootstrap (This project depends on this theme).
- NPM (Node Package Manager) and Bower.


## Setup {#setup}
Download this project into your sites/all/themes folder of your Drupal installation.

Run `npm install` and then `bower install` to setup your project files.
Then run `gulp firstrun` and gulp will take care of the rest.

{.alert.alert-warning} **WARNING:** Do not modify the files inside of
`./subtheme/source/ootstrap-sass` directly. Doing so may cause issues when upgrading the
[Bootstrap Framework] in the future.

## Using NPM, Bower & Gulp in workflow

After you've run the initial `gulp firstrun` you can then use `gulp watch` to continuously
watch the sass, js, images and other files for changes.
Single commands are available in the Gulp configuration, such as `gulp sass` or `gulp production-sass`.

## Override Styles {#styles}
The `./subtheme/source/sass/_variable-overrides.scss` file is generally where you will
the majority of your time overriding the variables provided by the [Bootstrap
Framework].

The `./subtheme/source/sass/_bootstrap.scss` file is nearly an exact copy from the
[Bootstrap Framework Source Files]. The only difference is that it injects the
`_variable-overrides.scss` file directly before it has imported the[Bootstrap
Framework]'s `_variables.scss` file. This allows you to easily override variables
without having to constantly keep up with newer or missing variables during an
upgrade.

The `./subtheme/source/sass/_overrides.scss` file contains various Drupal overrides to
properly integrate with the [Bootstrap Framework]. It may contain a few
enhancements, feel free to edit this file as you see fit.

The `./subtheme/sass/style.scss` file is the glue that combines the
`_bootstrap.sass` and `_overrides.scss` files together. Generally, you will not
need to modify this file unless you need to add or remove files to be imported.
This is the file that you should compile to `./subtheme/dist/css/styles.css` (note
the same file name, using a different extension of course).

## Override Theme Settings {#settings}
Please refer to the @link subtheme_settings Sub-theme Settings @endlink topic.

## Override Templates and Theme Functions {#registry}
Please refer to the @link registry Theme Registry @endlink topic.

[Bootstrap Framework]: http://getbootstrap.com
[Bootstrap Framework Source Files]: https://github.com/twbs/bootstrap/releases
[SASS]: http://sass-lang.com/
