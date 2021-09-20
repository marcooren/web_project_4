const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//edit button
const editProfileButton = document.querySelector(".profile__edit-button");

//**
const addCardButton = document.querySelector(".profile__add-button");

//Cards
const list = document.querySelector(".cards__list");


const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//popup
const editProfileModel = document.querySelector(".popup_type_edit-profile");
//**
const addCardModel = document.querySelector(".popup_type_add-card");

//Close buttons
const editModelCloseButton = editProfileModel.querySelector(
  ".popup__close-button"
);
//**
const addCardModelCloseButton = addCardModel.querySelector(
  ".popup__close-button"
);

//Form
const editProfileForm = editProfileModel.querySelector(".form");
//**
const addCardForm = addCardModel.querySelector(".form");

//Input name
const profileNameInput = editProfileModel.querySelector(
  ".form__input_type_name"
);
//Input job
const profileJobInput = editProfileModel.querySelector(".form__input_type_job");
//**
const cardTitleInput = addCardModel.querySelector(
  ".form__input_type_card-title"
);
const cardLinkInput = addCardModel.querySelector(".form__input_type_card-link");

//profile data
const userNameElement = document.querySelector(".profile__name");
const userJobElement = document.querySelector(".profile__job");

//remove popup_open class
const closePopup = function (model) {
  model.classList.remove("popup_open");
};

//add popup_open class
const openPopup = (model) => {
  model.classList.add("popup_open");

};

//*******************************************************************************************************************************************************


const figureModel = document.querySelector(".popup_type_image");
  const figureCloseButton = figureModel.querySelector(".popup__close-button");

  figureCloseButton.addEventListener("click", () => {
    closePopup(figureModel);
  });


const generateCard = (cardData) => {
  const listItem = cardTemplate.cloneNode(true);
  const imageElement = listItem.querySelector(".card__image");
  const deleteButton = listItem.querySelector(".card__delete");
  const title = listItem.querySelector(".card__title");
  const like = listItem.querySelector(".card__like");

  
  // Image  setup
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  // Title  setup
  title.textContent = cardData.name;

  /** Delete Property click Event **/
  deleteButton.addEventListener("click", () => {
    const card = deleteButton.closest(".card");
    card.remove();
  });
  /** Like Property click Event **/
  like.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });
  /** Image  click Event **/
  imageElement.addEventListener("click", () => {
    const img = figureModel.querySelector(".popup__image");
    const caption = figureModel.querySelector(".popup__caption");
    img.src = cardData.link;
    img.alt = cardData.name;
    caption.textContent = cardData.name;
    openPopup(figureModel);
  });

 

  list.prepend(listItem);
};

initialCards.forEach(generateCard);

//**********************************************************************************************************************************

const editProfileFormSubmit = (evt) => {
  evt.preventDefault(); //stop regular submit
  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  closePopup(editProfileModel);
};

//*********************************************************************************
const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  generateCard({ name: cardTitleInput.value, link: cardLinkInput.value });
  closePopup(addCardModel);
  //reset
  addCardForm.reset();
};

//open
editProfileButton.addEventListener("click", () => {
  openPopup(editProfileModel);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
});

//**************************************
addCardButton.addEventListener("click", () => {
  openPopup(addCardModel);
});

//close
editModelCloseButton.addEventListener("click", () => {
  closePopup(editProfileModel);
});
//************************** */
addCardModelCloseButton.addEventListener("click", () => {
  closePopup(addCardModel);
});

//submit
editProfileForm.addEventListener("submit", editProfileFormSubmit);
//****************************************** */
addCardForm.addEventListener("submit", addCardFormSubmit);
