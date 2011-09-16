require.paths.unshift(__dirname + "/lib");

var Http = require('http'),
    Stack = require('stack'),
    Creationix = require('creationix'),
    Corn = require('./corn'),
    FS = require('fs');

// Loads a level from the database including the tileset
function loadMap(user, level, callback) {
  FS.readFile(__dirname + "/data/" + user + "." + level + ".json", 'utf8', function (err, json) {
    if (err) return callback(err);
    try {
      var levelData = JSON.parse(json);
      levelData.blocks = require('./tilesets/' + levelData.blockset);
    } catch (err) {
      return callback(err);
    }
    callback(null, levelData);
  });
}

// Save a map to the database
function saveMap(user, level, data, callback) {
  FS.writeFile(__dirname + "/data/" + user + "." + level + ".json", data, callback);
}

// Load a template from disk and inject level data
function renderTemplate(template, user, level, callback) {
  FS.readFile(__dirname + "/templates/" + template + ".tmpl", 'utf8', function (err, template) {
    if (err) return callback(err);
    Corn(template, {
      "title": "SousaBall " + user + " - " + level,
      "user": JSON.stringify(user),
      "name": JSON.stringify(level),
      "level": function (callback) {
        loadMap(user, level, function (err, data) {
          if (err) return callback(err);
          callback(null, JSON.stringify(data));
        });
      }
    }, callback);
  });
}

// Http route handlers

function play(req, res, params, next) {
  renderTemplate('play', params.user, params.level, function (err, html) {
    if (err) { next(err); return; }
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(html)
    });
    res.end(html);
  });
}

function edit(req, res, params, next) {
  renderTemplate('edit', params.user, params.level, function (err, html) {
    if (err) { next(err); return; }
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(html)
    });
    res.end(html);
  });
}

function save(req, res, params, next) {
  var json = "";
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    json += chunk;
  });
  req.on('end', function () {
    saveMap(params.user, params.level, json, function (err, result) {
      if (err) { next(err); return; }
      res.writeHead(200, {
        "Content-Length": 0
      });
      res.end();
    });
  });
}

// Serve the App

Http.createServer(Stack(
  Creationix.log(),
  Creationix.route("POST", "/:user/:level", save),
  Creationix.static("/", __dirname + "/public", "index.html"),
  Creationix.route("GET", "/:user/:level;edit", edit),
  Creationix.route("GET", "/:user/:level", play)
)).listen(3000);
console.log("Server listening at http://localhost:3000/");


