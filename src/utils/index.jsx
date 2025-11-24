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
     slidesToShow: 6,
     slidesToScroll: 1,
     initialSlide: 0,
     centerMode: true,
     responsive: [
      {
        breakpoint: 1880,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1520,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        }
      },
       {
         breakpoint: 1124,
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


   const reorderDays = (days) => {
  const order = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Get today’s weekday
  const todayIndex = new Date().getDay(); 
  // JS: 0=Sun, 1=Mon...
  const mappedToday = todayIndex === 0 ? 6 : todayIndex - 1; // convert so Monday=0

  const todayName = order[mappedToday];

  // Reorder: today → rest
  const sorted = [
    ...days.filter((d) => d.node.name === todayName),
    ...days.filter((d) => d.node.name !== todayName),
  ];

  return { sorted, todayName };
};
