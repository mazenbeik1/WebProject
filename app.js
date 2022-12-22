const express = require("express");
const app = express();
const fs = require("fs");
const fileName = "./assignments.json";
const file = require(fileName);

function roleCheck(id) {
	let role;

	file.forEach((student) => {
		if (student.id == id) {
			role = student.role;
			return;
		}
	});

	return role;
}

app.listen(3000);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile("./index.html", { root: __dirname });
	app.use(express.static("./"));
});

app.get("/nerdView.html", (req, res) => {
	res.sendFile("./nerdView.html", { root: __dirname });
	app.use(express.static("./"));
});

app.get("/studentView.html", (req, res) => {
	res.sendFile("./studentView.html", { root: __dirname });
	app.use(express.static("./"));
});

app.post("/studentView.html", (req, res) => {
	console.log(req.body);
	if (roleCheck(req.body.id) == "nerd" && !(studentID == userID)) {
		file.forEach((student) => {
			if (student.id == req.body.id) {
				student.grade = req.body.grade;
			}
		});
		fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
			if (err) return console.log(err);
			console.log("writing to " + fileName);
		});
		res.send("GRADE APPLIED.\nPLEASE CLOSE THIS TAB");
	}

	// student
	else if (roleCheck(req.body.id) == "student") {
		file.forEach((student) => {
			if (student.id == req.body.id) {
				student.assignment = JSON.stringify(req.body.pdf);
			}
		});
		console.log(JSON.stringify(req.body.pdf));

		fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
			if (err) return console.log(err);
			console.log("writing to " + fileName);
			res.send("ASSIGNMENT SENT\nPLEASE CLOSE THIS TAB");
		});
	}
});
