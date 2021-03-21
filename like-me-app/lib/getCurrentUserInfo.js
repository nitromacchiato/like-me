/*
    Access the users profile information using the Spotify API 
    Method: GET 
    URL: https://api.spotify.com/v1/me


    Learn More: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
    

*/ 


const USER_INFO_ENDPOINT = `https://api.spotify.com/v1/me`;

export const getUserInfo = async (access_token) => {

  return fetch(USER_INFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
