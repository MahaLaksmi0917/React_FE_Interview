import React, { useEffect, useState } from "react";

function ProgressiveImage({ width, height, src, placeHolderSrc }) {
  const [imgSrc, setImgSrc] = useState(placeHolderSrc || src);
  const customLoadingClass = imgSrc === placeHolderSrc ? "loading" : "loaded";

  useEffect(() => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, []);
  return (
    <div>
      <img
        width={width}
        height={height}
        src={imgSrc}
        className={customLoadingClass}
      />
    </div>
  );
}

export default ProgressiveImage;
