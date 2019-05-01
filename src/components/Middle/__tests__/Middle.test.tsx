import * as renderer from "react-test-renderer";
import * as React from "react";

import Middle from "../Middle";

it("middle renders correctly", () => {
  const tree = renderer.create(<Middle />).toJSON();
  expect(tree).toMatchSnapshot();
});
