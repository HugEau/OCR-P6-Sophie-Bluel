// Function to fetch data from API
async function fetchData() {
    try {
        // Fetch categories and works data from API
        let categoriesResponse = await fetch("http://localhost:5678/api/categories");
        let worksResponse = await fetch("http://localhost:5678/api/works");

        // Convert response data to JSON
        let categories = await categoriesResponse.json();
        let works = await worksResponse.json();

        // Update the gallery and set up filter bar
        updateGallery(works);
        filterBarClick(categories, works);
    } catch (error) {
        // Handle any errors that occur during fetching
        console.error('Error fetching data:', error);
    }
}

// Function updating gallery with works via API
function updateGallery(works) {
    let gallery = document.querySelector(".gallery");
    let existingWorks = document.querySelectorAll("figure:not(.presPicture)");

    // Convert existingWorks NodeList to an array
    let existingWorksArray = Array.from(existingWorks);

    for (let i = 0; i < works.length; i++) {
        let newWork = works[i];

        // Check if the work with the same title already exists
        let workAlreadyExists = existingWorksArray.some(existingWork => {
            let existingTitle = existingWork.querySelector("img").alt;
            return existingTitle === newWork.title;
        });

        if (!workAlreadyExists) {
            // Create new figure element for each work and append to the gallery
            let newFigure = document.createElement("figure");
            let newImg = document.createElement("img");
            newImg.src = newWork.imageUrl;
            newImg.alt = newWork.title;

            let figcaptionTxt = document.createElement("figcaption");
            figcaptionTxt.innerText = newWork.title;

            newFigure.appendChild(newImg);
            newFigure.appendChild(figcaptionTxt);

            gallery.appendChild(newFigure);
        } else {
            console.log("Work with title already exists");
        }
    }
}

// Function to handle filter bar clicks
function filterBarClick(categories, works) {
    let gallery = document.querySelector(".gallery");
    let allBtn = document.getElementById("allButton")
    let objBtn = document.getElementById("objectsButton")
    let aptBtn = document.getElementById("appartementsButton")
    let hRBtn = document.getElementById("hAndRButton")

    // Event listener for 'All' button click
    allBtn.addEventListener("click", () => {
        // Remove all figures except those with class 'presPicture'
        let delAll = document.querySelectorAll("figure:not(.presPicture)")
        delAll.forEach((figure) => {
            figure.remove();
        });
        // Update the gallery with all works
        updateGallery(works)
    });

    // Event listener for 'Objects' button click
    objBtn.addEventListener("click", () => {
        // Remove all figures except those with class 'presPicture'
        let delAll = document.querySelectorAll("figure:not(.presPicture)");
        delAll.forEach((figure) => {
            figure.remove();
        });

        // Get the category ID for 'Objects'
        let categoriesID = categories[0].id;

        // Filter and display works with the selected category ID
        for (let i = 0; i < works.length; i++) {
            let newWork = works[i];
            let objWorks = newWork.categoryId;

            if (objWorks === categoriesID) {
                // Create new figure element for each filtered work and append to the gallery
                let newFigure = document.createElement("figure");
                let newImg = document.createElement("img");
                newImg.src = newWork.imageUrl;
                newImg.alt = newWork.title;

                let figcaptionTxt = document.createElement("figcaption");
                figcaptionTxt.innerText = newWork.title;

                newFigure.appendChild(newImg);
                newFigure.appendChild(figcaptionTxt);

                gallery.appendChild(newFigure);
            } else {
                console.log("Work ID does not match the filter");
            }
        }
    });

    // Similar event listeners for 'Apartments' and 'H&R' buttons
    
    aptBtn.addEventListener("click", () => {
        let delAll = document.querySelectorAll("figure:not(.presPicture)");
        delAll.forEach((figure) => {
            figure.remove();
        });
    
        let categoriesID = categories[1].id;
    
        for (let i = 0; i < works.length; i++) {
            let newWork = works[i];
            let aptWorks = newWork.categoryId;
    
            if (aptWorks === categoriesID) {
                let newFigure = document.createElement("figure");
                let newImg = document.createElement("img");
                newImg.src = newWork.imageUrl;
                newImg.alt = newWork.title;
    
                let figcaptionTxt = document.createElement("figcaption");
                figcaptionTxt.innerText = newWork.title;
    
                newFigure.appendChild(newImg);
                newFigure.appendChild(figcaptionTxt);
    
                gallery.appendChild(newFigure);
            } else {
                console.log("Work ID does not match the filter");
            }
        }
    });
    hRBtn.addEventListener("click", () => {
        let delAll = document.querySelectorAll("figure:not(.presPicture)");
        delAll.forEach((figure) => {
            figure.remove();
        });
    
        let categoriesID = categories[2].id;
    
        for (let i = 0; i < works.length; i++) {
            let newWork = works[i];
            let hRWorks = newWork.categoryId;
    
            if (hRWorks === categoriesID) {
                let newFigure = document.createElement("figure");
                let newImg = document.createElement("img");
                newImg.src = newWork.imageUrl;
                newImg.alt = newWork.title;
    
                let figcaptionTxt = document.createElement("figcaption");
                figcaptionTxt.innerText = newWork.title;
    
                newFigure.appendChild(newImg);
                newFigure.appendChild(figcaptionTxt);
    
                gallery.appendChild(newFigure);
            } else {
                console.log("Work ID does not match the filter");
            }
        }
    });
  }

// Initial data fetch and setup
fetchData();