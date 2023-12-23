// Function to fetch data from API
async function loggedFetchData() {
    try {
        // Fetch categories and works data from API
        let categoriesResponse = await fetch("http://localhost:5678/api/categories");
        let worksResponse = await fetch("http://localhost:5678/api/works");

        // Convert response data to JSON
        let categories = await categoriesResponse.json();
        let works = await worksResponse.json();
        
        modalContentAdd(works)
        resetFormState()
    } catch (error) {
        // Handle any errors that occur during fetching
        console.error('Error fetching data:', error);
    }
}

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

function createAdminPage() {
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
        loggedFetchData();
        // Add feature to show modal menu
        modalContainer.style.display = "flex";
    })
}

function modalCreate() {
    //create modal menu to manage works
    let modalCreate = document.createElement("div")
    modalCreate.className = "connect modal"
    
    //create modal Header
    let modalHeaderCreate = document.createElement("div")
    modalHeaderCreate.className = "modalHeader"

    //create modal return feature
    let modalReturn = document.createElement("button")
    modalReturn.className = "connect modalBtnReturn"
    modalReturn.innerHTML = '<i class="fa-solid fa-chevron-left fa-l"></i>'
    modalHeaderCreate.appendChild(modalReturn)

    //create modal close feature
    let modalClose = document.createElement("button")
    modalClose.className = "connect modalBtnClose"
    modalClose.innerHTML = '<i class="fa-solid fa-xmark fa-xl"></i>'
    modalHeaderCreate.appendChild(modalClose)

    //create modalBody
    let modalBodyCreate = document.createElement("div")
    modalBodyCreate.className = "modalBody"

    //create modal txt presentation feature
    let modalBodyTxtCtn = document.createElement("div")
    modalBodyTxtCtn.className = "connect modalBodyTxtCtn"
    modalBodyCreate.appendChild(modalBodyTxtCtn)

    if (!document.contains(document.querySelector(".modalBodyTxt"))) {
        let modalBodyTxt = document.createElement("h2")
        modalBodyTxt.className = "connect modalBodyTxt"
        modalBodyTxt.innerHTML = "Galerie photo"

        modalBodyTxtCtn.appendChild(modalBodyTxt)
    } else {
        let modalBodyTxt = document.querySelector(".modalBodyTxt")
        modalBodyTxt.innerHTML = "Galerie photo" 
    }

    //create image container feature
    let modalBodyGallery = document.createElement("div")
    modalBodyGallery.className = "connect modalBodyGallery"
    modalBodyCreate.appendChild(modalBodyGallery)

    //create add feature
    let categoriesArray = [
        {
            "name": "Objet" ,
            "id": "1",
        },
        {
            "name": "Appartements",
            "id": "2"
        },
        {
            "name": "Hôtels & Restaurants",
            "id": "3"
        }
        
    ]
    let modalBodyAddDiv = document.createElement("div")
    modalBodyAddDiv.className = "connect modalBodyAddDiv"
    
        //create image add feature
        let modalImgAddDiv = document.createElement("div")
        modalImgAddDiv.className = "connect modalImgAddDiv"

        let modalImgAddImg = document.createElement("img")
        modalImgAddImg.src = "#"
        modalImgAddImg.id = "modalImgWaitingAdd"
        modalImgAddImg.alt = "modalImgAdded"
        modalImgAddImg.className = "connect modalAddPageImg"
        modalImgAddDiv.appendChild(modalImgAddImg)

        let modalImgAddIconCtn = document.createElement("div")
        modalImgAddIconCtn.className = "connect modalImgAddIconCtn"
        modalImgAddDiv.appendChild(modalImgAddIconCtn)
        
        let modalImgAddIcon = document.createElement("i")
        modalImgAddIcon.className = "fa-regular fa-image fa-2xl"
        modalImgAddIconCtn.appendChild(modalImgAddIcon)
        modalImgAddDiv.appendChild(modalImgAddIconCtn)

        let modalImgAddBtnCtn = document.createElement("label")
        modalImgAddBtnCtn.className = ("connect modalAddBtnCtn")
        modalImgAddBtnCtn.innerHTML = '<input class="connect modalImgAddBtn" type="file" accept=".png, .jpg, .jpeg" size= 4000000> + Ajouter photo'
        modalImgAddDiv.appendChild(modalImgAddBtnCtn)

        let modalImgAddTxt = document.createElement("p")
        modalImgAddTxt.className = "connect modalImgAddTxt"
        modalImgAddTxt.innerHTML = "jpg, png : 4mo max"
        modalImgAddDiv.appendChild(modalImgAddTxt)

    modalBodyAddDiv.appendChild(modalImgAddDiv)
        //Create form feature
        let modalAddFormDiv = document.createElement("div")
        modalAddFormDiv.className = "connect modalAddFormDiv"

        let modalAddForm = document.createElement("form")
        modalAddForm.method = "post"

        let modalAddFormTitleTxt = document.createElement("label")
        modalAddFormTitleTxt.for = "title"
        modalAddFormTitleTxt.innerHTML = "Titre"
        modalAddForm.appendChild(modalAddFormTitleTxt)

        let modalAddFormTitleInput = document.createElement("input")
        modalAddFormTitleInput.name = "title"
        modalAddFormTitleInput.id = "title"
        modalAddFormTitleInput.type = "text"
        modalAddForm.appendChild(modalAddFormTitleInput)

        let modalAddFormCategoryTxt = document.createElement("label")
        modalAddFormCategoryTxt.for = "categorySelector"
        modalAddFormCategoryTxt.innerHTML = "Catégorie"
        modalAddForm.appendChild(modalAddFormCategoryTxt)

        let modalAddFormCategorySelect = document.createElement("select")
        modalAddFormCategorySelect.name = "categorySelector"
        modalAddFormCategorySelect.id = "categorySelector"
        modalAddForm.appendChild(modalAddFormCategorySelect)
        
        let modalAddFormCategoryOption = document.createElement("option")
        modalAddFormCategoryOption.value = "0"
        modalAddFormCategoryOption.innerHTML = "Sélectionnez une catégorie de travail"
        modalAddFormCategorySelect.appendChild(modalAddFormCategoryOption)
        for (let i = 0; i < categoriesArray.length; i++) {
            let modalAddFormCategoryOption = document.createElement("option")
            modalAddFormCategoryOption.value = categoriesArray[i].id
            modalAddFormCategoryOption.innerHTML = categoriesArray[i].name
            modalAddFormCategorySelect.appendChild(modalAddFormCategoryOption)
        }
        modalAddFormDiv.appendChild(modalAddForm)
    modalBodyAddDiv.appendChild(modalAddFormDiv)
    modalBodyCreate.appendChild(modalBodyAddDiv)

    //create modal footer
    let modalFooterCreate = document.createElement("div")
    modalFooterCreate.className = "modalFooter"

    //Initiate modal creation
    modalCreate.appendChild(modalHeaderCreate)
    modalCreate.appendChild(modalBodyCreate)
    modalCreate.appendChild(modalFooterCreate)
    modalContainer.appendChild(modalCreate)

    //Close modal function feature + Refresh page to show modifications
    modalClose.addEventListener("click", () => {
        
        modalContainer.style.display = "none";
        modalBodyAddDiv.style.display = "none"
        modalBodyGallery.style.display = "grid"
        updatingGallery()
        resetInputValues()

        let modalAddNotOk = document.getElementById("modalAddNotOk")
        modalAddNotOk.style.display = "none"
        window.location.reload();
    })

    //Manage image preview
    let modalImgAddBtn = document.querySelector(".modalImgAddBtn")
        modalImgAddBtn.addEventListener("change", (event) => {
            modalImgAddBtnCtn.style.display = "none";
            modalImgAddIconCtn.style.display = "none";
            modalImgAddTxt.style.display = "none"
        
            let reader = new FileReader();
            reader.onload = function(){
                let outputImgAdd = document.querySelector('.modalAddPageImg');
                outputImgAdd.src = reader.result;
                outputImgAdd.id = "modalImgAdded";
            };
            reader.readAsDataURL(event.target.files[0]);
        });
}

function modalContentAdd(works) {
    // Add modal content
    let token = getCookie("connectionCookie");
    //create modalAddBtn
    if (!document.contains(document.querySelector(".modalAddBtn"))) {
        let modalFooter = document.querySelector(".modalFooter")
        let modalAddBtn = document.createElement("button")
        modalAddBtn.className = "connect modalAddBtn"
        modalAddBtn.innerHTML = "Ajouter une photo"
        modalAddBtn.id = "modalIntialAdd"
        modalFooter.appendChild(modalAddBtn)

        let modalAddNotOk = document.createElement("button")
        modalAddNotOk.className = "connect modalAddBtn"
        modalAddNotOk.innerHTML = "Valider"
        modalAddNotOk.id = "modalAddNotOk"
        modalFooter.appendChild(modalAddNotOk)

        let modalImgAddedBtn = document.createElement("button")
        modalImgAddedBtn.className = "connect modalAddBtn"
        modalImgAddedBtn.innerHTML = "Valider"
        modalImgAddedBtn.id = "modalImgAddedBtn"
        modalFooter.appendChild(modalImgAddedBtn)


    } else {
        let modalAddBtn = document.querySelector(".modalAddBtn")
        modalAddBtn.innerHTML = "Ajouter une photo"
        modalAddBtn.id = "modalIntialAdd"
    }
    //Add new work feature
    let modalAddBtnId = document.getElementById("modalIntialAdd")
    modalAddBtnId.addEventListener("click", () => {
        modalAddInterface(token)
    })

    let modalGallery = document.querySelector(".modalBodyGallery");
    let modalExistingWorks = modalGallery.querySelectorAll("figure");
    let modalWorks = works;

    // Convert existingWorks NodeList to an array
    let modalExistingWorksArray = Array.from(modalExistingWorks);

    for (let i = 0; i < modalWorks.length; i++) {
        let modalNewWork = modalWorks[i];

        // Check if the work with the same title already exists
        let modalWorkAlreadyExists = modalExistingWorksArray.some(modalExistingWork => {
            let modalExistingAlt = modalExistingWork.querySelector("img").alt;
            let modalNewAlt = modalNewWork.title;
            return modalExistingAlt === modalNewAlt;
        });

        if (!modalWorkAlreadyExists) {
            // Create new figure element for each work and append to the gallery
            let modalNewFigure = document.createElement("figure");
            modalNewFigure.id = modalNewWork.id
            let modalNewImg = document.createElement("img");
            modalNewImg.src = modalNewWork.imageUrl;
            modalNewImg.alt = modalNewWork.title;

            modalNewFigure.appendChild(modalNewImg);

            //create image delete feature
            let modalDeleteBtn = document.createElement("button")
            modalDeleteBtn.className = "connect modalDeleteBtn"
            modalDeleteBtn.id = modalNewWork.id
            modalDeleteBtn.innerHTML = '<i class="fa-solid fa-trash-can fa-2xs"></i>'
            modalNewFigure.appendChild(modalDeleteBtn)    

            modalGallery.appendChild(modalNewFigure);
            modalDeleteBtn.addEventListener("click", async () => {
                try {
                    let deleteId = modalDeleteBtn.id
                    let deletePayload = "Bearer " + token 
                    let deleteAction = await fetch("http://localhost:5678/api/works/"+ deleteId, {
                        method: "DELETE",
                        headers: {accept: "*/*", Authorization: deletePayload },
                    });
                    
                    if (deleteAction.ok) {
                        let deleteFigure = document.getElementById(deleteId)
                        deleteFigure.remove()

                        updatingGallery()

                        // Vérifier si la réponse n'est pas vide
                        let deleteResponseText = await deleteAction.text();
                        if (deleteResponseText.trim() !== '') {
                            let deleteResponse = JSON.parse(deleteResponseText);
                            console.log(deleteResponse)
                        } else {
                            console.log("Empty response from the server");
                        }
                    } else {
                        console.log("Server returned an error:", deleteAction.status, deleteAction.statusText);
                    }
                } catch(error) {
                    console.log("Error while removing work : " + error)
                }
            });
                       
            console.log("Modal content added");
        } else {
            console.log("Modal: Work with title already exists");
        }
    }
    // Supprimer les doublons dans la modalBodyGallery
    removeDuplicateWorksInGallery();
}

function modalAddInterface(token) {
    // create add interface
    // Do not display gallery
    let modalGallery = document.querySelector(".modalBodyGallery");
    modalGallery.style.display = "none";

    let modalHeader = document.querySelector(".modalHeader")
    modalHeader.id = "modalAddPageHeader"
    
    let modalBodyTxt = document.querySelector(".modalBodyTxt")
    modalBodyTxt.innerHTML = "Ajout photo"

    let modalFooterBtnInitial = document.getElementById("modalIntialAdd")
    modalFooterBtnInitial.style.display = "none"

    let modalFooterBtnNotOk = document.getElementById("modalAddNotOk")
    modalFooterBtnNotOk.style.display = "block"
    
    let modalAdd = document.querySelector(".modalBodyAddDiv")
    modalAdd.style.display = "flex"

    modalAddBtnAction(token)

    let modalAddPageReturn = document.querySelector(".modalBtnReturn")
    modalAddPageReturn.id = "modalAddPageReturn"

    modalAddPageReturn.addEventListener("click", () => {
        modalGallery.style.display = "grid";

        modalBodyTxt.innerHTML = "Galerie photo";

        modalAdd.style.display = "none"

        modalAddPageReturn.id = ""
        modalHeader.id = ""

        modalFooterBtnInitial.style.display = "block"
        modalFooterBtnNotOk.style.display = "none"

        if (document.contains(document.getElementById("modalImgAdded"))) {
            let modalAddImg = document.querySelector(".modalAddPageImg")
            modalAddImg.id = "modalImgWaitingAdd"
            
            let modalImgAddIconCtn = document.querySelector(".modalImgAddIconCtn")
            let modalAddBtnCtn = document.querySelector(".modalAddBtnCtn")
            let modalImgAddTxt = document.querySelector(".modalImgAddTxt")
            modalImgAddIconCtn.style.display = "flex"
            modalAddBtnCtn.style.display = "flex"
            modalImgAddTxt.style.display = "flex"
        }
        resetFormState()
    })
}

//Is form ok
function modalAddBtnAction(token) {
    let imageInput = document.querySelector(".modalAddPageImg");
    let imageInputSaver = document.querySelector(".modalImgAddBtn")
    let titleInput = document.getElementById("title");
    let categoryInput = document.getElementById("categorySelector");

    // Vérifier que toutes les valeurs ne sont pas nulles
    imageInput.addEventListener("load", checkForm);
    titleInput.addEventListener("change", checkForm);
    categoryInput.addEventListener("change", checkForm);

    function checkForm() {
        // Si le formulaire a déjà été vérifié, ne pas exécuter cette fonction
        isFormChecked = false;
        
        let image = null
        let imageSrc = null
        let title = null
        let category = null

        image = imageInput.id;
        imageSrc = imageInputSaver.files[0];
        title = titleInput.value;
        category = categoryInput.value;
    
        // Vérifier que l'image, le titre et la catégorie sont définis avant de continuer
        if (image !== "modalImgWaitingAdd" && title !== "" && category !== "0" && !isSubmitting) {
            isFormChecked = true; // Marquer le formulaire comme vérifié
            isFormOk(imageSrc, title, category, token);

            let modalAddBtnIsReady = document.getElementById("modalImgAddedBtn")
            modalAddBtnIsReady.style.display = "block"

            let modalAddWorkBtnNotOk = document.getElementById("modalAddNotOk")
            modalAddWorkBtnNotOk.style.display = "none";
        } else {
            let modalAddWorkBtnNotOk = document.getElementById("modalAddNotOk")
            modalAddWorkBtnNotOk.style.display = "block";

            let modalAddBtnIsReady = document.getElementById("modalImgAddedBtn")
            modalAddBtnIsReady.style.display = "none"

            isFormChecked = false;
        }
    }
}

let isSubmitting = false; // Variable pour suivre l'état de soumission
let isFormChecked = false; // Variable pour suivre si le formulaire a déjà été vérifié

let modalAddBtnActionListener;
let modalAddTitleListener;
let modalAddCategoryListener;

function isFormOk(imageSrc, title, category, token) {
    let titleInput = document.getElementById("title");
    let categoryInput = document.getElementById("categorySelector");
    
    // Vérifier que toutes les valeurs ne sont pas nulles
    titleInput.addEventListener("click", modalAddBtnAction(token));
    categoryInput.addEventListener("change", modalAddBtnAction(token));

    
    // Vérifiez les conditions spécifiques avant de changer l'ID du bouton
    if (imageSrc !== "" && title !== "" && category !== "0" && !isSubmitting) {

        let imagePayload = imageSrc;
        let titlePayload = title;
        let categoryPayload = category;

        console.log (categoryPayload)

        // Toutes les valeurs sont non nulles et aucune soumission en cours, afficher le payload dans la console

        let modalAddWorkBtnNotOk = document.getElementById("modalAddNotOk")
        modalAddWorkBtnNotOk.style.display = "none";

        let modalAddBtnIsReady = document.getElementById("modalImgAddedBtn")
        modalAddBtnIsReady.style.display = "block"

        // Prémice de commande d'envoi de travaux
    
        titleInput.addEventListener("change", modalAddTitleListener);
        categoryInput.addEventListener("change", modalAddCategoryListener);

        modalAddBtnIsReady.addEventListener("click", () => {
            try {
                modalAddBtnIsReady.disabled = true
                    
                    isSubmitting = true; // Définir l'état de soumission à true

                    let tokenPayload = "Bearer " + token;
                    console.log(tokenPayload);

                    let formData = new FormData();
                    formData.append("image", imagePayload); // Ajouter l'image à FormData
                    formData.append("title", titlePayload);
                    formData.append("category", categoryPayload);

                    // Check if an image with a similar figcaption already exists
                    let existingWorks = gallery.querySelectorAll("figure");

                    // Convert existingWorks NodeList to an array
                    let existingWorksArray = Array.from(existingWorks);

                    // Check if the work with the same title already exists
                    let workAlreadyExists = existingWorksArray.some(existingWork => {
                        let existingTitle = existingWork.querySelector("img").alt;
                        console.log(existingTitle)
                        console.log(formData.title)
                        return existingTitle === title;
                    });
                        if (!workAlreadyExists) {
                            addNewWork(tokenPayload, formData, title)
                        }
                    formData = new FormData()

                modalAddBtnIsReady.disabled = false
                resetFormState()
            } catch (error) {
                console.log("Error while adding work: ", error);
                resetFormState()
            } finally {
                // Remove the event listener to prevent memory leaks
                modalAddBtnIsReady.removeEventListener("click", modalAddBtnActionListener);
                titleInput.removeEventListener("change", modalAddTitleListener);
                categoryInput.removeEventListener("change", modalAddCategoryListener);
                resetInputValues()
                let delAll = gallery.querySelectorAll("figure");
                delAll.forEach((figure) => {
                    figure.remove();
                });
                updatingGallery()
            }
        });
    } else {
        console.log(isSubmitting)
        let modalAddBtnIsReady = document.getElementById("modalImgAddedBtn")
        modalAddBtnIsReady.style.display = "none"

        let modalAddWorkBtnNotOk = document.getElementById("modalAddNotOk")
        modalAddWorkBtnNotOk.style.display = "block";

        resetFormState()
    }
}


async function addNewWork(tokenPayload, formData) {
    try {
        let addAction = fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { Authorization: tokenPayload },
            body: formData,
        });
        updatingGallery()
    } catch {
        console.log(error)
    }
}

function resetFormState() {
    isFormChecked = false;
    isSubmitting = false;
}

function resetInputValues() {
    let modalAddFormTitleInput = document.getElementById("title");
    let modalAddFormCategorySelect = document.getElementById("categorySelector");
    let modalImgAddBtn = document.querySelector(".modalImgAddBtn");
    
    let modalBtnAdd = document.getElementById("modalIntialAdd")
    modalBtnAdd.style.display = "block"
    
    let modalAddBtnIsReady = document.getElementById("modalImgAddedBtn")
    modalAddBtnIsReady.style.display = "none"

    // Reset input values
    modalAddFormTitleInput.value = "";
    modalAddFormCategorySelect.value = "0";
    modalImgAddBtn.value = ""; // Reset the file input

    // Reset the image preview
    let outputImgAdd = document.querySelector('.modalAddPageImg');
    outputImgAdd.src = "#";
    outputImgAdd.alt = "";
    outputImgAdd.id = "ImgWaitingAdd";

    let modalImgAddIconCtn = document.querySelector(".modalImgAddIconCtn")
    let modalAddBtnCtn = document.querySelector(".modalAddBtnCtn")
    let modalImgAddTxt = document.querySelector(".modalImgAddTxt")
    modalImgAddIconCtn.style.display = "flex"
    modalAddBtnCtn.style.display = "flex"
    modalImgAddTxt.style.display = "flex"

    let modalBodyAddDiv = document.querySelector(".modalBodyAddDiv")
    let modalBodyGallery = document.querySelector(".modalBodyGallery")

    modalBodyAddDiv.style.display = "none"
    modalBodyGallery.style.display = "grid"
}

async function removeDuplicateWorks(updatedWorks) {
    // Créer un tableau pour stocker les œuvres en double
    let duplicateWorks = [];

    // Créer un ensemble pour suivre les titres des œuvres
    let titleSet = new Set();

    // Identifier les œuvres en double
    for (let i = 0; i < updatedWorks.length; i++) {
        let currentWork = updatedWorks[i];

        // Si le titre est déjà dans l'ensemble, c'est un doublon
        if (titleSet.has(currentWork.title)) {
            duplicateWorks.push(currentWork);
        } else {
            titleSet.add(currentWork.title);
        }
    }

    // Supprimer les œuvres en double de l'API
    for (let i = 0; i < duplicateWorks.length; i++) {
        let duplicateWork = duplicateWorks[i];

        try {
            // Faire appel à fetch DELETE pour supprimer l'œuvre
            let token = getCookie("connectionCookie");
            let deleteAction = await fetch("http://localhost:5678/api/works/" + duplicateWork.id, {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    Authorization: "Bearer " + token,
                },
            });

            if (deleteAction.ok) {
                console.log("Duplicate work deleted:", duplicateWork.title);
            } else {
                console.log("Error deleting duplicate work:", deleteAction.status, deleteAction.statusText);
            }
            updatingGallery()
        } catch (error) {
            console.log("Error during duplicate work deletion:", error);
        }
    }
}

async function removeDuplicateWorksInGallery() {
    try {
        // Récupérer toutes les figures existantes dans la modalBodyGallery
        let existingFigures = document.querySelectorAll(".modalBodyGallery figure");

        // Créer un tableau pour stocker les figures en double
        let duplicateFigures = [];

        // Créer un ensemble pour suivre les alt des images
        let altSet = new Set();

        // Identifier les figures en double
        existingFigures.forEach(existingFigure => {
            let alt = existingFigure.querySelector("img").alt;

            // Si l'alt est déjà dans l'ensemble, c'est une figure en double
            if (altSet.has(alt)) {
                duplicateFigures.push(existingFigure);
            } else {
                altSet.add(alt);
            }
        });

        // Supprimer les figures en double de la modalBodyGallery
        duplicateFigures.forEach(duplicateFigure => {
            duplicateFigure.remove();
        });

        console.log("Duplicate figures removed in modalBodyGallery");
    } catch (error) {
        console.log("Error removing duplicate figures in modalBodyGallery:", error);
    }
}

async function updatingGallery() {
    try {
        // Mettre à jour la galerie
        let delAll = gallery.querySelectorAll("figure");
        delAll.forEach((figure) => {
            figure.remove();
        });

        let updatedWorksResponse = await fetch("http://localhost:5678/api/works");
        let updatedWorks = await updatedWorksResponse.json();

        // Supprimer les œuvres en double
        await removeDuplicateWorks(updatedWorks);

        // Mettre à jour la galerie après la suppression des doublons
        for (let i = 0; i < updatedWorks.length; i++) {
            let currentUpdatedWork = updatedWorks[i];

            let addFigure = document.createElement("figure");
            let addImg = document.createElement("img");

            addImg.src = currentUpdatedWork.imageUrl;
            addImg.alt = currentUpdatedWork.title;

            let figcaptionTxt = document.createElement("figcaption");
            figcaptionTxt.innerText = currentUpdatedWork.title;

            addFigure.appendChild(addImg);
            addFigure.appendChild(figcaptionTxt);
            gallery.appendChild(addFigure);
        }

        let currentWorks = Array.from(gallery.querySelectorAll("figure"));

        if (updatedWorks.length < currentWorks.length) {
            updatingGallery();
            console.log("Error while updating gallery, retrying");
        }

        loggedFetchData();
    } catch {
        console.log("Error fetching data while updating gallery");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    //While page is loaded, getting cookies
    let token = getCookie("connectionCookie");
    //Feature that has to be added later
    let userId = getCookie("userId")

    if (token) {
        let editionMode = document.querySelector(".editionMode")
        editionMode.style.display = "flex"

        let filterBar = document.querySelector(".filterBar")
        filterBar.style.display = "none"
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
        // Attachez les écouteurs d'événements une seule fois ici
        modalAddBtnActionListener = modalAddBtnAction.bind(null, token);
        modalAddTitleListener = modalAddBtnAction.bind(null, token);
        modalAddCategoryListener = modalAddBtnAction.bind(null, token);
    }
})