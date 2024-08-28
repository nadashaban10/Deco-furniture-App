import React from "react";

const CategoryList = ({ name, key }) => {
  return (
    <li
      key={key}
      className="flex justify-start m-[10px] relative hover:translate-x-3 transition-all duration-500 gap-2 items-center py-[6px] px-[24px]"
    >
      {name}
      {/* <Link className="block">{category.name}</Link> */}
    </li>
  );
};

export default CategoryList;
