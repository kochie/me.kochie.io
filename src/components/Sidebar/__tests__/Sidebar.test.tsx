import * as React from "react";
import * as renderer from "react-test-renderer";

import Sidebar from "../Sidebar";

it("sidebar renders correctly", () => {
  const tree = renderer.create(<Sidebar />).toJSON();
  expect(tree).toMatchSnapshot();
});
