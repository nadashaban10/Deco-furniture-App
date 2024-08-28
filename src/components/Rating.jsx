import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ rating, size = 24 }) {
  return (
    <>
      {rating >= 1 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStar size={size} />
        </span>
      ) : rating >= 0.5 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStarHalfAlt size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          {" "}
          <CiStar size={size} />
        </span>
      )}
      {rating >= 2 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStar size={size} />
        </span>
      ) : rating >= 1.5 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStarHalfAlt size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          {" "}
          <CiStar size={size} />
        </span>
      )}
      {rating >= 3 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStar size={size} />
        </span>
      ) : rating >= 2.5 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStarHalfAlt size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          {" "}
          <CiStar size={size} />
        </span>
      )}
      {rating >= 4 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStar size={size} />
        </span>
      ) : rating >= 3.5 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStarHalfAlt size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          {" "}
          <CiStar size={size} />
        </span>
      )}
      {rating >= 5 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStar size={size} />
        </span>
      ) : rating >= 4.5 ? (
        <span className="text-[#EDBB0E]">
          {" "}
          <FaStarHalfAlt size={size} />
        </span>
      ) : (
        <span className="text-slate-600">
          {" "}
          <CiStar size={size} />
        </span>
      )}
    </>
  );
}

export default Rating;
