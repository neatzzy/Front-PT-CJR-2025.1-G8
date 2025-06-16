import React from 'react';
import Image from 'next/image';


const FeedUserHeader = () => {
  return (
    <header
      className="bg-[#a4fed3] w-full py-2 px-4 flex flex-row flex-wrap justify-between items-center h-[10%]"
    >
      <div className="flex items-center mr-5 h-full w-auto">
        <Image
          src="/image/UnbLogo.png"
          alt="LogoUnB"
          width={60}
          height={60}
        />
      </div>
      <a href="/login">
        <button
          className="bg-[#00ABED] text-white px-5 py-2 border-2 border-white rounded-full cursor-pointer text-[1.2rem] transition-colors duration-300 h-full min-w-[35px] w-fit"
        >
          Login
        </button>
      </a>
    </header>
  );
};

export default FeedUserHeader;
