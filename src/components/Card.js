import React from "react";

export default function Card (props) {
    function handleClick() {
        props.onPreviewOpen(props.card);
    }
    return (
        <div className="elements__item"
              >
            <img src={props.card.link} className="elements__image" alt={props.card.name}
                 onClick={handleClick}
            />
            <div className="elements__trash"></div>
            <div className="elements__title-container">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__like-wrapper">
                    <button className="elements__like" type="button"></button>
                    <p className="elements__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}