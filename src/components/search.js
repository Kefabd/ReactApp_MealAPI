// const staticData = 
// import Buildelement from "./elementSearch"
import React, { useState, useEffect } from 'react';
import BuildElement from './staticSearch';
import DynamicSearch from './dynamicSearch';
import Filtre from './filtre';


const Meals = ["Ayam Percik", "Bakewell tart", "Callaloo Jamaican Style"];

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [Origin, setOrigin] = useState(null);

    const fetchData = (value, category, origin) => {
        if (!Number(value)) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (category) {
                        const filtredData = data.meals.filter((dt) => dt.strCategory === category.strCategory)

                        if (origin) {
                            const DoubleFiltredData = filtredData.filter((Ddt) => Ddt.strArea.toLowerCase().startsWith(origin.toLowerCase()));
                            setSearchResults(DoubleFiltredData);
                            return;
                        }
                        setSearchResults(filtredData);
                        return;
                    }
                    if (origin) {
                        const DoubleFiltredData = data.meals.filter((Ddt) => Ddt.strArea.toLowerCase().startsWith(origin.toLowerCase()));
                        setSearchResults(DoubleFiltredData);
                        return;
                    }

                    setSearchResults(data.meals)
                });
        } else {
            console.log("nombre");
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Number(value)}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (category) {
                        const filtredData = data.meals.filter((dt) => dt.strCategory === category.strCategory)

                        if (origin) {
                            const DoubleFiltredData = filtredData.filter((Ddt) => Ddt.strArea.toLowerCase().startsWith(origin.toLowerCase()));
                            setSearchResults(DoubleFiltredData);
                            return;
                        }
                        setSearchResults(filtredData);
                        return;
                    }
                    if (origin) {
                        const DoubleFiltredData = data.meals.filter((Ddt) => Ddt.strArea.toLowerCase().startsWith(origin.toLowerCase()));
                        setSearchResults(DoubleFiltredData);
                        return;
                    }

                    setSearchResults(data.meals)
                });
        }

    }


    const handleSearch = (e) => {
        console.log(e, Number(e));
        setSearchTerm(e);
        fetchData(e, selectedCategory, Origin);
    }


    useEffect(() => {
        fetchData(searchTerm, selectedCategory, Origin);
    }, [selectedCategory, Origin])


    useEffect(() => {
        setSelectedCategory(null);
        setOrigin(null);
    }, [searchTerm])


    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        console.log(category);
        // Add logic to filter the search results based on the selected category
        // You may need to make another API call or filter the existing results based on the category
        // Update the setSearchResults with the filtered results
    };

    const handleOrigin = (origin) => {
        setOrigin(origin);
        console.log(origin);
        // Add logic to filter the search results based on the selected category
        // You may need to make another API call or filter the existing results based on the category
        // Update the setSearchResults with the filtered results
    };



    return (

        <div className="search" id='Search'>
            <div className="separator"></div>
            <form>
                <input type="text" placeholder="Search for meals" onChange={(e) => handleSearch(e.target.value)} />
                {/* <input type="submit" value="Search" /> */}
            </form>
            <Filtre onCategorySelect={handleCategorySelect} onOrigin={handleOrigin} />
            <div className="container">

                {searchTerm === '' ?
                    <>
                        <div className='nbrResults'>
                            <p>Most popular</p>
                        </div>
                        <BuildElement array={Meals} category={selectedCategory} Origin={Origin} />
                    </> :
                    (searchResults == null ?
                        <>
                            <div className='nbrResults'>
                                <p>Nombre de résultats: 0</p>
                                <p>Aucun résultat n'est trouvé</p>
                            </div>
                        </> :
                        <>
                            <div className='nbrResults'>
                                <p>Nombre de résultats: {searchResults.length}</p>
                            </div>
                            <DynamicSearch array={searchResults} searchTerm={searchTerm} />
                        </>
                    )
                }
            </div>

        </div>

    )

}