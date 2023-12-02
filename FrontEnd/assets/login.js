let logInBtn = document.getElementById("connectBtn")

logInBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    var connectionPayload = {
        "email": email,
        "password": password
    };

    try {
        let logInReturn = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(connectionPayload)
        });

        let logInResponse = await logInReturn.json();

        if (logInResponse.message === "user not found") {
            let errorLogIn = document.createElement("p")
            errorLogIn.className = "errorLogIn"
            let errorTxt = "E-Mail ou mot de passe incorrecte"
            errorLogIn.innerHTML = errorTxt

            let logInContainer = document.querySelector(".logInContainer")
            logInContainer.appendChild(errorLogIn)
        } else {
            if (document.contains(document.querySelector(".errorLogIn"))) {
                document.querySelector(".errorLogIn").remove()
            }
            
            window.localStorage.setItem("token", logInResponse.token)
            window.localStorage.setItem("userId", logInBtn.userId)
            console.log(logInResponse);
            
            localStorage.setItem("connected", "true");

            window.location.replace("index.html")
            
            
            tryIfLoged()
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
});
