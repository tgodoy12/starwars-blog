import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import starwars from "../../img/icons8-la-guerra-de-las-galaxias-50.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const nav = useNavigate();

	//para controlar que no se superpongan los dropdowns
	const [addDropdownOpen, setAddDropdownOpen] = useState(false);
    const [favoritesDropdownOpen, setFavoritesDropdownOpen] = useState(false);

    const handleAddDropdown = () => {
        setAddDropdownOpen(!addDropdownOpen);
        if (favoritesDropdownOpen) setFavoritesDropdownOpen(false);
    };

    const handleFavoritesDropdown = () => {
        setFavoritesDropdownOpen(!favoritesDropdownOpen);
        if (addDropdownOpen) setAddDropdownOpen(false);
    };

	
	const handleNavigate = (type) => {
        nav(`/add/${type}`);
    };
	
	// console.log(store.favorites);
	return (
		<nav className="navbar sticky-top navbar-dark bg-black mb-5 p-0">

			<div className="container">
				<div className="icon">
					<button onClick={() => nav("/")} className="button-with-image">
						<img src={starwars} alt="Star Wars" />
					</button>
				</div>

				<div className="d-flex">
					<div className={`dropdown ${store.favorites.length > 0 ? 'me-5' : 'me-3'}`}>
						<button className="btn btn-dark btn-sm dropdown-toggle position-relative" data-bs-auto-close="true" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" 
						aria-expanded={addDropdownOpen ? "true" : "false"} onClick={handleAddDropdown}>
							<i className="fas fa-plus" style={{color: "FFFFFF"}}></i>
						</button>
						<ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
							<li className="dropdown-item d-flex fs-6 fw-lighter" onClick={() => handleNavigate('planets')}>Planets</li>
							<li className="dropdown-item d-flex fs-6 fw-lighter" onClick={() => handleNavigate('characters')}>Characters</li>
							<li className="dropdown-item d-flex fs-6 fw-lighter" onClick={() => handleNavigate('vehicles')}>Vehicles</li>
						</ul>
						
					</div>

					{/* Likes (orange heart) dropdown button */}
					<div className="dropdown">
						<button className="btn btn-dark btn-sm dropdown-toggle position-relative" data-bs-auto-close="true" type="button" id="dropdownMenuButton2" 
						data-bs-toggle="dropdown" aria-expanded={favoritesDropdownOpen ? "true" : "false"}
						onClick={handleFavoritesDropdown}>
							<i className="fas fa-heart" style={{color: "#fca311"}}></i>

							{/* badge que muestra store.favorites.length */}
							{store.favorites.length > 0 && (
							<span className="position-absolute top-50 end-100 translate-middle rounded-pill badge border border-light text-bg-light">
								{store.favorites.length}
								<span className="visually-hidden"></span>
							</span>
							)}
						</button>
						
						{/* map de store.favorites para la lista del dropdown y empty en caso de ser 0 */}
						<ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
						{store.favorites.length === 0 ? (
							<li className="dropdown-item d-flex justify-content-center fs-6 fst-italic fw-lighter">( Empty )</li>
						) : (
						
							store.favorites.map((item, index) => (
								<li className="dropdown-item d-flex justify-content-between" key={index}>
									{item}
									<button type="button" onClick={() => actions.likes(item)} className="btn btn-sm ms-3 btn-outline-secondary">
										<i className="fas fa-trash"></i></button></li>
							))
							)}
							
							
						</ul>
					</div>
				</div>
				
				
			</div>

		</nav>
	);
};
