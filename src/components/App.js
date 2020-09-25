import React from 'react';
import Header from './Header'
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { apiEntity } from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([apiEntity.getUserData(), apiEntity.getInitialCards()])
        .then(([result, data]) => {
          setCurrentUser(result);
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

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
    setSelectedCard(undefined);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(values) {
    apiEntity.saveUserData(values)
        .then(data => {
          setCurrentUser(data);
          closeAllPopups();
        })
        .catch(err => console.log(err));
  }

  function handleUpdateAvatar(link) {
    apiEntity.avatarChange(link)
        .then(data => {
          setCurrentUser(data);
          closeAllPopups();
        })
        .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    apiEntity.putLike(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleDeleteCard(card) {
    apiEntity.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id)
          setCards(newCards)
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleAddPlaceSubmit(inputs) {
    apiEntity.addCard(inputs)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onPreviewOpen={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
          />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm title="Вы уверены?" name="delete" button="Да"/>


          <ImagePopup card={selectedCard}
                      onClose={closeAllPopups}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
