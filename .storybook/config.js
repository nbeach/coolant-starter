import { configure } from "@storybook/react";
import "../src/style/index.scss";

function loadStories() {
    function requireAll(r) { r.keys().forEach(r); }
    requireAll(require.context("../src/component", true, /\.stories\.tsx$/));
}

configure(loadStories, module);
