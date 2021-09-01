
//edit buttonm
const editProfileButton = document.querySelector(".profile__edit-button");


//Cards
const list = document.querySelector(".cards__list");


//popup
const editProfileModel = document.querySelector(".popup_type_edit-profile");


//Close buttons
const editModelCloseButton = editProfileModel.querySelector(".popup__close-button");

//Form
const editProfileForm = editProfileModel.querySelector(".form");


//Input name
const profileNameInput = editProfileModel.querySelector(".form__input_type_name");
//Input job
const profileJobInput = editProfileModel.querySelector(".form__input_type_job");


//profile data
const userNameElement = document.querySelector(".profile__name");
const userJobElement = document.querySelector(".profile__job");

//remove popup_open class
const closePopup = function (model) {
    model.classList.remove("popup_open");
};



//add popup_open class
const openPopup = function (model) {
    model.classList.add("popup_open");
};



//add event listener to all like buttons in cards
const like = list.querySelectorAll(".card__like");
//console.log(like);
for (i = 0; i < like.length; i++) {
    like[i].addEventListener("click", function (event) {
        event.target.classList.toggle("card__like_active");
    });
}



const editProfileFormSubmit = function (event) {
    event.preventDefault();//stop regular submit
    userNameElement.textContent = profileNameInput.value;
    userJobElement.textContent = profileJobInput.value;
    closePopup(editProfileModel);
};


//open
editProfileButton.addEventListener("click", function () {
    openPopup(editProfileModel);
    profileNameInput.value = userNameElement.textContent;
    profileJobInput.value = userJobElement.textContent;
});


//close
editModelCloseButton.addEventListener("click", function () {
    closePopup(editProfileModel);
});


//submit
editProfileForm.addEventListener("submit", editProfileFormSubmit);
