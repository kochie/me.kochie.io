import * as React from "react";
import * as renderer from "react-test-renderer";

import Main from "../Main";

it("main renders correctly", () => {
  const tree = renderer.create(<Main />).toJSON();
  expect(tree).toMatchSnapshot();
});
