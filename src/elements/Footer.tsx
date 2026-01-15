import { useLocation, useMatch } from 'react-router-dom';
import logo from '/logo.svg';

import { Github } from 'lucide-react';

const Footer = () => {
  const locationHome = useMatch('/');
  return (
    <>
      <footer
        className="flex justify-between items-center px-3 md:px-8 lg:px-10 bg-[#E7C7FF] dark:bg-[#0F001A] font-primary py-1 bottom-0 w-full select-none"
        style={{
          display: !locationHome ? 'none' : 'flex'
        }}
      >
        <div className="w-10 md:w-12">
          <a href="/">
            <img src={logo} alt="Prism Logo" />
          </a>
        </div>
        <div>
          <span className="md:text-xl text-sm">
            Copyright © Aman 2023 - Present
          </span>
        </div>
        <div>
          <a
            href="https://github.com/Aman-in-GitHub/Prism-WhereMoviesShine"
            target="_blank"
          >
            <Github className="scale-[1.2] md:scale-[1.5] active:scale-95 duration-500 hover:text-dark_purple md:hover:scale-[1.6]" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
