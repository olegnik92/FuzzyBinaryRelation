import angular from 'angular';
import fuzzyModule from './fuzzyModule';
import {FuzzySet, FuzzyRelation} from './fuzzyOperations';

const mapping = 0;
const underDirectMapping = 1;
const overDirectMapping = 2;

const template = `
<div class="results-viewport">
    <h1  class="md-headline">Образ нечеткого множества A при нечетком бинарном отношении R</h1>
    <div layout="row" layout-align="start center">
        <div class="operation-label">Операция:</div>
        <md-select ng-model="operation" placeholder="Операция">
            <md-option value="${mapping}">Образ нечеткого множества (A <i class="icon romb"></i> R)</md-option>
            <md-option value="${underDirectMapping}">Подпрямой образ нечеткого множества (A <i class="icon tri-left"></i> R)</md-option>
            <md-option value="${overDirectMapping}">Надпрямой образ нечеткого множества (A <i class="icon tri-right"></i> R)</md-option>
        </md-select>
    </div>
    <table class="results">
        <tr ng-repeat="el in result.elements" class="result">
            <td>Y{{$index}}:</td>
            <td ng-bind="el.note"></td>
            <td> ==> </td>
            <td ng-bind="el.weight"></td>
        </tr>
    </table> 
</div>

`;

fuzzyModule.directive('resultsViewportComponent', [

function () {


    const getResult = function(relation, operation){
        if(!relation){
            return new FuzzyRelation(new FuzzySet(), new FuzzySet());
        }

        switch(parseInt(operation)) {
            case mapping: {
                return relation.getMapping();
            }
            case underDirectMapping: {
                return relation.getUnderDirectMapping();
            }
            case overDirectMapping: {
                return relation.getOverDirectMapping();
            }
            default: {
                return relation.getMapping();
            }

        }
    };



    return {
        restrict: 'EA',
        template: template,
        replace: true,
        scope: {
            relation: '='
        },
        link: ($scope) => {
            $scope.operation = mapping;
            $scope.$watch('operation', function(){
                $scope.result = getResult($scope.relation, $scope.operation);
            });
            $scope.$watch('relation', function () {
                $scope.result = getResult($scope.relation, $scope.operation);
            });
            $scope.$on('resultsTabSelected', function () {
                $scope.result = getResult($scope.relation, $scope.operation);
            });
        }
    };
}
]);