import angular from 'angular'

let counter = 1;
const seed = () => counter++;

const truncation = (a, b) => a > b ? b : 1;

const strToNum = (str) => {
    let num;
    if (angular.isNumber(str)) {
        num = str;
    } else if (angular.isString(str)) {
        num = parseFloat(str.replace(',', '.')) || 0;
    } else {
        num = 0;
    }

    return Math.max(0, Math.min(1, num));
}

export class FuzzySetElement {
    constructor(id, note, weight) {
        this.id = id || seed();
        this.note = note;
        this._weight = strToNum(weight);
    }

    get weight() {
        return this._weight;
    }

    set weight(w) {
        this._weight = strToNum(w);
    }
};

export class FuzzySet {
    constructor() {
        this.elements = []; //array of FuzzySetElement
    }
};

const createWeightGetterSetter = function (relation, row, col) {
    return {
        get weight() {
            return relation.weightsMatrix[row][col];
        },

        set weight(val) {
            relation.weightsMatrix[row][col] = strToNum(val);
        }
    }
}

export class FuzzyRelation {
    constructor(fromSet, toSet) {
        this.fromSet = fromSet;
        this.toSet = toSet;
        this.weightsMatrix = {};
        this.rows = [];
        this.columns = [];
        for (let row of fromSet.elements) {
            let rowWeights = {};
            this[row.id] = {};
            for (let col of toSet.elements) {
                rowWeights[col.id] = 0;
                this[row.id][col.id] = createWeightGetterSetter(this, row.id, col.id); 
            }
            this.weightsMatrix[row.id] = rowWeights;
            this.rows.push(row.id);
        }

        for (let col of toSet.elements) {
            this.columns.push(col.id);
        }
    }


    getMapping() {
        let result = new FuzzySet();
        for (let col of this.toSet.elements) {
            let element = new FuzzySetElement(col.id, col.note, 0);
            let minArr = [];
            for (let row of this.fromSet.elements) {
                minArr.push(Math.min(row.weight, this.weightsMatrix[row.id][col.id]));
            }
            element.weight = Math.max(...minArr);
            result.elements.push(element);
        }

        return result;
    }

    getUnderDirectMapping() {
        let result = new FuzzySet();
        for (let col of this.toSet.elements) {
            let element = new FuzzySetElement(col.id, col.note, 0);
            let truncArr = [];
            for (let row of this.fromSet.elements) {
                truncArr.push(truncation(row.weight, this.weightsMatrix[row.id][col.id]));
            }
            element.weight = Math.min(...truncArr);
            result.elements.push(element);
        }

        return result;
    }

    getOverDirectMapping() {
        let result = new FuzzySet();
        for (let col of this.toSet.elements) {
            let element = new FuzzySetElement(col.id, col.note, 0);
            let truncArr = [];
            for (let row of this.fromSet.elements) {
                truncArr.push(truncation(this.weightsMatrix[row.id][col.id], row.weight));
            }
            element.weight = Math.min(...truncArr);
            result.elements.push(element);
        }

        return result;
    }
};

