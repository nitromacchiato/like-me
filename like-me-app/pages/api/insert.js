import { connect } from "mongodb"
import { connectToDatabase } from "../../util/mongodb"
import { getRefreshToken } from "../../lib/refreshToken"
import { getUserInfo } from "../../lib/getCurrentUserInfo"
import { getSavedTracks } from "../../lib/getSavedTracks"





export default async function handler(req,res){

    // Retrieve the code from the query 
    const code = req.body['code']

    // Generate a new access and refresh token using our code given during authroization 
    const getToken = await getRefreshToken(code)
    const accessToken = await getToken['access_token']

    // STATUS LOG - TOKEN 
    console.log('Generated an Access Token')

    // Retrieve User Information 
    const getUser = await getUserInfo(accessToken)
    const user = await getUser.json()


    // Detailed User Info 
    const display_name = user['display_name']
    //const external_urls = user['external_urls']['spotify']
    let image = user['images']
    if(image === undefined){
        image = "../../public/img/user.png"
    }
    const profilePage = `https://open.spotify.com/user/${display_name}`


    // STATUS LOG - USER INFORMATION 
    console.log('Generated User Info')


    // Get the users saved tracks and save them into an array 
    const tracks = []

    let SAVED_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/tracks`;
    const getTracks = await getSavedTracks(accessToken,SAVED_TRACKS_ENDPOINT)
    const trackItems = await getTracks.json()

    const totalTracks = await trackItems['total']
    const nextTrackSet = await trackItems['next'] // url to next 20 songs || will be null if list is empty 
    const listofTracks = await trackItems['items'] // list of songs 


    // Adds each song id to the list of tracks 
    listofTracks.map((song) => {

        // Get the song ID 
        const songURI = song['track']['uri'].split(':')[2]

        // Add the songURI to the array if it's not already in it 
        if(tracks.includes(songURI) == false){
            tracks.push(songURI)
        }
        
    })


    // Set variables to track links 
    let links = []
    let count = 50; 

    // Generates all the links to get the first 10,0000 saved songs from the user or their total tracks 
    // Whichever comes first 
    while (count <= totalTracks ){

        let nextLink = `https://api.spotify.com/v1/me/tracks?limit=50&offset=${count}`;
        links.push(nextLink);
        count = count + 50;

    }


    // Make a request to every link to get all the sets of songs and save them onto the array of tracks 
    let requestCount = 0; 
    while (requestCount < links.length){

        let SAVED_TRACKS_ENDPOINT = links[requestCount];
        const getTracks = await getSavedTracks(accessToken,SAVED_TRACKS_ENDPOINT)
        const trackItems = await getTracks.json()
    
        const totalTracks = await trackItems['total']
        const nextTrackSet = await trackItems['next'] // url to next 20 songs || will be null if list is empty 
        const listofTracks = await trackItems['items'] // list of songs 
    
        // Adds each song id to the list of tracks 
        listofTracks.map((song) => {
    
            // Get the song ID 
            const songURI = song['track']['uri'].split(':')[2]
    
            // Add the songURI to the array if it's not already in it 
            if(tracks.includes(songURI) == false){
                tracks.push(songURI)
            }
            
        })
        requestCount = requestCount + 1 
    }

    // STATUS LOG - USER INFORMATION 
    console.log('Songs Fully Uploaded')
 
    // Create a connection to mongodb 
    const {db} = await connectToDatabase();
    // Connect to listings and review
    const data = await db.collection('users').insertOne({user:display_name,profile:profilePage,image:image,songs:tracks});

    // STATUS LOG - DATABASE UPDATE 
    console.log('User Uploaded To Database')
   
    res.json(data);
}