const body = document.querySelector("body")
const connectionCookie = document.cookie
const portfolioBtn = document.querySelector(".portfolio__header")
const portfolioH2 = document.querySelector(".portfolio__h2")

function getCookie(nom) {
    // Get cookie if it exist to create logged feature
    nom = nom + "=";
    var liste = document.cookie.split(';');
    for (var i = 0; i < liste.length; i++) {
        var c = liste[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nom) == 0) return c.substring(nom.length, c.length);
    }
    return null;
}

function createAdminPage(token) {
    modifyBtnCreate()

    modalCreate()

}

function modifyBtnCreate() {
    //create modify btn to manage admin's works
    let modifyBtn = document.createElement("button")
    modifyBtn.className = "connect modifyBtn"
    modifyBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier'
    portfolioBtn.appendChild(modifyBtn)
    portfolioH2.id = "btnAdded"

    //while using modify btn => show modal menu
    modifyBtn.addEventListener('click', () => {
        modalContentAdd();
        // Add feature to show modal menu
    })
}

function modalCreate() {
    //create modal menu to manage works
    let modalCreate = document.createElement("div")
    let modalHeaderCreate = document.createElement("div")
    let modalBodyCreate = document.createElement("div")
    let modalFooterCreate = document.createElement("div")
    modalFooterCreate.className = "modalFooter"
    modalBodyCreate.className = "modalBody"
    modalHeaderCreate.className = "modalHeader"
    modalCreate.className = "connect modal"

    modalCreate.appendChild(modalHeaderCreate)
    modalCreate.appendChild(modalBodyCreate)
    modalCreate.appendChild(modalFooterCreate)
    body.appendChild(modalCreate)
}

function modalContentAdd() {
    //add modal content

    let modalGallery = document.querySelector(".modalBody");
    let modalExistingWorks = document.querySelectorAll("figure:not(.presPicture, .gallery)");
    let modalWorks = document.querySelectorAll("figure:not(.presPicture, .modalBody")

    // Convert existingWorks NodeList to an array
    let modalExistingWorksArray = Array.from(modalExistingWorks);
    let modalWorksArray = Array.from(modalWorks)
    for (let i = 0; i < modalWorksArray.length; i++) {
        let modalNewWork = modalWorksArray[i];
        
        // Check if the work with the same title already exists
        let modalWorkAlreadyExists = modalExistingWorksArray.some(modalExistingWork => {
            let modalExistingTitle = modalExistingWork.querySelector("img").alt;
            return modalExistingTitle === modalNewWork.title;
        });

        if (!modalWorkAlreadyExists) {
            // Create new figure element for each work and append to the gallery
            let modalNewFigure = document.createElement("figure");
            let modalNewImg = document.createElement("img");
            modalNewImg.src = modalNewWork.childNodes[0].currentSrc;
            modalNewImg.alt = modalNewWork.childNodes[0].alt;

            modalNewFigure.appendChild(modalNewImg);

            modalGallery.appendChild(modalNewFigure);
            console.log("modal content added")
        } else {
            console.log("Modal : work with title already exists");
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    //While page is loaded, getting cookies
    let token = getCookie("connectionCookie");
    let userId = getCookie("userId")

    if (token) {
        //create logout btn and logout btn features
        if (document.contains(document.getElementById("logInBtn"))) {
            document.getElementById("logInBtn").remove()
            let logLi = document.getElementById("logLi")
            let logOutBtnCreate = document.createElement("button")
            logOutBtnCreate.className = "logOutButton connect"
            logOutBtnCreate.onclick = "logOut()"
            logOutBtnCreate.src = "#"
            logOutBtnCreate.innerHTML = "logout"
            logLi.appendChild(logOutBtnCreate)
            
            
            logOutBtnCreate.addEventListener("click", () => {
                document.cookie = 'connectionCookie=; path=/; expires= 0'
                document.cookie = 'userId=; path=/; expires= 0'
                console.log("disconnected", getCookie(connectionCookie))
                this.location.reload()
            })
        }
        createAdminPage(token);
    }
})