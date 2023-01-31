import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const [usesHeader, setUsesHeader] = useState(false);
  const [usesSearchIcon, setUsesSearchIcon] = useState(false);
  const [title, setTitle] = useState('');

  if (history.path === '/foods') {
    setUsesHeader(true);
    setUsesSearchIcon(true);
    setTitle('Foods');
  } if (history.path === '/drinks') {
    setUsesHeader(true);
    setUsesSearchIcon(true);
    setTitle('Drinks');
  } if (history.path === '/profile') {
    setUsesHeader(true);
    setTitle('Profile');
  } if (history.path === '/done-recipes') {
    setUsesHeader(true);
    setTitle('Done Recipes');
  } if (history.path === '/favorite-recipes') {
    setUsesHeader(true);
    setTitle('Favorite Recipes');
  }
  return (
    <div>
      <img data-testid="profile-top-btn" src="src/images/profileIcon.svg" alt="profile" />
      <button type="button" onClick={ history.push('/profile') }>Perfil</button>
      {usesSearchIcon && <img
        data-testid="search-top-btn"
        src="src/images/searchIcon.svg"
        alt="search icon"
      />}
      {title && <h2 data-testid="page-title">{title}</h2>}
    </div>
  );
}

export default Header;
