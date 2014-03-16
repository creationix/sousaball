# SousaBall

SousaBall is an experiment into social networking using JavaScript and the canvas tag.

**UPDATE**  This README is a few years out of date.  I'm currently updating the code to run on top of my new tedit/js-git platform.

What follows is the original README from before I even had a github account.

-----------------------------------------------


A live server it hosted at <http://creationix.com:7777/>

## Technical Background

The front-end uses canvas, xhtml, css, and a healthy dose of JavaScript.  Nothing new here, except maybe for the canvas usage.

The back-end however is built using node js <http://nodejs.org/>.  This is a purely evented JavaScript framework for building servers.  The app.js file is actually an HTTP server, in production it can run behind a reverse proxy to offload downloading of the static resources.  In development, it can serve it's own files.  Node is extremely fast since it's based on events and uses the Google V8 JavaScript engine.

## Playing the Game

Sousaball is a side-view platform game.  The goal depends on the programming of the level, but usually it consists of getting all the coins and advancing to the next level.

Eventually the project will evolve into a social networking site where members create and share levels.  They will be able to link to each others levels. Also when playing a level, there will be a option to see others in the same "room" and interact with them in real-time.  That way you can work as a team to solve some puzzle.

## The Editor

SousaBall comes with a web based level editor.  Currently it can only edit the tiles of existing levels and there is no authentication.  To get to it, simple append ;edit to the end of any level url and you'll be editing that level.  If you would like a level created for your own use, send me an email and I'll create it.  Eventually I'll have this completely automated through the web interface and you'll be able to create your own levels once registered and signed in.

## Running your own server

Sousaball works out of the box using the modules provided in the [Ivy][] distribution.

Once ivy is installed and it's `bin` folder is in your path.  Simply clone this repo and run `spark`

    git clone http://github.com/creationix/sousaball.git
    cd sousaball
    spark

Then go to <http://localhost:3000/> and have fun.

## Roadmap

 * User Registration
 * Level authentication
 * Ability to program secrets/triggers through the GUI editor
 * Ability to create new levels through the website
 * Informational pane around game frame with more info
 * iPad support
 * Improve the physics engine
   * Allow for moving platforms
   * Add in enemies

[Ivy]: http://github.com/creationix/ivy/
