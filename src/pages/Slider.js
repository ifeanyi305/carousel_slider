import React, { useState, useEffect, useRef } from 'react';
import { cards } from './data';

const Slider = () => {
  const contents = cards;
  const boxRef = useRef(null);
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);

  const handlePrev = () => {
    const box = boxRef.current;
    if (box) {
      const width = box.clientWidth;
      box.scrollLeft -= width;
    }
  };

  const handleNext = () => {
    const box = boxRef.current;
    if (box) {
      const width = box.clientWidth;
      box.scrollLeft += width;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const box = boxRef.current;
      if (box) {
        setPrevDisabled(box.scrollLeft === 0);
        setNextDisabled(box.scrollLeft + box.clientWidth >= box.scrollWidth);
      }
    };

    const box = boxRef.current;
    if (box) {
      box.addEventListener('scroll', handleScroll);
      return () => {
        box.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-center text-[30px] my-4">carousel slider</h1>
      <div className="flex items-center gap-2 ">
        <button
          onClick={handlePrev}
          disabled={isPrevDisabled}
          type="button"
          className={`px-2 py-[4px] border-[#000] bg-gray-400 border-[1px] rounded-[50%] ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          &larr;
        </button>
        <div className="flex gap-2 swiper-wrapper overflow-x-auto xscrollbar" ref={boxRef}>
          {contents.map((content, index) => (
            <div key={index} className="border-[1px] min-w-[285px] border-[#000] w-full my-2 rounded-[5px]">
              <img alt="content_img" src={content.img} className="w-full h-[150px]" />
              <p className="p-2 text-[20px] font-extrabold">{content.title}</p>
              <p className="p-2 text-[18px]">{content.desc}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          type="button"
          className={`px-2 py-[4px] border-[#000] border-[1px] bg-gray-400 rounded-[50%] ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Slider;
