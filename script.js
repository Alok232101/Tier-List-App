// document.addEventListener("DOMContentLoaded", function () {
//   console.log("JavaScript Started");
//   let currentDraggedItem;
//   let submit = document.getElementById("submit-name");
//   submit.addEventListener("click", (event) => {
//     event.preventDefault();
//     console.log(event);

//     const target = event.target;
//     console.log(target);

//     var tier_name_element = document.getElementById("tier_name");
//     var tier_name_value = tier_name_element.value;
//     console.log(tier_name_value);

//     if (tier_name_value === "") {
//       alert("Please enter a tier name!");
//       return;
//     }

//     createTierLists(tier_name_value);
//     tier_name_element.value = "";
//   });

//   // let submit_image = document.getElementById("submit-image");
//   // submit_image.addEventListener("click", (event) => {
//   //   event.preventDefault();
//   //   console.log(event);

//   //   const target = event.target;
//   //   console.log(target);

//   //   var tier_image_element = document.getElementById("tier_image");
//   //   var tier_image_url = tier_image_element.value;
//   //   console.log(tier_image_url);

//   //   if (tier_image_url === "") {
//   //     alert("Please enter a tier image Url!");
//   //     return;
//   //   }

//   //   createimage(tier_image_url);
//   //   tier_image_element.value = "";
//   // });

//   let submit_image = document.getElementById("submit-image");
//   submit_image.addEventListener("click", (event) => {
//     event.preventDefault();
//     console.log(event);

//     var tier_image_element = document.getElementById("tier_image");
//     var file = tier_image_element.files[0];
//     console.log(file);

//     if (!file) {
//       alert("Please select an image file!");
//       return;
//     }

//     const imageUrl = URL.createObjectURL(file);

//     createimage(imageUrl);
//     tier_image_element.value = ""; // reset input
//   });

//   // let click_input = document.getElementById("tier_name");
//   // click_input.addEventListener("click", () => {
//   //   click_input.value = "";
//   // });

//   const itemContainers = document.getElementsByClassName("tier_images");
//   console.log(itemContainers);

//   for (const itemContainer of itemContainers) {
//     setUpItemContainerForDrag(itemContainer);
//   }

//   const tierlists = document.querySelectorAll(".tier_list_item");
//   tierlists.forEach;

//   function setUpDropZoneInTierListItem(tierlists) {
//     tierlists.addEventListener("drop", (event) => {
//       event.preventDefault();
//     });
//     tierlists.addEventListener("dropover", (event) => {
//       console.log("Dragged over a drop zone");
//       event.target.appendChild(currentDraggedItem);
//     });
//   }

//   function setUpItemContainerForDrag(itemContainer) {
//     itemContainer.addEventListener("dragstart", (event) => {
//       console.log("Start dragging");
//       console.log(event.target);
//       console.log(event.target.parentNode);
//       currentDraggedItem = event.target.parentNode;
//     });
//   }

//   function createTierLists(tier_name_value) {
//     const newTierList = document.createElement("div");
//     newTierList.classList.add("tier_list");

//     const tier_list_heading = document.createElement("h2");
//     tier_list_heading.classList.add("tier_list_heading");
//     tier_list_heading.textContent = tier_name_value;

//     const tierListitems = document.createElement("div");
//     tierListitems.classList.add("tier_list_item");

//     newTierList.appendChild(tier_list_heading);
//     newTierList.appendChild(tierListitems);

//     const teardiv = document.getElementById("tier_lists_wrapper");
//     teardiv.appendChild(newTierList);

//     setUpDropZoneInTierListItem(tierListitems);
//   }

//   function createimage(tier_image_url) {
//     const newTierImage = document.createElement("div");
//     newTierImage.classList.add("tier_images");
//     newTierImage.setAttribute("draggable", true);

//     const tierImage = document.createElement("img");
//     tierImage.classList.add("tier_image");
//     // tierImage.setAttribute("src", tier_image_url);
//     tierImage.src = tier_image_url;

//     newTierImage.appendChild(tierImage);

//     const tearimgdiv = document.getElementById("tier_images_wrapper");
//     tearimgdiv.appendChild(newTierImage);

//     setUpItemContainerForDrag(newTierImage);
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript Started");

  //   document.addEventListener('dblclick', function(event) {
  //   const selectedText = window.getSelection().toString();
  //   if (selectedText) {
  //     const newText = prompt('Enter new text:', selectedText);
  //       console.log(`NewText ${newText}`);
  //   }
  // });

  const submit = document.getElementById("submit-name");
  const submit_image = document.getElementById("submit-image");
  const tier_name_element = document.getElementById("tier_name");
  const tier_image_element = document.getElementById("tier_image");
  const outer_image_wrapper = document.getElementById("tier_images_wrapper");
  const teardiv = document.getElementById("tier_lists_wrapper");
  // const tearimgdiv = document.getElementById("tier_images_wrapper");
  const img_empty_container = document.getElementById("cstm-empty-container");

  checkEmptycontainer();

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("List Name Submit Button", event);
    const tier_name_value = tier_name_element.value;
    console.log("List Name Value", tier_name_value);
    if (tier_name_value === "") {
      alert("Please enter a tier name!");
      return;
    }
    createTierLists(tier_name_value);
    tier_name_element.value = "";
  });

  submit_image.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("List image Submit Button", event);
    const file = tier_image_element.files[0];
    console.log("List Image", file);
    if (!file) {
      alert("Please select an image file!");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    createImage(imageUrl);
    tier_image_element.value = "";
  });

  outer_image_wrapper.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  outer_image_wrapper.addEventListener("drop", (event) => {
    console.log("Drop in outer image wrapper", event.target);
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedId);
    outer_image_wrapper.appendChild(draggedElement);

    checkEmptycontainer();
  });

  function addSpanInImgContainer() {
    const spandiv = document.createElement("span");
    spandiv.classList.add("img_container_heading");
    spandiv.innerHTML = "Empty Container";
    outer_image_wrapper.appendChild(spandiv);
  }

  function createTierLists(tier_name_value) {
    const newTierList = document.createElement("div");
    newTierList.classList.add("tier_list");

    const tier_list_heading = document.createElement("h2");
    tier_list_heading.classList.add("tier_list_heading");
    tier_list_heading.setAttribute("contenteditable", true);
    tier_list_heading.textContent = tier_name_value;

    const tierListitems = document.createElement("div");
    tierListitems.classList.add("tier_list_item");
    tierListitems.textContent = "";

    const remove_btn = document.createElement("div");
    remove_btn.classList.add("tier_list_remove");
    remove_btn.innerHTML = `<svg fill="#000000" height="40px" width="40px" viewBox="0 0 27.965 27.965" xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982
                                C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78
                                l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782
                                c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"/>
                            </g>
                          </svg>`;
    remove_btn.style.display = "none";

    newTierList.appendChild(tier_list_heading);
    newTierList.appendChild(tierListitems);
    newTierList.appendChild(remove_btn);

    teardiv.appendChild(newTierList);

    tierListitems.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    tierListitems.addEventListener("drop", (event) => {
      event.preventDefault();
      const draggedId = event.dataTransfer.getData("text/plain");
      const draggedElement = document.getElementById(draggedId);

      if (draggedElement) {
        tierListitems.appendChild(draggedElement);
      }

      if (tierListitems.children.length > 0) {
        remove_btn.style.display = "block";
      }

      checkEmptycontainer();
    });

    remove_btn.addEventListener("click", function () {
      tierListitems.innerHTML = "";
      remove_btn.style.display = "none";
    });

    const observer = new MutationObserver(() => {
      if (tierListitems.children.length === 0) {
        remove_btn.style.display = "none";
      }
    });
    observer.observe(tierListitems, { childList: true });
  }

  function createImage(imageUrl) {
    const newTierImage = document.createElement("div");
    newTierImage.setAttribute("draggable", true);
    newTierImage.classList.add("tier_images");

    const uniqueId = `tier-image-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
    newTierImage.id = uniqueId;

    const tierImage = document.createElement("img");
    tierImage.classList.add("tier_image");
    tierImage.src = imageUrl;

    newTierImage.appendChild(tierImage);

    // tearimgdiv.appendChild(newTierImage);
    outer_image_wrapper.appendChild(newTierImage);

    newTierImage.addEventListener("dragstart", (event) => {
      console.log("Dragging Start");
      console.log("Dragging Item", newTierImage);
      event.dataTransfer.setData("text/plain", newTierImage.id);
    });

    setTimeout(function () {
      checkEmptycontainer();
    }, 0);
  }

  function checkEmptycontainer() {
    if (outer_image_wrapper.children.length > 1) {
      img_empty_container.textContent = "";
    } else {
      img_empty_container.textContent = "Empty Container";
    }
  }
});
