<!-- @file Instructions for subtheming using the Sass Starterkit. -->
<!-- @defgroup subtheme_sass -->
<!-- @ingroup subtheme -->

# SASS Starterkit

Below are instructions on how to create a Bootstrap sub-theme using a SASS
preprocessor.

- [Prerequisites](#prerequisites)
- [Additional Setup](#setup)
- [Using NPM, Bower & Grunt](#npm)
- [Override Styles](#styles)
- [Override Settings](#settings)
- [Override Templates and Theme Functions](#registry)

## Prerequisites
- Read the @link getting_started Getting Started @endlink documentation topic.
- You must understand the basic concept of using the [SASS] CSS pre-processor.
- You must use a **[local SASS compiler](https://www.google.com/search?q=sass+compiler)**.
- To use the NPM, Bower and Grunt method you must have NPM, and Bower installed on your
  server/development environment.
- You must use the [Bootstrap Framework Source Files] ending in the `.scss`
  extension, not files ending in `.css`.

## Additional Setup {#setup}
Download and extract the **latest** [Bootstrap Sass Framework Source Files] into your
new sub-theme. After it has been extracted, the folder should read `./subtheme/bootstrap-sass`.

{.alert.alert-warning} **WARNING:** Do not modify the files inside of
`./subtheme/bootstrap-sass` directly. Doing so may cause issues when upgrading the
[Bootstrap Framework] in the future.

## Using NPM, Bower & Grunt in workflow {#npm}
Run `npm install` and then `bower install` to setup your project files.

Run `grunt copy` to copy bootstrap files into the correrct bootstrap-sass directory.

Next run `grunt` to compile SASS for the first time into the css folder.

After you've run the initial `grunt` you can then use `grunt watch` to continuously watch
the sass files for changes, or you can run `grunt sass` to just do a single run and
compile the sass.

## Override Styles {#styles}
The `./subtheme/sass/_variable-overrides.scss` file is generally where you will
the majority of your time overriding the variables provided by the [Bootstrap
Framework].

The `./subtheme/sass/_bootstrap.scss` file is nearly an exact copy from the
[Bootstrap Framework Source Files]. The only difference is that it injects the
`_variable-overrides.scss` file directly after it has imported the[Bootstrap
Framework]'s `_variables.scss` file. This allows you to easily override variables
without having to constantly keep up with newer or missing variables during an
upgrade.

The `./subtheme/sass/_overrides.scss` file contains various Drupal overrides to
properly integrate with the [Bootstrap Framework]. It may contain a few
enhancements, feel free to edit this file as you see fit.

The `./subtheme/sass/style.scss` file is the glue that combines the
`_bootstrap.sass` and `_overrides.scss` files together. Generally, you will not
need to modify this file unless you need to add or remove files to be imported.
This is the file that you should compile to `./subtheme/css/styles.css` (note
the same file name, using a different extension of course).

## Override Theme Settings {#settings}
Please refer to the @link subtheme_settings Sub-theme Settings @endlink topic.

## Override Templates and Theme Functions {#registry}
Please refer to the @link registry Theme Registry @endlink topic.

[Bootstrap Framework]: http://getbootstrap.com
[Bootstrap Framework Source Files]: https://github.com/twbs/bootstrap/releases
[SASS]: http://sass-lang.com/
