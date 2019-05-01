import * as renderer from "react-test-renderer";
import * as React from "react";

import ContactButton from "../ContactButton";

it("contact button renders correctly", () => {
  const tree = renderer
    .create(
      <ContactButton name="test" email="test@test.com" message="a message" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
