import React from 'react';

const TVUrdu = () => {
  return (
    <div className='h-screen text-center flex items-center justify-center'>
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/6PqM5vszwmk?si=8L7kkYzZ22wykN58" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default TVUrdu;
