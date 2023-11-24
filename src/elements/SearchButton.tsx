import { Search } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchButton() {
  const navigate = useNavigate();
  const searchRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    navigate(`search/${searchRef.current}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer duration-300 scale-125 md:active:scale-90 hover:text-light_purple md:hover:scale-125 outline-none border-none ">
          <Search />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <form className="flex items-center" onSubmit={(e) => handleSubmit(e)}>
          <div className="grid flex-1">
            <label htmlFor="link" className="sr-only">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1 font-normal outline-none border focus:ring-dark_purple focus:ring-2 rounded-[1px] text-lg w-[97%]"
              style={{
                background: 'transparent'
              }}
              onChange={(e) => (searchRef.current = e.target.value)}
              defaultValue=""
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                className="cursor-pointer scale-125 duration-200 active:scale-100"
                type="submit"
              >
                <Search />
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
