import logo from '/logo.svg';
import { ModeToggle } from '@/components/mode-toggle';
import { NavLink, useLocation } from 'react-router-dom';
import { SearchButton } from './SearchButton';

const Navbar = () => {
  const locationPlayer = useLocation().pathname.includes('/player');

  function navLinkStyles({ isActive }) {
    return {
      color: isActive ? 'white' : '',
      padding: '6px 15px',
      backgroundColor: isActive ? '#9D4EDD' : '',
      borderRadius: isActive ? '2px' : ''
    };
  }
  return (
    <nav
      className="font-secondary flex justify-between items-center px-2 backdrop-blur-[4px] fixed top-0 w-full md:px-8 lg:px-10 select-none z-50 dark:bg-[#000000] dark:bg-opacity-10"
      style={{
        display: locationPlayer ? 'none' : null
      }}
    >
      <div className="w-16 md:w-20">
        <a href="/">
          <img src={logo} alt="Prism Logo" />
        </a>
      </div>
      <div className="text-base md:text-xl flex items-center gap-10 lg:gap-10 font-semibold text-dark_purple">
        <NavLink to="/" style={navLinkStyles}>
          Home
        </NavLink>

        <SearchButton />
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
