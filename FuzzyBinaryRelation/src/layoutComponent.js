import angular from 'angular';
import fuzzyModule from './fuzzyModule';
import {FuzzyRelation} from './fuzzyOperations';
import {} from './setsDefinitionComponent';
import {} from './relationDefinitionComponent';
import {} from './resultsViewportComponent';


const template = `
<div ng-cloak>
  <md-content class="md-padding app-container">
    <div>
        <h1 class="md-display-1">Образ нечеткого множества при нечетком бинарном отношении</h1>
    </div>
    <md-tabs md-dynamic-height md-border-bottom md-swipe-content="{{isTouchDevice}}">
      <md-tab label="Определение множеств" md-on-deselect="onSetsDefinitionDeselect()">
        <md-content class="md-padding" ng-style="{'min-height': tabMinHeight, 'box-sizing': 'border-box'}">
          <div sets-definition-component sets="sets"></div>
        </md-content>
      </md-tab>
      <md-tab label="Определение отношения">
        <md-content class="md-padding" ng-style="{'min-height': tabMinHeight, 'box-sizing': 'border-box'}">
          <div relation-definition-component relation="relation"></div>
        </md-content>
      </md-tab>
      <md-tab label="Результат" md-on-select="onResultsTabSelect()">
        <md-content class="md-padding" ng-style="{'min-height': tabMinHeight, 'box-sizing': 'border-box'}">
          <div results-viewport-component relation="relation"></div>
        </md-content>
      </md-tab>
    </md-tabs>
  </md-content>
</div>

`;

fuzzyModule.directive('layoutComponent', [
'$timeout',
function ($timeout) {
    function isTouchDevice() {
        return !!('ontouchstart' in window        // works on most browsers 
            || navigator.maxTouchPoints);       // works on IE10/11 and Surface
    };

    function calcTabMinHeight(element) {
        let wrapper = element.find('md-tabs-content-wrapper')[0];
        return `calc(100vh - ${wrapper.getBoundingClientRect().top + 50}px)`;
    };

    return {
        restrict: 'EA',
        template: template,
        link: ($scope, element) => {
            $scope.isTouchDevice = isTouchDevice();
            $scope.onSetsDefinitionDeselect = function () {    
                let newRelation = new FuzzyRelation($scope.sets.fromSet, $scope.sets.toSet);  
                if (!$scope.relation) {
                    $scope.relation = newRelation;
                    return;
                }

                for (let row of $scope.relation.rows) {
                    for (let col of $scope.relation.columns) {
                        if (newRelation[row] && newRelation[row][col]) {
                            newRelation[row][col].weight = $scope.relation[row][col].weight;
                        }
                    }
                }
                $scope.relation = newRelation;
            };

            $scope.onResultsTabSelect = function(){
                $scope.$broadcast('resultsTabSelected');
            }

            $timeout(() => {
                $scope.tabMinHeight = calcTabMinHeight(element);
            }, 500);
        }
    };
}
]);