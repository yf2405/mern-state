import { FaSearch } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm smm:text-xl flex flex-wrap">
            <span className="text-slate-500">YerFe</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <div className="sm:hidden">
          {/* Botón de menú hamburguesa */}
          <RxHamburgerMenu
            className="text-slate-600 cursor-pointer"
            onClick={handleToggleMenu}
          />
          {/* Menú lateral desplegable */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={handleToggleMenu}>HOLA</div>
          )}
          <div
            className={`fixed inset-y-0 right-0 z-50 bg-white w-64 p-4 transform ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Contenido del menú lateral */}
            <ul className="flex flex-col gap-4">
              <li>
                <Link className='sm:inline text-slate-700 hover:underline' to="/">Home</Link>
              </li>
              <li className='sm:inline text-slate-700 hover:underline'>
                <Link to="/about">About</Link>
              </li>
             
              <Link to='/profile'>
                {currentUser ? (
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                ) :(<li className=' text-slate-700 hover:underline'>Sign in</li>)}
             
              </Link>  
            </ul>
            {/* Botón para cerrar el menú lateral */}
            <div className="mt-4">
              <button onClick={handleToggleMenu} className="text-slate-600">
                Close Menu
              </button>
            </div>
          </div>
        </div>
        {/* Menú en pantallas grandes */}
        <ul className='flex gap-4 hidden sm:flex'>
                       <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                        </Link>
                        <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                        </Link>
                         <Link to='/profile'>
                        {currentUser ?(<img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>):(<li className=' text-slate-700 hover:underline'>Sign in</li>)
                        }
                       
                       
                        </Link>  
                    </ul>
      </div>
    </header>
  );
}

