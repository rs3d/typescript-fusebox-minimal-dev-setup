import isNumber from "is-number";

isNumber('1');

/* import {FuseBox} from 'fuse-box';

declare const Fusebox: typeof FuseBox;

const customizedHMRPlugin = {
    hmrUpdate: ({ type, path, content, dependants }) => { // Dependants only available when emitHMRDependencies = true
        console.log(type, path);
        if (path === 'index.html') {
            location.reload();
            return true;
        }
        if (type === "js") {
            FuseBox.flush();
            FuseBox.dynamic(path, content);
            if (FuseBox.mainFile) {
                FuseBox.import(FuseBox.mainFile)
            }
            return true;
        }
    }
}

let alreadyRegistered = false;
if (!window.hmrRegistered) {
    window.hmrRegistered = true;
    FuseBox.addPlugin(customizedHMRPlugin);
} */