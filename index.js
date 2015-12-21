var contextMenu = require("sdk/context-menu");
var clipboard = require("sdk/clipboard");

var urlQuery = "http://lmgtfy.com/?q=";

var menuItem = contextMenu.Item({
  label: "Create a lmgtfy link",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
  onMessage: function (selectionText) {
    encodedText = encodeURIComponent(selectionText);
    targetUrl = urlQuery + encodedText;
    clipboard.set(targetUrl, "text");
  }
});
