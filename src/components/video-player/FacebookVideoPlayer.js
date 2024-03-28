import React, { useEffect } from 'react';

const FacebookVideoPlayer = ({ videoUrl }) => {
  useEffect(() => {
    // Load Facebook SDK asynchronously
    window.fbAsyncInit = function() {
      FB.init({
        appId: 'your-app-id',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div className="fb-video" data-href={videoUrl} data-width="" data-show-text="false">
      <div className="fb-xfbml-parse-ignore">
        <blockquote cite={videoUrl}>
          <a href={videoUrl}>Video</a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookVideoPlayer;
