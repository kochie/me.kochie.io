import renderer from "react-test-renderer";
import React from "react";

import ChatButton from "../ChatButton";

it("by me a coffee renders correctly", () => {
  const tree = renderer.create(<ChatButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
