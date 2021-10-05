//initial 6 cards array
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

//Open
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
//Card
const list = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const editProfileModel = document.querySelector(".popup_type_edit-profile");
const addCardModel = document.querySelector(".popup_type_add-card");
//Close
const editModelCloseButton = editProfileModel.querySelector(
  ".popup__close-button"
);
const addCardModelCloseButton = addCardModel.querySelector(
  ".popup__close-button"
);

const model=document.querySelector(".popup_type_image");
const figureCloseButton = model.querySelector(".popup__close-button");
figureCloseButton.addEventListener("click", () => {
  closePopup(model);
});


const editProfileForm = editProfileModel.querySelector(".form");
const addCardForm = addCardModel.querySelector(".form");

const profileNameInput = editProfileModel.querySelector(
  ".form__input_type_name"
);
const profileJobInput = editProfileModel.querySelector(".form__input_type_job");
const cardTitleInput = addCardModel.querySelector(
  ".form__input_type_card-title"
);
const cardLinkInput = addCardModel.querySelector(".form__input_type_card-link");

const userNameElement = document.querySelector(".profile__name");
const userJobElement = document.querySelector(".profile__job");

const resetInputData = (model) => {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
};

const closePopupKeydown = (evt) => {
  if (evt.key === "Escape") {
    const active = document.querySelector(".popup_open");
    closePopup(active);
  }
};

const closePopupClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const closePopup = (model) => {
  model.removeEventListener("click", closePopupClick);
  model.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupKeydown);
};

const openPopup = (model) => {
  model.addEventListener("click", closePopupClick);
  model.classList.add("popup_open");
  document.addEventListener("keydown", closePopupKeydown);
};

const imagePropertySetup = (cardData, imageElement) => {
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
};

const deleteCard = (deleteButtonElement) => {
  deleteButtonElement.addEventListener("click", () => {
    const card = deleteButtonElement.closest(".card");
    card.remove();
  });
};

const createLike = (likeElement) => {
  likeElement.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });
};

const createFigurePopup = (imageElement, figureModel, cardData) => {
  imageElement.addEventListener("click", () => {
    const img = figureModel.querySelector(".popup__image");
    const caption = figureModel.querySelector(".popup__caption");
    img.src = cardData.link;
    img.alt = cardData.name;
    caption.textContent = cardData.name;
    openPopup(figureModel);
  });

};

const generateCard = (cardData) => {
  const listItem = cardTemplate.cloneNode(true);
  const imageElement = listItem.querySelector(".card__image");
  const deleteButton = listItem.querySelector(".card__delete");
  const title = listItem.querySelector(".card__title");
  const like = listItem.querySelector(".card__like");
  const figureModel = document.querySelector(".popup_type_image");

  imagePropertySetup(cardData, imageElement);
  title.textContent = cardData.name;
  deleteCard(deleteButton);
  createLike(like);
  createFigurePopup(imageElement, figureModel, cardData);

  return listItem;
};

const renderCard = (cardItem) => {
  list.prepend(generateCard(cardItem));
};

initialCards.forEach((cardItem) => {
  renderCard(cardItem);
});

const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({ name: cardTitleInput.value, link: cardLinkInput.value });
  closePopup(addCardModel);
  addCardForm.querySelector(".form__button").disabled=true;
  addCardForm.querySelector(".form__button").classList.add("form__button_inactive");
  addCardForm.reset();
};

const editProfileFormSubmit = (evt) => {
  evt.preventDefault();
  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  closePopup(editProfileModel);
};

editProfileButton.addEventListener("click", () => {
  openPopup(editProfileModel);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModel);
 
});

editModelCloseButton.addEventListener("click", () => {
  closePopup(editProfileModel);
});

addCardModelCloseButton.addEventListener("click", () => {
  closePopup(addCardModel);
 
});

editProfileForm.addEventListener("submit", editProfileFormSubmit);
addCardForm.addEventListener("submit", addCardFormSubmit);
