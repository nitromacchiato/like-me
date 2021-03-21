/*
    Access the users saved tracks from Spotify
    Method: GET 
    URL: https://api.spotify.com/v1/me/tracks


    Learn More: https://developer.spotify.com/console/get-current-user-saved-tracks/

*/ 




export const getSavedTracks = async (access_token, SAVED_TRACKS_ENDPOINT) => {

  return fetch(SAVED_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
