# [Charcoal website](https://charcoal-se.org/) [![Travis](https://img.shields.io/travis/Charcoal-SE/charcoal-se.github.io.svg?style=flat-square)](https://travis-ci.org/Charcoal-SE/charcoal-se.github.io)

## Setting up the Charcoal website locally

Before you can develop and contribute to the Charcoal website, you'll need to install the relevant packages and dependencies.
- If you're on a Mac, you'll need to install Developer Tools (or Xcode).
    - In Terminal, run `xcode-select --install`
    - You may already have Xcode installed. Make sure it's up to date by running `softwareupdate --install -a` to install all updates.
- If you're on a Linux, you can install Ruby from your package management system:
    - Debian, Ubuntu and similar: Run `sudo apt install ruby`
    - Fedora, CentOS and similar: Run `sudo yum install ruby`
    - Arch and Manjaro: Run `sudo pacman -S ruby`
- Next, you'll need to install the Ruby package manager, Bundler:
    - `gem install bundler`
    - If, for example, you already have `bundler`, you can skip to the next step
- Finally, install the project-specific dependencies: 
    - `bundle install`
    - You can see what the dependencies are in `Gemfile.lock`.

## Running the Charcoal website locally
You'll need to build the website based on the markdown files, then run the server that serves up the compiled website.
- `script/build --dev`
    - Download and process this repository, as well as the Wiki pages
- `script/serve`
    - This runs the server that lets you preview what the website will look like once deployed.
    - Using this script instead of `bundle exec jekyll serve` will make the server only rebuild changed pages and automatically reload open pages in the browser when rebuilding.

## Build automation
For every commit to this branch, or to the repository Wikis of either Charcoal-SE/SmokeDetector or Charcoal-SE/metasmoke, a build for the Charcoal website is triggered on [Travis CI](https://travis-ci.org/Charcoal-SE/charcoal-se.github.io).

This branch `site` contains the source code of the majority of the Charcoal website. During builds, the Wikis of Charcoal-SE/SmokeDetector and Charcoal-SE/metasmoke are also fetched and built together. Refer to [the build script](script/build) for more information.
