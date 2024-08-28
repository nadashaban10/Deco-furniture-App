import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pageNumber, setPageNumber, totalItem, perPage, btnShowItem }) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItem / perPage);

  // Determine the start and end page numbers for the pagination buttons
  let startPage = Math.max(1, pageNumber - Math.floor(btnShowItem / 2));
  let endPage = Math.min(totalPages, startPage + btnShowItem - 1);

  // Adjust startPage if endPage is less than btnShowItem
  if (endPage - startPage + 1 < btnShowItem) {
    startPage = Math.max(1, endPage - btnShowItem + 1);
  }

  // Create pagination buttons
  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          onClick={() => setPageNumber(i)}
          className={` ${
            pageNumber === i
              ? "bg-[#BC9B80] shadow-lg shadow-indigo-300/50 text-black"
              : "bg-[#BC9B8] hover:bg-[#FAF9F7] shadow-lg hover:shadow-indigo-500/50 hover:text-black text-black]"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}
          key={i}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPages && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;

// pageNumber: The current page number.
// setPageNumber: A function to update the current page number.
// totalItem: The total number of items.
// perPage: The number of items per page.
// btnShowItem: The number of pagination buttons to display.