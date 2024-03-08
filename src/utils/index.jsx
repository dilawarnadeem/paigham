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

