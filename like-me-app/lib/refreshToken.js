/*

    Generate a refresh token with the access token generated when the user authroizes the application.
    
    **

    ALL CODE BELOW WAS PROVIDED BY LeeRob and his article Spotify API Next.js 

    S/O To LeeRob for the amazing article and example code 
    Check his article out for messing around with the Spotify API with Next.js 

    LINK: https://leerob.io/blog/spotify-api-nextjs

    ***

*/ 



import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export async function getRefreshToken(token) {


    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
        grant_type: 'authorization_code',
        code: token,
        redirect_uri: redirect_uri ,
        })
    });

  return response.json();
};
