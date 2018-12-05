"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var renderer = require("react-test-renderer");
var App_1 = require("../App");
it('renders correctly', function () {
    var tree = renderer
        .create(React.createElement(App_1.default, null))
        .toJSON();
    expect(tree).toMatchSnapshot();
});
