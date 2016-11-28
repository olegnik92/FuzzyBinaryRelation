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
    <md-tabs md-dynamic-height md-border-bottom>
      <md-tab label="Определение множеств" md-on-deselect="onSetsDefinitionDeselect()">
        <md-content class="md-padding">
          <div sets-definition-component sets="sets"></div>
        </md-content>
      </md-tab>
      <md-tab label="Определение отношения">
        <md-content class="md-padding">
          <div relation-definition-component relation="relation"></div>
        </md-content>
      </md-tab>
      <md-tab label="Результат" md-on-select="onResultsTabSelect()">
        <md-content class="md-padding">
          <div results-viewport-component relation="relation"></div>
        </md-content>
      </md-tab>
    </md-tabs>
  </md-content>
</div>

`;

fuzzyModule.directive('layoutComponent', [

function () {
    return {
        restrict: 'EA',
        template: template,
        link: ($scope) => {
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
        }
    };
}
]);