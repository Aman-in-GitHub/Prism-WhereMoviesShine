import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <section className="px-2 md:px-8 lg:px-10 h-screen font-primary flex justify-center items-center select-none">
      <div className="font-bold flex items-center flex-col gap-5">
        <h2 className="text-8xl md:text-[150px]">404 :(</h2>
        <h3 className="text-2xl md:text-4xl">Page not found</h3>
        <Link to="/">
          <button
            className="bg-dark_purple hover:bg-light_purple duration-300 active:scale-95 md:text-2xl px-4 py-3 rounded-[2px]"
            style={{
              color: 'white'
            }}
          >
            Go To Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Error404;
