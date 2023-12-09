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
        // A VOIR MODIFIER BTN IMG ADD => INPUT IMAGE
        let modalImgAddDiv = document.createElement("div")
        modalImgAddDiv.className = "connect modalImgAddDiv"

        let modalImgAddIconCtn = document.createElement("div")
        modalImgAddIconCtn.className = "connect modalImgAddIconCtn"
        modalImgAddDiv.appendChild(modalImgAddIconCtn)
        
        let modalImgAddIcon = document.createElement("i")
        modalImgAddIcon.className = "fa-regular fa-image fa-2xl"
        modalImgAddIconCtn.appendChild(modalImgAddIcon)
        modalImgAddDiv.appendChild(modalImgAddIconCtn)

        let modalImgAddBtn = document.createElement("button")
        modalImgAddBtn.className = "connect modalImgAddBtn"
        modalImgAddBtn.innerHTML = "+ Ajouter photo"
        modalImgAddDiv.appendChild(modalImgAddBtn)

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
            modalAddFormCategoryOption.value = categoriesArray[i].name
            modalAddFormCategoryOption.innerHTML = categoriesArray[i].name
            modalAddFormCategoryOption.id = categoriesArray[i].id
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
}

function modalContentAdd(works) {
    // Add modal content
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
        modalAddInterface()
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
            let token = getCookie("connectionCookie");
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
                    let deleteResponse = await deleteAction.json();
                    console.log(deleteResponse)
                    if (deleteResponse.message === 'Item Deleted') {
                        let deleteFigure = document.getElementById(deleteId)
                        deleteFigure.remove()
                    }
                } catch(error) {
                    console.log("Error while removing work : " + error)
                }
            })
            console.log("Modal content added");
        } else {
            console.log("Modal: Work with title already exists");
        }
    }
}

function modalAddInterface() {
    // create add interface
    // Do not display gallery
    let modalGallery = document.querySelector(".modalBodyGallery");
    modalGallery.style.display = "none";
    
    let modalBodyTxt = document.querySelector(".modalBodyTxt")
    modalBodyTxt.innerHTML = "Ajout photo"
    
    let modalAdd = document.querySelector(".modalBodyAddDiv")
    modalAdd.style.display = "flex"
    
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