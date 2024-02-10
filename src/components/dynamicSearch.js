import React, { useState, useEffect } from 'react';
import { FaYoutube } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import chunkArray from '../functionnal/chunck';



function DynamicSearch(props) {

  const [elements, setElements] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleStarClick = (element) => {

    // Toggle the star's selection state
    setFavorites((prevSelected) => {

      // Check if the star's ID is already in the selectedStars array
      if (prevSelected.some((star) => star.idMeal === element.idMeal)) {
        const newFavorite = prevSelected.filter((star) => star.idMeal !== element.idMeal);
        localStorage.setItem('favorites', JSON.stringify(newFavorite));
        return newFavorite;
        // If already selected, remove it
        return prevSelected.filter((star) => star.idMeal !== element.idMeal);
      } else {
        const newFavorite2 = [...prevSelected, element];
        localStorage.setItem('favorites', JSON.stringify(newFavorite2));
        // If not selected, add it
        return newFavorite2;
      }
    });
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')));
    console.log(localStorage.getItem('favorites'));
    console.log("Home");
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const promises = props.array.map(async (elem) => {
        // const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${elem}`);
        // const data = await response.json();
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
                <div className='card-foot'>
                    <a href={elem.strYoutube} className="btn">
                  See in youtube <FaYoutube color='red' />
                </a>
                <a className="btn2" onClick={() => handleStarClick(elem)}>
                  {JSON.parse(localStorage.getItem('favorites')).some((star) => star.idMeal === elem.idMeal) ? <FaStar size="1.5em" /> : <FaRegStar size="1.5em" />}

                </ a>
                </div>
              
              </div>
            </div>
          </div>

        );
      });

      const resolvedElements = await Promise.all(promises);

      const chunkedElements = chunkArray(resolvedElements, 3);
      const rows = chunkedElements.map((chunk, index) => (
        <div className="row" key={index}>
          {chunk}
        </div>
      ));

      setElements(rows);
    };

    fetchData();
  }, [props.array, props.searchTerm, favorites]);

  return <div>{elements}</div>;
};

export default DynamicSearch;
