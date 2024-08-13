import 'reset-css/reset.css';

import './styles.scss';

import './polyfills';

import './vendors';

import 'components';

/*
* Here we make the code compatible with old browsers like IE8, iOS 9 and so on.
* And you can use all modern features like typescript, webpack, scss, etc.
*
* We are using axios this version because of compatability with old browsers;
* url-search-params-polyfill is for the same goal;
* Bluebird is for promises for browsers that don't support them;
*/
