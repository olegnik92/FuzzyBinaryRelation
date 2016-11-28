import './styles.styl';

import angular from 'angular';
import fuzzyModule from './fuzzyModule';
import {} from './layoutComponent';


let rootNode = angular.element('<div id="root" layout-component>');
angular.element(document.body).append(rootNode);

angular.bootstrap(rootNode, [fuzzyModule.name], { strictDi: true });


