# charcoal-se.github.io [![Travis](https://img.shields.io/travis/Charcoal-SE/charcoal-se.github.io.svg?style=flat-square)](https://travis-ci.org/Charcoal-SE/charcoal-se.github.io)

## Setting up the Charcoal website locally
Before you can develop and contribute to the Charcoal website, you'll need to install the relevant packages and dependencies.
- If you're on a Mac, you'll need to install Developer Tools (or Xcode).
    - In Terminal, run `xcode-select --install`
    - You may already have Xcode installed. Make sure it's up to date by running `softwareupdate --install -a` to install all updates.
- Next, you'll need to install the Ruby dependencies:
    - `gem install jekyll bundler`
    - If, for example, you already have `bundler`, you can just run `gem install jekyll`
- Finally, install the project-specific dependencies: 
    - `bundle install`
    - You can see what the dependencies are in Gemfile.rb.

## Running the Charcoal website locally
You'll need to build the website based on the markdown files, then run the server that serves up the compiled website.
- `bundle exec jekyll build`
    - This puts together the files needed to run the website
    - See https://jekyllrb.com/docs/ for more information on Jekyll
- `bundle exec jekyll serve`
    - This runs the server that lets you preview what the website will look like once deployed.