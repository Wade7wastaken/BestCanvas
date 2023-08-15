fetch("http://localhost:5500/dist/bundle.js")
	.then((res) => {
		return res.text();
	})
	.then((code) => {
		eval(code);
	})
	.catch((error) => {
		alert(error);
		throw new Error(error);
	});
