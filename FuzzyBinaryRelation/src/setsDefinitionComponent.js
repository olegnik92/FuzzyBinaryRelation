import angular from 'angular';
import fuzzyModule from './fuzzyModule';
import {FuzzySet, FuzzySetElement} from './fuzzyOperations';

const template = `
<div class="sets-definition">
    <div layout="row" layout-sm="column" layout-xs="column">
      <div flex class="def-column">
            <h1 class="md-headline">Задайте нечеткое множество A универсального множества X</h1>
            <md-button class="md-raised md-primary" ng-click="addElement(sets.fromSet.elements)">Добавить элемент</md-button>  
            <div class="fuzzy-elements">
                <div class="fuzzy-element" ng-repeat="el in sets.fromSet.elements">
                    <span class="label">A{{$index}}:</span>
                    <md-input-container flex-gt-sm>
                        <label>Описание</label>
                        <input ng-model="el.note" ng-model-options="{ updateOn: 'blur' }">
                    </md-input-container>
                    <md-input-container flex-gt-sm class="weight">
                        <label>Ст. прин.</label>
                        <input ng-model="el.weight" ng-model-options="{ updateOn: 'blur' }">
                    </md-input-container>
                    <md-button aria-label="Remove" class="md-fab md-mini" ng-click="removeElement(sets.fromSet.elements, el)">
                        <md-icon></md-icon>
                    </md-button>
                </div>
            </div>             
      </div>
      <div flex class="def-column">
        <h1 class="md-headline">Задайте элементы универсального множества Y</h1>
        <md-button class="md-raised md-primary" ng-click="addElement(sets.toSet.elements)">Добавить элемент</md-button>  
            <div class="fuzzy-elements">
                <div class="fuzzy-element" ng-repeat="el in sets.toSet.elements">
                    <span class="label">Y{{$index}}:</span>
                    <md-input-container flex-gt-sm>
                        <label>Описание</label>
                        <input  ng-model="el.note" ng-model-options="{ updateOn: 'blur' }">
                    </md-input-container>
                    <md-button aria-label="Remove" class="md-fab md-mini" ng-click="removeElement(sets.toSet.elements, el)">
                        <md-icon></md-icon>
                    </md-button>
                </div>
            </div> 
      </div>
    </div>
</div>

`;

fuzzyModule.directive('setsDefinitionComponent', [

function () {
    return {
        restrict: 'EA',
        template: template,
        replace: true,
        scope: {
            sets: '='
        },
        link: ($scope) => {
            $scope.sets = $scope.model || {};
            $scope.sets.fromSet = $scope.sets.fromSet || new FuzzySet();
            $scope.sets.toSet = $scope.sets.toSet || new FuzzySet();


            $scope.addElement = function (collection) {
                var el = new FuzzySetElement(0, '', 0);
                collection.push(el);
            };

            $scope.removeElement = function (collection, el) {
                let ind = collection.indexOf(el);
                if (ind > -1) {
                    collection.splice(ind, 1);
                }
            };
        }
    };
}
]);