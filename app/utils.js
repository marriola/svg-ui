import { v4 } from "node-uuid";

let id = 0;

/**
 * Clones an array and applies properties from another object into an object in it.
 */
export function cloneExtend(arr, index, props) {
    let newArr = deepCopy(arr);
    let item = newArr[index];
    newArr[index] = { ...item, ...props };
    return newArr;
}


export function required(fn, param) {
    throw `${fn}: required parameter ${param} missing`;
}

export function uniqueIdentifier() {
    return ++id; //v4();
}
