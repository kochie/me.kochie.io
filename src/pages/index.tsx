import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Head, App } from "../components";

library.add(fab);

export default () => (
  <>
    <Head />
    <App />
  </>
);
