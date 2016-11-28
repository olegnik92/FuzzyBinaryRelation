import angular from 'angular'
import ngMaterial from 'angular-material';

const fuzzyModule = angular.module('fuzzy', [ngMaterial]);
fuzzyModule.config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
    $mdThemingProvider.theme('default').accentPalette('red');
}]);


export default fuzzyModule;