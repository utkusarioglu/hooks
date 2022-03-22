"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFakeApi = exports.useHook = void 0;
const react_1 = require("react");
function useHook() {
    return "hook!";
}
exports.useHook = useHook;
function useFakeApi() {
    const [list, setList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then(setList);
    }, []);
    return list;
}
exports.useFakeApi = useFakeApi;
