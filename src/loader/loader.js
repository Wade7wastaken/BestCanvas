const response = await fetch("http://localhost:5500/dist/bundle.js");
const code = await response.text();

console.log(code);
eval(code);
