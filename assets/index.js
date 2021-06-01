const importAll = r => { r.keys().forEach(r) }
importAll(require.context('./images/svg-sprite', true, /\.svg$/));

import "./scss/main.scss";
import "./js/main.js";
