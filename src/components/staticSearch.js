import React, { useState, useEffect } from 'react';
import { FaYoutube } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";




function BuildElement(props) {

  const [elements, setElements] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //const fv = JSON.parse(localStorage.getItem('favorites')).map((fvElem) => { return fvElem.idMeal })


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

  // useEffect(() => {
  //   console.log(localStorage.getItem('favorites'))
  //   console.log("home");
  // })

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')));
    console.log(localStorage.getItem('favorites'));
    console.log("Home");
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const promises = props.array.map(async (elem) => {
        const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${elem}`);
        const dataToFilter = await response.json();
        var data = null;
        if (props.category) {

          if (dataToFilter.meals[0].strCategory === props.category.strCategory) {
            data = dataToFilter;

          } else {
            return;
          }
        }
        if (props.Origin) {

          if (dataToFilter.meals[0].strArea.toLowerCase().startsWith(props.Origin.toLowerCase())) {
            data = dataToFilter;
          } else {
            return;
          }

        }
        data = dataToFilter;


        return (
          <div className="col-sm-12 col-md-12 col-lg-4 my-2" key={data.meals[0].idMeal}>
            <div className="card">
              <img className="card-img-top img-fluid img_card" src={data.meals[0].strMealThumb} alt="Card image" />
              <div className="card-body">
                <h4 className="card-title"><i>{data.meals[0].strMeal}</i></h4>
                <hr/>
                <p className="card-text"><b>Id Meal</b>: <i>{data.meals[0].idMeal}</i></p>
                <p className="card-text"><b>Origin</b>: <i>{data.meals[0].strArea}</i></p>
                {data.meals[0].strTags != null ?
                  <p className="card-text"><b>Tags</b>: {data.meals[0].strTags}</p> : <p className="card-text"><b>Tags</b>: no tags</p>
                }
                <p className="card-text"><b>Categorie</b>: {data.meals[0].strCategory}</p>
                <div className='card-foot'>
                  <a href={data.meals[0].strYoutube} className="btn">
                  See in youtube <FaYoutube color='red' />
                </a>
                <a className="btn2" onClick={() => handleStarClick(data.meals[0])}>
                  {favorites.some((star) => star.idMeal === data.meals[0].idMeal) ? <FaStar size="1.5em" /> : <FaRegStar size="1.5em" />}

                </a>
                </div>
                
              </div>
            </div>
          </div>

        );
      });

      const resolvedElements = await Promise.all(promises);
      setElements(resolvedElements);
    };

    fetchData();

  }, [favorites, props.category, props.Origin]);

  return <div className='row'>{elements}</div>
};

export default BuildElement;
