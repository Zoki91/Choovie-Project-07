// SCRIPT/EVENT LISTENER FOR MODAL

const modal = document.querySelector(".myListModal");

const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelector(".show-modal");
const myList = document.querySelector("#myList");
console.log(btnsOpenModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

myList.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", closeModal);
