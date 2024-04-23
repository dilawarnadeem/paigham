export const getVideoCode=(link) => {
     link = link?.replace("https://www.youtube.com/watch?v=", "")
     if(link?.includes('=PL')){
          return link?.split("&")[0]
     }else if(link?.includes('facebook')){
          link = link?.replace("https://www.facebook.com/watch?v=", "")
          return {
               link,
               type:'facebook'
          }
     }else{    
          return link
     }

}


export var sliderSettings = {
     dots: false,
     infinite: false,
     arrows: false,
     speed: 500,
     slidesToShow: 4,
     slidesToScroll: 1,
     initialSlide: 0,
     responsive: [
      {
        breakpoint: 1520,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        }
      },
       {
         breakpoint: 1024,
         settings: {
           slidesToShow: 3,
           slidesToScroll: 1,
           infinite: true,
         }
       },
       {
         breakpoint: 600,
         settings: {
           slidesToShow: 2,
           slidesToScroll: 1,
           initialSlide: 2
         }
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1
         }
       }
     ]
   };
