# Redmine jsToolBar Slider

This is a plugin for Redmine.  
This plugin adds two buttons to the right edge of the jsToolBar that allow
sliding the toolbar buttons when the toolbar is overflowing.

## Demo

![](/doc/images/jsToolbar_slider_demo.gif)

## Compatibility

The original release was tested with Redmine v5.0.5. The arrow icons are embedded SVGs, so they do not depend on core image paths or the asset pipeline layout.

Local checks on Redmine 7.0.2 / Rails 8.1.4 covered asset compilation, toolbar scrolling, preview/edit switching, and dynamically created editors at desktop and mobile widths. These checks used Ruby 4.0.7 and SQLite; they do not establish compatibility with every deployment or theme.

## Installation

### When using git

1. Change the current directory to the Redmine plugin directory.
    ```
    cd YOUR_REDMINE_DIRECTORY/plugins
    ```
2. Clone this repository.
    ```
    git clone https://github.com/sk-ys/redmine_jstoolbar_slider.git
    ```
3. Restart Redmine.

### When not using git

1. Download zip file from the [release page](https://github.com/sk-ys/redmine_jstoolbar_slider/releases) or the [latest main repository](https://github.com/sk-ys/redmine_jstoolbar_slider/archive/refs/heads/main.zip).
2. Extract the ZIP file to your Redmine plugin directory. The name of the unzipped directory must be `redmine_jstoolbar_slider`.
3. Restart Redmine.
