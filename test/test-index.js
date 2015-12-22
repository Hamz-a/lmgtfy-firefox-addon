var main = require("../");

exports["test main"] = function(assert) {
    assert.pass("Unit test running!");
};

exports["test main async"] = function(assert, done) {
    assert.pass("async Unit test running!");
    done();
};

exports["test main sanitize"] = function(assert, done) {
    assert.ok(
        main.sanitize("  php  \r\n regex   tutorial   ") == "php regex tutorial",
        "sanitize works"
    );
    done();
};

exports["test main createLink"] = function(assert, done) {
    assert.ok(
        main.createLink("http://lmgtfy.com/?q=", "php regex tutorial") == "http://lmgtfy.com/?q=php%20regex%20tutorial",
        "createLink works"
    );
    done();
};

require("sdk/test").run(exports);
