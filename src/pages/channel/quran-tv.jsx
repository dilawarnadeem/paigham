import React from 'react';

const QuranTV = () => {
  return (
    <div className='h-[280px] md:h-screen text-center flex items-center justify-center'>
      <iframe style={{ width: '800px', height: '600px' }} allowFullScreen src="https://sscsott.com/qurantv/embed.html"></iframe>
    </div>
  );
}

export default QuranTV;
