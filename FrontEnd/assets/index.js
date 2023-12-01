//fetching data

async function fetchData() {
    try {
      let categoriesResponse = await fetch("http://localhost:5678/api/categories");
      let worksResponse = await fetch("http://localhost:5678/api/works");
  
      let categories = await categoriesResponse.json();
      let works = await worksResponse.json();
  
      updateGallery(works);
      filterBarClick(categories, works)
    } catch (error) {
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
  function filterBarClick(categories, works) {
    let gallery = document.querySelector(".gallery");
    let allBtn = document.getElementById("allButton")
    let objBtn = document.getElementById("objectsButton")
    let aptBtn = document.getElementById("appartementsButton")
    let hRBtn = document.getElementById("hAndRButton")
    
    allBtn.addEventListener("click", () => {
        let delAll = document.querySelectorAll("figure:not(.presPicture)")
        delAll.forEach((figure) => {
            figure.remove();
        });
        updateGallery(works)
        }
    )
    objBtn.addEventListener("click", () => {
        let delAll = document.querySelectorAll("figure:not(.presPicture)");
        delAll.forEach((figure) => {
            figure.remove();
        });
    
        let categoriesID = categories[0].id;
    
        for (let i = 0; i < works.length; i++) {
            let newWork = works[i];
            let objWorks = newWork.categoryId;
    
            if (objWorks === categoriesID) {
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

  fetchData();
  