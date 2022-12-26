let userID = localStorage.getItem("UserID");
let userRole = localStorage.getItem("UserRole");
let studentID = userID;
let assignmentsData;
let studentData;

async function requestData() {
	let promise = new Promise(function (Resolve) {
		fetch("assignments.json")
			.then((Response) => Response.json())
			.then((data) => {
				Resolve(data);
			});
	});
	promise.then(function (data) {
		assignmentsData = data;
	});
	await promise;
}

function requestStudentData() {
	assignmentsData.forEach((element) => {
		if (element.id == studentID) {
			studentData = element;
		}
	});
}

function render() {
	if (userRole == "expert" || userRole == "student" || studentID == userID) {
		let fName = document.createElement("div");
		fName.innerHTML = `${studentData.fName} ${studentData.lName}`;
		document.getElementById("card-title").appendChild(fName);

		let id = document.createElement("div");
		id.innerHTML = studentID;
		document.getElementById("card-title").appendChild(id);
	}

	if (userRole == "student" || studentID == userID) {
		let pdfSubmission = document.createElement("input");
		pdfSubmission.className = "form-control";
		pdfSubmission.type = "file";
		pdfSubmission.accept = "application/pdf";
		pdfSubmission.name = "pdf";
		document.getElementById("pdfSubmissionForm").appendChild(pdfSubmission);

		let submitButton = document.createElement("button");
		submitButton.className = "btn btn-primary";
		submitButton.name = "id";
		submitButton.value = studentID;
		document.getElementById("pdfSubmissionForm").appendChild(submitButton);
	}

	// let idInput = document.createElement("input");
	// idInput.type = "radio";
	// idInput.value = studentID;
	// idInput.name = "id";
	// if (userRole == "student" || studentID == userID) {
	// 	document.getElementById("pdfSubmissionForm").appendChild(idInput);
	// } else {
	// 	document.getElementById("studentView").appendChild(idInput);
	// }

	let studentAssignment = document.createElement("div");
	studentAssignment.innerHTML = `${studentData.assignment}`;
	document.getElementById("card-text").appendChild(studentAssignment);

	let grade = document.createElement("div");
	grade.innerHTML = `Score: ${studentData.grade}/100`;
	grade.id = "studentGrade";
	document.getElementById("card-text").appendChild(grade);

	if (userRole == "nerd" && !(studentID == userID)) {
		let elem = document.createElement("div");
		elem.innerHTML = `<input id="studentGradeInput" type="text" name="grade" onclick="gradeStudent()"><button id="gradeButton" name="id" value="${userID}" >Grade</button>`;

		document.getElementById("studentView").appendChild(elem);
	}
}

function UpdateScore(Score) {
	console.log(Score);
	//Update JSON
}

function gradeStudent() {
	let Score = parseInt(document.getElementById("studentGradeInput").value);
	if (Score > 100 || Score < 0) {
		alert("Please enter a score between 0 and 100");
	} else {
		document.getElementById(
			"studentGrade"
		).innerHTML = `Score: ${Score}/100`;
		UpdateScore(Score);
	}
}

async function setup() {
	if (localStorage.getItem("StudentID")) {
		studentID = localStorage.getItem("StudentID");
	}
	await requestData();
	requestStudentData();
	render();
}

setTimeout(setup, 100);
