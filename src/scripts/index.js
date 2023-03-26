import "pixi-sound";

import { App } from "./App";

const fontName = "Press Start 2P";

window.onload = function () {
  WebFont.load({
    // this event is triggered when the fonts have been rendered, see https://github.com/typekit/webfontloader
    active: function () {
      if (window.innerWidth >= 1024) {
        const app = new App();
        app.run();
      }
    },
    // multiple fonts can be passed here
    google: {
      families: [fontName],
    },
  });
};
