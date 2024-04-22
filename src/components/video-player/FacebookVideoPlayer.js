import React, { useEffect } from 'react';

const FacebookVideoPlayer = ({videoUrl}) => {
  const link  = videoUrl?.replace('https://www.facebook.com/watch/?v=', '')
  useEffect(() => {
    // Load Facebook SDK for JavaScript asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [link]);

  return (
    <div id="fb-root">
      {/* Your embedded video player code */}
      <div className="fb-video" data-href={`https://www.facebook.com/facebook/videos/${link}`} data-width="500" data-show-text="false">
        <div className="fb-xfbml-parse-ignore">
          <blockquote cite={`https://www.facebook.com/facebook/videos/${link}`}>
            <a href={`https://www.facebook.com/facebook/videos/${link}`}>Facebook video</a>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default FacebookVideoPlayer;
