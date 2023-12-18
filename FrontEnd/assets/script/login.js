// Using submit btn to try to connect
let logInBtn = document.getElementById("connectBtn")

logInBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    // Getting email & password
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    // Verify function for email and password
    async function verification() {
        let emailRegExp = /^[a-z0-9A-Z._-]+@[a-z0-9A-Z._-]+\.[a-z0-9A-Z._-]+$/;
        let passwordRegExp = /^[a-zA-Z0-9._-]+$/;

        if (emailRegExp.test(email) && passwordRegExp.test(password)) {
            let connectionPayload = {
                "email": email,
                "password": password
            };
            if (password.length > 3 && password.length < 60) {
                try {
                    // Sending request to API
                    let logInReturn = await fetch("http://localhost:5678/api/users/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(connectionPayload)
                    });

                    let logInResponse = await logInReturn.json();
        
                    // Trying to find error in API response
                    if (logInResponse.message === "user not found" || logInResponse.hasOwnProperty("error") ) {
                        // If error => trying to find error log txt and removing it
                        if (!document.contains(document.querySelector(".errorLogIn"))) {
                            let errorLogIn = document.createElement("p")
                            errorLogIn.className = "errorLogIn"
                            errorLogIn.innerHTML = "E-Mail ou mot de passe incorrecte"
        
                            let logInContainer = document.querySelector(".logInContainer")
                            logInContainer.appendChild(errorLogIn)
                        }
                        // Creating error txt
                    } else {
                        // If no error => trying to find error log txt and removing it
                        if (document.contains(document.querySelector(".errorLogIn"))) {
                            document.querySelector(".errorLogIn").remove()
                        }
            
                    // Creating localStorage items to keep token and user ID to modify website
                    // Vérifier comment marche les cookies, appronfondir le coup
                    document.cookie = 'connectionCookie =' + logInResponse.token + '; path=/; max-age=86400';
                    document.cookie = 'userId =' + logInResponse.userId + '; path=/; max-age=86400';
                    window.location.replace("index.html")
                }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            } else {
                console.log("Error while verifying password length")
                // If error => trying to find error log txt and removing it
                if (!document.contains(document.querySelector(".errorLogIn"))) {
                    let errorLogIn = document.createElement("p")
                    errorLogIn.className = "errorLogIn"
                    errorLogIn.innerHTML = "Le mot de passe contient entre 4 et 60 caractères"
        
                    let logInContainer = document.querySelector(".logInContainer")
                    logInContainer.appendChild(errorLogIn)
                } else {
                    let errorLogIn = document.querySelector(".errorLogIn")
                    errorLogIn.innerHTML = "Le mot de passe contient entre 4 et 60 caractères"
                }
            }
        } else {
            console.log("Error while verifying email")
            // If error => trying to find error log txt and removing it
                if (!document.contains(document.querySelector(".errorLogIn"))) {
                    let errorLogIn = document.createElement("p")
                    errorLogIn.className = "errorLogIn"
                    errorLogIn.innerHTML = "L'email doit être sous la forme : abc@vwx.yz"
        
                    let logInContainer = document.querySelector(".logInContainer")
                    logInContainer.appendChild(errorLogIn)
                } else {
                    let errorLogIn = document.querySelector(".errorLogIn")
                    errorLogIn.innerHTML = "L'email doit être sous la forme : abc@vwx.yz"
                }
        }
    }
    verification()
})