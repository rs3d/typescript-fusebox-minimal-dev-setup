import("./index.scss");
import test from "./modules/test";
import isNumber from "is-number";

console.error(test);
console.assert(!isNumber(test));

if (process.env.NODE_ENV !== "production") {
  require("./hmr");
}
console.log("hi out there!", process);

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const fileInput = document.querySelector('input[type="file"]');
const imageSrc = sessionStorage.getItem("image-src");

if (imageSrc) {
  handleImageData(imageSrc);
}

fileInput.addEventListener("change", e => {
  const target = e.target as HTMLInputElement;
  const file = target.files[0];
  handleFile(file);
});
document.addEventListener("drag", function( event ) {

}, false);

document.addEventListener(
  "dragover",
  function(e) {
    e.preventDefault(); // prevent default to allow drop
    console.log(e);
  },
  false
);

document.addEventListener(
  "drop",
  e => {
    e.preventDefault();
    const data = e.dataTransfer;
    const file = data.files[0];
    handleFile(file);
  },
  false
);

function handleImageData(data: any) {
  const image = new Image();
  image.onload = e => {
    const target = e.target as HTMLImageElement;
    const { width, height } = target;
    canvas.width = width;
    canvas.height = height;

    context.drawImage(target, 0, 0);
  };
  image.src = data;
  sessionStorage.setItem("image-src", data);
}

function handleFile(file: File) {
  console.log(file);
  const reader = new FileReader();
  reader.onloadend = e => {
    handleImageData(e.target.result);
  };
  reader.readAsDataURL(file);
}
