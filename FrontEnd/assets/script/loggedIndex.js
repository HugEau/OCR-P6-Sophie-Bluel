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
        modalAddFormCategoryOption.value = "Sélectonnez une catégorie de travail"
        modalAddFormCategoryOption.innerHTML = ""
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
        this.location.reload();
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
    } else {
        let modalAddBtn = document.querySelector(".modalAddBtn")
        modalAddBtn.innerHTML = "Ajouter une photo"
        modalAddBtn.id = "modalIntialAdd"
    }
    //Add new work feature
    let modalAddBtn = document.querySelector(".modalAddBtn")
    modalAddBtn.addEventListener("click", () => {
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
                    console.log(deletePayload)
                    let deleteAction = await fetch("http://localhost:5678/api/works/"+ deleteId, {
                        method: "DELETE",
                        headers: {accept: "*/*", Authorization: deletePayload },
                    });
                    
                    if (deleteAction.ok) {
                        let deleteFigure = document.getElementById(deleteId)
                        deleteFigure.remove()
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

    let modalFooterBtn = document.querySelector(".modalAddBtn")
    modalFooterBtn.id = "modalAddNotOk"
    modalFooterBtn.innerHTML = "Valider"
    
    let modalAdd = document.querySelector(".modalBodyAddDiv")
    modalAdd.style.display = "flex"

    modalAddBtnAction(token)

    let modalAddPageReturn = document.querySelector(".modalBtnReturn")
    modalAddPageReturn.id = "modalAddPageReturn"

    modalAddPageReturn.addEventListener("click", () => {
        modalGallery.style.display = "grid";

        modalBodyTxt.innerHTML = "Galerie photo";

        modalFooterBtn.innerHTML = "Ajouter une photo";

        modalAdd.style.display = "none"

        modalAddPageReturn.id = ""
        modalHeader.id = ""

        let modalAddBtn = document.querySelector(".modalAddBtn")
        modalAddBtn.id = "modalIntialAdd"

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

    })
}

//Is form ok
function modalAddBtnAction(token) {
    let imageInput = document.querySelector(".modalAddPageImg");
    let imageInputSaver = document.querySelector(".modalImgAddBtn")
    let titleInput = document.getElementById("title");
    let categoryInput = document.getElementById("categorySelector");
    let modalAddWorkBtn = document.querySelector(".modalAddBtn");

    // Vérifier que toutes les valeurs ne sont pas nulles
    imageInput.addEventListener("load", checkForm);
    titleInput.addEventListener("change", checkForm);
    categoryInput.addEventListener("change", checkForm);

    function checkForm() {
        let image = imageInput.id;
        let imageSrc = imageInputSaver.files[0];
        let title = titleInput.value;
        let category = categoryInput.value;
        console.log(category)
        // Vérifier que l'image, le titre et la catégorie sont définis avant de continuer
        if (image !== "modalImgWaitingAdd" && title !== "" && category !== "") {
            let AddPayload = [
                {
                    "image": imageSrc,
                    "title": title,
                    "category": category
                }
            ];
            isFormOk(AddPayload, token);
        } else {
            modalAddWorkBtn.id = "modalAddNotOk";
        }
    }
}

let isSubmitting = false; // Variable pour suivre l'état de soumission

function isFormOk(AddPayload, token) {
    let image = AddPayload[0].image;
    let title = AddPayload[0].title;
    let category = AddPayload[0].category;
    
    // Vérifiez les conditions spécifiques avant de changer l'ID du bouton
    if (image !== null && title !== null && category !== null && category !== "Sélectonnez une catégorie de travail" && !isSubmitting) {
        // Toutes les valeurs sont non nulles et aucune soumission en cours, afficher le payload dans la console
        let modalAddWorkBtn = document.querySelector(".modalAddBtn");
        modalAddWorkBtn.id = "modalImgAddedBtn";

        // Prémice de commande d'envoi de travaux
        modalAddWorkBtn.addEventListener("click", async () => {
            try {
                isSubmitting = true; // Définir l'état de soumission à true

                let tokenPayload = "Bearer " + token;
                console.log(tokenPayload);

                let formData = new FormData();
                formData.append("image", image); // Ajouter l'image à FormData
                formData.append("title", title);
                formData.append("category", category);

                let addAction = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: { Authorization: tokenPayload },
                    body: formData,
                });
                let addResponse = await addAction.json();
                console.log(addResponse);

            } catch (error) {
                console.log("Error while adding work: ", error);
            } finally {
                isSubmitting = false; // Réinitialiser l'état de soumission à false
                window.location.reload()
            }
        });
    } else {
        let modalAddWorkBtn = document.querySelector(".modalAddBtn");
        modalAddWorkBtn.id = "modalAddNotOk";
    }
}


document.addEventListener("DOMContentLoaded", function() {
    //While page is loaded, getting cookies
    let token = getCookie("connectionCookie");
    let userId = getCookie("userId")

    if (token) {
        let editionMode = document.querySelector(".editionMode")
        editionMode.style.display = "flex"
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