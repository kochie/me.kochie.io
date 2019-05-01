import * as renderer from "react-test-renderer";
import * as React from "react";

import Connections from "../Connections";

it("connections renders correctly", () => {
  const tree = renderer.create(<Connections />).toJSON();
  expect(tree).toMatchSnapshot();
});
