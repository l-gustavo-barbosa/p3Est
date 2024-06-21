function bubble_naive(v) {
    for (var i = 0; i < v.length; ++i) {
        for (var j = 0; j < (v.length - 1); ++j) {
            if (v[j] > v[j + 1]) {
                var aux = v[j];
                v[j] = v[j + 1];
                v[j + 1] = aux;
            }
        }
    }
}
function sort(v) {
    if (v.length < 2) {
        return v;
    }
    var pivot = v[0];
    var left_array = new Array();
    var right_array = new Array();
    for (var i = 1; i < v.length; ++i) {
        if (v[i] < pivot)
            left_array.push(v[i]);
        if (v[i] >= pivot)
            right_array.push(v[i]);
    }
    return Array.prototype.concat(sort(left_array), pivot, sort(right_array));
}
function generateReversedArray(size) {
    return Array.from({ length: size }, function (_, i) { return size - i; });
}
function generateRandomArray(size) {
    return Array.from({ length: size }, function () { return Math.floor(Math.random() * size); });
}
function measureTime(fn, arr) {
    var start = performance.now();
    fn(arr);
    var end = performance.now();
    return end - start;
}
function getBubleWorst(repeticoes) {
    var result = 0;
    for (var i = 1; i <= repeticoes; i++) {
        result += measureTime(bubble_naive, generateReversedArray(1000));
    }
    return result;
}
function getBuble(repeticoes) {
    var result = 0;
    for (var i = 1; i <= repeticoes; i++) {
        result += measureTime(bubble_naive, generateRandomArray(1000));
    }
    return result;
}
function getQuick(repeticoes) {
    var result = 0;
    for (var i = 1; i <= repeticoes; i++) {
        result += measureTime(sort, generateRandomArray(10000));
    }
    return result;
}
function getQuickWorst(repeticoes) {
    var result = 0;
    for (var i = 1; i <= repeticoes; i++) {
        result += measureTime(sort, generateReversedArray(1000));
    }
    return result;
}
function runTests() {
    var results = {
        bubbleWorst: [],
        bubbleAverage: [],
        quickSortWorst: [],
        quickSortAverage: []
    };
    //bubleWorst
    results.bubbleWorst.push(getBubleWorst(1));
    results.bubbleWorst.push(getBubleWorst(10));
    results.bubbleWorst.push(getBubleWorst(100));
    //buble
    results.bubbleAverage.push(getBuble(1));
    results.bubbleAverage.push(getBuble(10));
    results.bubbleAverage.push(getBuble(100));
    //quicksortWorst
    results.quickSortWorst.push(getQuickWorst(1));
    results.quickSortWorst.push(getQuickWorst(10));
    results.quickSortWorst.push(getQuickWorst(100));
    //quicksortAverage
    results.quickSortAverage.push(getQuick(1));
    results.quickSortAverage.push(getQuick(10));
    results.quickSortAverage.push(getQuick(100));
    console.log(results);
    return results;
}
function buildGraph() {
    var tableBody = document.querySelector("#data-table tbody");
    var names = ['Buble Average', 'Buble Worst', 'Quick Average', 'Quick Worst'];
    var data = runTests();
    var results = [data.bubbleAverage, data.bubbleWorst, data.quickSortAverage, data.quickSortWorst];
    for (var i = 0; i < results.length; i++) {
        var row = document.createElement("tr");
        var title = document.createElement("td");
        title.textContent = names[i];
        row.appendChild(title);
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement("td");
            cell.textContent = "".concat(results[i][j], " milisegundos");
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}
document.addEventListener('DOMContentLoaded', buildGraph);
