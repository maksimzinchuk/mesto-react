import React from 'react';
import '../index.css';
import Header from './Header'
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    cardSelected: false,
    cardName: '',
    cardLink: ''
  });

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      cardSelected: false,
      cardName: '',
      cardLink: ''
    });
  }
  function handleCardClick (card) {
    setSelectedCard({
      cardSelected: true,
      cardName: card.name,
      cardLink: card.link
    });
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onPreviewOpen={handleCardClick}
        />
        <PopupWithForm title="Редактировать профиль"
                       name="profile"
                       button="Сохранить"
                       isOpen={isEditProfilePopupOpen}
                       onClose={closeAllPopups}>
          <>
            <div className="form__field">
              <input
                  className="popup__profile popup__profile_name form__input"
                  name="name"
                  minLength="2"
                  maxLength="40"
                  required
              />
              <span className="form__input-error"></span>
            </div>
            <div className="form__field">
              <input
                  className="popup__profile popup__profile_label form__input"
                  minLength="2"
                  maxLength="200"
                  name="about"
                  required
              />
              <span className="form__input-error"></span>
            </div>
          </>
        </PopupWithForm>
        <PopupWithForm title="Новое место"
                       name="add"
                       button="Создать"
                       isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}>
          <>
            <div className="form__field">
              <input
                  className="popup__profile popup__profile_name form__input"
                  name="name"
                  placeholder="Название"
                  minLength="1"
                  maxLength="30"
                  required
              />
              <span className="form__input-error"></span>
            </div>
            <div className="form__field">
              <input
                  className="popup__profile popup__profile_label form__input"
                  name="link"
                  placeholder="Ссылка на картинку"
                  type="url"
                  required
              />
              <span className="form__input-error"></span>
            </div>
          </>
        </PopupWithForm>

        <PopupWithForm title="Обновить аватар"
                       name="avatar"
                       button="Сохранить"
                       isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}>
          <>
            <div className="form__field">
              <input
                  className="popup__profile popup__profile_label form__input"
                  name="link"
                  placeholder="Ссылка на аватар"
                  type="url"
                  required
              />
              <span className="form__input-error"></span>
            </div>
          </>
        </PopupWithForm>

        <PopupWithForm title="Вы уверены?" name="delete" button="Да"/>


        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
