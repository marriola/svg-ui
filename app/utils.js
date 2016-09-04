import { v4 } from "node-uuid";

let id = 0;

export function uniqueIdentifier() {
    return ++id; //v4();
}
