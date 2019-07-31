#!/bin/sh

sudo aglio -i main.apib --theme-template index.jade --theme-variables variables-flatly.less -o index.html;
sudo cp index.html ../../webapp/doc/index.html;
