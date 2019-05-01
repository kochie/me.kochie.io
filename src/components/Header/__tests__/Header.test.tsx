import * as renderer from "react-test-renderer";
import * as React from "react";

import Header from "../Header";

it("header renders correctly", () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
