import React from "react";
import { useState, useEffect } from "react";

export default function Filtre({ onCategorySelect, onOrigin }) {
    const [SelectedCategory, setSelectedCategory] = useState(null);
    const [Origin, setOrigin] = useState(null);


    const fetchData = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            return data.categories;
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // or handle the error in some way
        }
    };


    const handleCategorySelect = (category) => {
        console.log(category)
        setSelectedCategory(category);
        onCategorySelect(category); // Notify the parent component about the selected category
    };

    const handleAllCategory = () => {
        onOrigin(null);
        onCategorySelect(null);
        setSelectedCategory(null);
        setOrigin(null);
    }

    const handleOrigin = (e) => {
        console.log(e);
        onOrigin(e);
        setOrigin(e);
    }

    const CreateCategory = () => {

        const [categories, setCategories] = useState([]);

        useEffect(() => {
            const fetchCategories = async () => {
                const result = await fetchData();
                setCategories(result);
            };

            fetchCategories();
        }, []);
        return (
            <ul>
                {categories.map((category) => (
                    <li key={category.strCategory} className="dropdown-item" onClick={() => handleCategorySelect(category)}>{category.strCategory}</li>
                ))}
            </ul>)
    }
    return (
        <div className="container">
            <div className="filtre">
                <div>
                    <button className="btn all" onClick={() => handleAllCategory()}>All</button>
                </div>
                <div>
                    <button type="button" className="btn  dropdown-toggle categorie" data-bs-toggle="dropdown">
                        Categorie
                    </button>
                    <ul className="dropdown-menu">
                        {CreateCategory()}
                    </ul>
                </div>

                <div>
                    <button type="button" class="btn  dropdown-toggle" data-bs-toggle="dropdown">
                        Oringine
                    </button>
                    <form class="dropdown-menu">
                        <input type="text" className="dropdown-item" placeholder="Entrer le pays" onChange={(e) => handleOrigin(e.target.value)} />
                    </form>
                </div>
            </div>
        </div>
    )
}