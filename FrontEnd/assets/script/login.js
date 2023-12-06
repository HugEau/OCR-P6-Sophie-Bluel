// Using submit btn to try to connect
let logInBtn = document.getElementById("connectBtn")

logInBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    // Getting email & password
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    var connectionPayload = {
        "email": email,
        "password": password
    };

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
            if (document.contains(document.querySelector(".errorLogIn"))) {
                document.querySelector(".errorLogIn").remove()
            }
            // Creating error txt
            let errorLogIn = document.createElement("p")
            errorLogIn.className = "errorLogIn"
            let errorTxt = "E-Mail ou mot de passe incorrecte"
            errorLogIn.innerHTML = errorTxt

            let logInContainer = document.querySelector(".logInContainer")
            logInContainer.appendChild(errorLogIn)
        } else {
            // If no error => trying to find error log txt and removing it
            if (document.contains(document.querySelector(".errorLogIn"))) {
                document.querySelector(".errorLogIn").remove()
            }
            
            // Creating localStorage items to keep token and user ID to modify website
            // Vérifier comment marche les cookies, appronfondir le coup
            document.cookie = 'token= ${logInResponse.token}; secure; path=/; max-age=86400; userId= ${logInBtn.userId}; connected= true'

            window.location.replace("index.html")
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
});