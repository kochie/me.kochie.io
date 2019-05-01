import * as React from "react";
import * as renderer from "react-test-renderer";

import Contact from "../Contact";

it("contact renders correctly", () => {
  const tree = renderer.create(<Contact />).toJSON();
  expect(tree).toMatchSnapshot();
});
