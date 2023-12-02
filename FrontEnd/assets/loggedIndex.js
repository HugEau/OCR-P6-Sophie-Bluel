document.addEventListener("DOMContentLoaded", function() {
    // Vérifier si la redirection a eu lieu
    if (localStorage.getItem("connected") === "true") {
        let token = window.localStorage.getItem("token");
        if (document.contains(document.getElementById("logInBtn"))) {
            document.getElementById("logInBtn").remove()
            let logLi = document.getElementById("logLi")
            let logOutBtnCreate = document.createElement("a")
            logOutBtnCreate.className("logOutButton")
        }
    }
});

let logOutBtn = document.querySelector(".logOutButton")
logOutBtn.addEventListener("click", () => {
    window.localStorage.removeItem("connected");
    window.localStorage.removeItem("token")
    window.replace("index.html")
 })