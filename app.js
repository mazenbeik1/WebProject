const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
var serv = require('http').Server(app);
const fs = require("fs");
const fileName = "./assignments.json";
const file = require(fileName);
let viewedStudentId;
let userID;

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

//app.listen(3000);
//app.use(express.urlencoded({ extended: true }));

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
	userID = req.body.id;
	let role = roleCheck(userID);

	if (role == "nerd" && viewedStudentId != userID) {
		console.log(viewedStudentId);
		console.log(userID);

		file.forEach((student) => {
			if (student.id == viewedStudentId) {
				student.grade = req.body.grade;
			}
		});
		console.log("NERD PART");
		fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
			if (err) return console.log(err);
			console.log("writing to " + fileName);
		});
		res.send("GRADE APPLIED.\nPLEASE CLOSE THIS TAB");
	} /*if (role == "student" || role == "expert")*/

	// student || role == "expert"
	else {
		file.forEach((student) => {
			if (student.id == viewedStudentId) {
				student.assignment = JSON.stringify(req.body.pdf);
			}
		});
		console.log(JSON.stringify(req.body.pdf));
		console.log("Student PART");

		fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
			if (err) return console.log(err);
			console.log("writing to " + fileName);
			res.send("ASSIGNMENT SENT\nPLEASE CLOSE THIS TAB");
		});
	}
});

app.post("/nerdView.html", (req, res) => {
	console.log(req.body);
	viewedStudentId = req.body.viewedStudentID;
	//res.send("index.html");
	res.end();
});

app.use('/client', express.static(__dirname + '/client'));
serv.listen(PORT);
