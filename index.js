var self = require("sdk/self");
var contextMenu = require("sdk/context-menu");
var clipboard = require("sdk/clipboard");

var urlQuery = "http://lmgtfy.com/?q=";

function sanitize(input) {
    input = input.trim();                     // Trim input
    input = input.replace(/\s+/g, ' ');       // Replace white space with space
    return input;
}

function createLink(url, input) {
    input = sanitize(input);                  // Sanitize input
    encodedText = encodeURIComponent(input);  // URL encode the input
    return url + encodedText;                 // Append to url and return
}

var menuItem = contextMenu.Item({
  label: "Create a lmgtfy link",
  image: self.data.url("google-16.png"),
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
  onMessage: function (selectionText) {
    clipboard.set(createLink(urlQuery, selectionText), "text"); // Copy link to clipboard
  }
});

exports.sanitize   = sanitize;
exports.createLink = createLink;