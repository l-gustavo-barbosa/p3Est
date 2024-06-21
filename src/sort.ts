

function bubble_naive<T>(v:T[]){
    for(let i=0; i<v.length; ++i){
        for(let j=0; j<(v.length-1); ++j){
            if(v[j] > v[j+1]){
                let aux = v[j];
                v[j] = v[j+1];
                v[j+1] = aux;
            }                 
        }
    }
}

function sort<T>(v:T[]): T[]{
    if(v.length<2){
        return v;
    }
    let pivot = v[0];
    let left_array: T[] = new Array<T>();
    let right_array: T[] = new Array<T>();
    for(let i = 1; i <v.length; ++i){
        if (v[i]< pivot)
            left_array.push(v[i]);
        if (v[i]>=pivot)
            right_array.push(v[i]);
    }        
    return Array.prototype.concat(sort(left_array), 
                                  pivot, 
                                  sort(right_array));
}

function generateReversedArray(size: number): number[] {
    return Array.from({ length: size }, (_, i) => size - i);
}

function generateRandomArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

function measureTime(fn: (arr: number[]) => void, arr: number[]): number {
    const start = performance.now();
    fn(arr);
    const end = performance.now();
    return end - start;
}

function getBubleWorst(repeticoes:number){
    let result:number = 0;
    for(let i = 1; i <= repeticoes; i++){
        result += measureTime(bubble_naive, generateReversedArray(1000))
    }
    return result;
}

function getBuble(repeticoes:number){
    let result:number = 0;
    for(let i = 1; i <= repeticoes; i++){
        result += measureTime(bubble_naive, generateRandomArray(1000))
    }
    return result;
}

function getQuick(repeticoes:number){
    let result:number = 0;
    for(let i = 1; i <= repeticoes; i++){
        result += measureTime(sort, generateRandomArray(10000))
    }
    
    return result;
}


function getQuickWorst(repeticoes:number){
    let result:number = 0;
    for(let i = 1; i <= repeticoes; i++){
        result += measureTime(sort, generateReversedArray(1000))
    }
    return result;
}



function runTests() {
    const results = {
        bubbleWorst: [] as number[],
        bubbleAverage: [] as number[],
        quickSortWorst: [] as number[], 
        quickSortAverage: [] as number[]
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
    console.log(results)

    return results
}

function buildGraph(){
    
    const tableBody = document.querySelector("#data-table tbody") as HTMLTableElement;
    const names:string[] = ['Buble Average','Buble Worst','Quick Average','Quick Worst']
    let data = runTests()
    let results = [data.bubbleAverage, data.bubbleWorst, data.quickSortAverage, data.quickSortWorst]
        for (let i = 0; i < results.length; i++) {
            const row = document.createElement("tr");
            let title = document.createElement("td");
            title.textContent = names[i];
            row.appendChild(title)
            for(let j = 0; j < 3; j++){
                let cell = document.createElement("td");
                cell.textContent = `${results[i][j]} milisegundos`
                row.appendChild(cell)
            }
            tableBody.appendChild(row);
            
        }
    }


document.addEventListener('DOMContentLoaded', buildGraph);

