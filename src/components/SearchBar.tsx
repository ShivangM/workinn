'use client';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

const SearchBar = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget[0] as HTMLInputElement;
    if (!target.value) return toast.error('Please enter a search term');
    router.push(`/search/${target.value}`);
    target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-10 items-center">
      <input
        className="w-full h-full rounded-l-lg border-2 outline-none border-gray-700 px-4 py-2"
        placeholder="Type here to search.."
      />
      <button
        type="submit"
        className="bg-gray-800 flex items-center justify-center rounded-r-lg w-10 h-full p-2"
      >
        <ImSearch className=" text-white" />
      </button>
    </form>
  );
};

export default SearchBar;
