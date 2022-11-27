let LoginData;

async function getLoginData() {
	let promise = new Promise(function (Resolve) {
		fetch("Login.json")
			.then((Response) => Response.json())
			.then((data) => {
				Resolve(data);
			});
	});
	promise.then(function (data) {
		LoginData = data;
	});

	await promise;
}

async function login() {
	let id = document.getElementById("StudentId").value;
	let password = document.getElementById("Password").value;

	await getLoginData();

	LoginData.forEach((elem) => {
		if (elem.id == id && elem.password == password) {
			localStorage.setItem("UserID", id);
			localStorage.setItem("UserRole", elem.role);
			Swal.fire({
				icon: "success",
				title: "Logged in",
			}).then(() => (window.location.href = `${elem.role}View.html`));
		} else if (elem.id == id && elem.password != password) {
			Swal.fire({
				icon: "error",
				title: "Wrong Password",
			});
		}
	});
}
