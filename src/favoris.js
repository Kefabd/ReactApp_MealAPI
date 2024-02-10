import React, { useState, useEffect } from "react";
import Header from "./components/header";
import chunkArray from "./functionnal/chunck";
import { FaMinusSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import './favoris.css';


export default function Favorite() {

    const [result, setResult] = useState([]);
    const [favorites, setFavorites] = useState([]);



    const setLocal = () => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    const handleMinusClick = (element) => {
        setFavorites((prevFav) => {

            if (prevFav.some((fav) => (fav.idMeal == element.idMeal))) {
                const newFavorite = prevFav.filter((favorite) => favorite.idMeal !== element.idMeal);
                localStorage.setItem('favorites', JSON.stringify(newFavorite));
                return newFavorite;
            } else {
                console.log("non trouvé");
            }
        });
        setLocal();
    }

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem('favorites')));
        console.log(localStorage.getItem('favorites'));
        console.log("favoris");
    }, [])

    useEffect(() => {
        // Load favorites from local storage on component mount

        const promises = favorites.map((elem) => {
            return (
                <div className="col-sm-12 col-md-12 col-lg-4 my-2" key={elem.idMeal}>
                    <div className="card">
                        <img className="card-img-top img-fluid img_card" src={elem.strMealThumb} alt="Card image" />
                        <div className="card-body">
                            <h4 className="card-title"><i>{elem.strMeal}</i></h4>
                            <hr/>
                            <p className="card-text"><b>Id Meal</b>: <i>{elem.idMeal}</i></p>
                            <p className="card-text"><b>Origin</b>: <i>{elem.strArea}</i></p>
                            {elem.strTags != null ?
                                <p className="card-text"><b>Tags</b>: {elem.strTags}</p> : <p className="card-text"><b>Tags</b>: no tags</p>
                            }
                            <p className="card-text"><b>Categorie</b>: {elem.strCategory}</p>
                            <div className="card-foot">
                                <a href={elem.strYoutube} className="btn">
                                See in youtube <FaYoutube color='red' />
                            </a>
                            <div className="btnMinus" onClick={() => handleMinusClick(elem)}>
                                <FaMinusSquare color="red" size="1.5em" />
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            );
        })
        const chunkedElements = chunkArray(promises, 3);
        const rows = chunkedElements.map((chunk, index) => (
            <div className="row" key={index}>
                {chunk}
            </div>
        ));
        setResult(rows);


    }, [favorites]);

    return (
        <div>
            <Header />
            <div className="nothing"> hhhhhhhh</div>
            <div className="container">
                <div className='nbrResults'>
                    <p>Nombre de résultats: {favorites.length}</p>
                </div>
                <div className="favoris">
                    {result}
                </div>
            </div>
        </div>
    );

}