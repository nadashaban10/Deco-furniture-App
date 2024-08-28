import React from "react";

const BackDrops = () => {
  const style = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "90",
    position: "fixed",
    top: "0",
    left: "0",
  };
  return <div style={style}></div>;
};

export default BackDrops;
