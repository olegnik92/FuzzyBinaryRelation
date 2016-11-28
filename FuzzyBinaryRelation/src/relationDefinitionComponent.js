import angular from 'angular';
import fuzzyModule from './fuzzyModule';
import {FuzzySet, FuzzySetElement} from './fuzzyOperations';

const template = `
<div class="relation-definition">
    <h1  class="md-headline">Задайте элементы матрицы нечеткого бинарного отношения R</h1>
    <table class="relation-matrix"> 
        <tr class="header">
            <td></td>
            <td ng-repeat="col in relation.columns track by col" class="col" title="{{relation.toSet.elements[$index].note}}">Y{{$index}}</td>
        <tr>
        <tr ng-repeat="row in relation.rows track by row" class="row" title="{{relation.fromSet.elements[$index].note}}">
            <td ><div class="row-label">A{{$index}}</div></td>
            <td ng-repeat="col in relation.columns track by col" class="col">
                <md-input-container flex-gt-sm class="weight">
                    <label></label>
                    <input ng-model="relation[row][col].weight" ng-model-options="{ updateOn: 'blur' }">
                </md-input-container>                
            </td>
        </tr>
    </table>
</div>

`;

fuzzyModule.directive('relationDefinitionComponent', [

function () {
    return {
        restrict: 'EA',
        template: template,
        replace: true,
        scope: {
            relation: '='
        }
    };
}
]);