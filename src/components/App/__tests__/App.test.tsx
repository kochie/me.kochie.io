import * as renderer from "react-test-renderer";
import * as React from "react";

import App from "../App";

jest.mock("react-ga");

it("app renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
