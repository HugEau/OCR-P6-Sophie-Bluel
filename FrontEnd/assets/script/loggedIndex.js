const modalContainer = document.querySelector(".modalContainer")
const connectionCookie = document.cookie
const portfolioBtn = document.querySelector(".portfolio__header")
const portfolioH2 = document.querySelector(".portfolio__h2")
const gallery = document.querySelector(".gallery")


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
        modalContainer.style.display = "flex";
    })
}

function modalCreate() {
    //create modal menu to manage works
    let modalCreate = document.createElement("div")
    let modalHeaderCreate = document.createElement("div")

    let modalClose = document.createElement("button")
    modalClose.className = "connect modalBtnClose"
    modalClose.innerHTML = '<i class="fa-solid fa-xmark fa-xl"></i>'
    modalHeaderCreate.appendChild(modalClose)

    let modalBodyCreate = document.createElement("div")

    let modalBodyTxtCtn = document.createElement("div")
    modalBodyTxtCtn.className = "connect modalBodyTxtCtn"
    modalBodyCreate.appendChild(modalBodyTxtCtn)

    let modalBodyGallery = document.createElement("div")
    modalBodyGallery.className = "connect modalBodyGallery"
    modalBodyCreate.appendChild(modalBodyGallery)

    let modalFooterCreate = document.createElement("div")
    
    modalHeaderCreate.className = "modalHeader"

    modalBodyCreate.className = "modalBody"


    modalFooterCreate.className = "modalFooter"


    modalCreate.className = "connect modal"

    modalCreate.appendChild(modalHeaderCreate)
    modalCreate.appendChild(modalBodyCreate)
    modalCreate.appendChild(modalFooterCreate)
    modalContainer.appendChild(modalCreate)

    //Close modal feature
    modalContainer.addEventListener("click:not(.modal)", () => {
        modalContainer.style.display = "none";
    })

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
}

function modalContentAdd() {
    // Add modal content

    let modalGallery = document.querySelector(".modalBodyGallery");
    let modalExistingWorks = modalGallery.querySelectorAll("figure");
    let modalWorks = gallery.querySelectorAll("figure");
    let modalBodyTxtCtn = document.querySelector(".modalBodyTxtCtn")

    if (!document.contains(document.querySelector(".modalBodyTxt"))) {
        let modalBodyTxt = document.createElement("h2")
        modalBodyTxt.className = "connect modalBodyTxt"
        modalBodyTxt.innerHTML = "Galerie photo"

        modalBodyTxtCtn.appendChild(modalBodyTxt)
    }  

    // Convert existingWorks NodeList to an array
    let modalExistingWorksArray = Array.from(modalExistingWorks);
    let modalWorksArray = Array.from(modalWorks);

    for (let i = 0; i < modalWorksArray.length; i++) {
        let modalNewWork = modalWorksArray[i];

        // Check if the work with the same title already exists
        let modalWorkAlreadyExists = modalExistingWorksArray.some(modalExistingWork => {
            let modalExistingAlt = modalExistingWork.querySelector("img").alt;
            let modalNewAlt = modalNewWork.querySelector("img").alt;
            return modalExistingAlt === modalNewAlt;
        });

        if (!modalWorkAlreadyExists) {
            // Create new figure element for each work and append to the gallery
            let modalNewFigure = document.createElement("figure");
            let modalNewImg = document.createElement("img");
            modalNewImg.src = modalNewWork.querySelector("img").currentSrc;
            modalNewImg.alt = modalNewWork.querySelector("img").alt;

            modalNewFigure.appendChild(modalNewImg);

            modalGallery.appendChild(modalNewFigure);
            console.log("Modal content added");
        } else {
            console.log("Modal: Work with title already exists");
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