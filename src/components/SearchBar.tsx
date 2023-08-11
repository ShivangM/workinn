'use client';
import { ImSearch } from 'react-icons/im';
type Props = {};

const SearchBar = (props: Props) => {
  return (
    <form className="rounded-lg space-x-2 pr-2 bg-gray-800 flex items-center">
      <input
        className="w-full h-full border-2 outline-none border-gray-700 px-4 py-2"
        placeholder="Type here to search.."
      />
      <ImSearch className="w-5 h-5 text-white" />
    </form>
  );
};

export default SearchBar;
