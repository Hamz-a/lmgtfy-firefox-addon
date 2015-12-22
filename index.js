var contextMenu = require("sdk/context-menu");
var clipboard = require("sdk/clipboard");

var urlQuery = "http://lmgtfy.com/?q=";

function sanitize(input) {
    input = input.trim();                     // Trim input
    input = input.replace(/\s+/g, ' ');       // Replace white space with space
    return input;
}

function createLink(input) {
    input = sanitize(input);                  // Sanitize input
    encodedText = encodeURIComponent(input);  // URL encode the input
    link = urlQuery + encodedText;            // Append to url
    return link;
}

var menuItem = contextMenu.Item({
  label: "Create a lmgtfy link",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
  onMessage: function (selectionText) {
    clipboard.set(createLink(selectionText), "text");
  }
});
