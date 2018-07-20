import('./index.scss');
import test from './modules/test';
import isNumber from "is-number";
console.error(test);
console.assert(!isNumber(test));

if( process.env.NODE_ENV !== "production"){
    require("./hmr")
}
console.log('hi out there!', process);



const templateCopyOrWatch = (...args) => {
    const [mode] = args;
    console.log(args, mode);
};
templateCopyOrWatch(<any>'watch');