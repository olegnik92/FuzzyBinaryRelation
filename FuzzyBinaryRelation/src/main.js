import './styles.styl';

require('babel-polyfill');

import angular from 'angular';
import fuzzyModule from './fuzzyModule';
import {} from './layoutComponent';


let rootNode = angular.element('<div id="root" layout-component>');
angular.element(document.body).append(rootNode);

angular.element(document.body).on('click', function (e) {
    if (e.target.tagName !== 'INPUT' && document.activeElement) {
        document.activeElement.blur();
    }
});

angular.bootstrap(rootNode, [fuzzyModule.name], { strictDi: true });
