import { fab } from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Head, App } from "../components";

library.add(fab, faComment);

export default () => (
  <>
    <Head />
    <App />
  </>
);
