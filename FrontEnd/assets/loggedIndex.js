function createAdminPage(token) {
    let modifyBtn = document.createElement("button")
    modifyBtn.className = "connect, modifyBtn"
    modifyBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier'
}

document.addEventListener("DOMContentLoaded", function() {
    // Vérifier si la redirection a eu lieu
    if (window.localStorage.getItem("connected") === "true") {
        let token = window.localStorage.getItem("token");
        if (document.contains(document.getElementById("logInBtn"))) {
            document.getElementById("logInBtn").remove()
            let logLi = document.getElementById("logLi")
            let logOutBtnCreate = document.createElement("a")
            logOutBtnCreate.className = "logOutButton, connect"
        }
        createAdminPage(token);
        console.log("done")
    }
});

let modifyBtn = document.getElementById("modifyBtn")
modifyBtn.addEventListener('click', () => {
    console.log("modifyBtn has been used")
})


let logOutBtn = document.querySelector(".logOutButton")
logOutBtn.addEventListener("click", () => {
    window.localStorage.removeItem("connected");
    window.localStorage.removeItem("token")
    window.replace("index.html")
 })
 