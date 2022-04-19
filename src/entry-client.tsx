import "./index.css";
import "./highlight.css";
import { hydrate } from "solid-js/web";
import { StartClient } from "solid-start/entry-client";

hydrate(() => <StartClient />, document);
