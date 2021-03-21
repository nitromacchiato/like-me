import { connect } from "mongodb"
import { connectToDatabase } from "../../util/mongodb"
import { getRefreshToken } from "../../lib/refreshToken"
import { getUserInfo } from "../../lib/getCurrentUserInfo"
import { getSavedTracks } from "../../lib/getSavedTracks"

export default async function handler(req,res){

    // Retrieve the code from the query 
    //const code = "AQDLtmcZrgJy3aMD9lsJTA_Ib_qQ7kJhEWEfCOYuaiDolM1UWLumcIFoi9gmwzsolzHi7ige4_Z9eNPiSaCcrYhSmwugYJQ9r3pADpZg2JXJ71cslGnC0D_YK1js65L6klR3PK8dxuTuwdGSEB3JVs0ZKVKmqf0UtE8qkexH_hN-jJV1SjDOVOZvuxWJ4_xWKkjg6qltc-onuEP_alGJbeqMcIX3RotiM42S7yMrath6r9Gt"
    // Generate a new access and refresh token using our code given during authroization 
    //const getToken = await getRefreshToken(code)
    //const accessToken = await getToken['access_token']
    //console.log(getToken)
    //const accessToken = "AQCJBfSqyM8ZW_6MI7j2S68178Yi25ZclZPX-ki-haE9xF7ff_9UvdCL8V1S6DdsWiSIs6SE2pAi-xUChQxM9D8xB8KnF01ILOQTjtR1byirpOD7uXGc1-Ms6Y74FXZxS30"
    const accessToken = "BQBgbbW6wK73pHAFjIIQKpPmQV4-MnYiQ9o5mOWNuPrjywx-Il4IzEhUVY6dciVQWHjoFY-MSME5XeL9wlvdguWDEkL1Ak9IwgoLRD1Gh7-ZSCPgral6_U_R8tBxllvhyTAlsgbG8trOIMShSJHRgLPgk_O-2QO2swY"
   

    // Retrieve User Information 
    const getUser = await getUserInfo(accessToken)
    const user = await getUser.json()


    // Detailed User Info 
    const display_name = user['display_name']
    //const external_urls = user['external_urls']['spotify']
    const image = user['images']


    // Get the users saved tracks and save them into an array 
    const tracks = []

    const SAVED_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/tracks`;
    const getTracks = await getSavedTracks(accessToken,SAVED_TRACKS_ENDPOINT)
    const trackItems = await getTracks.json()

    const nextTrackSet = await trackItems['next'] // url to next 20 songs 
    const listofTracks = await trackItems['items'] // list of songs 
    

    listofTracks.map(song => {
        const TrackURI = song['track']['uri'].split(':')[2]
        tracks.push(TrackURI)

    })



    console.log(tracks.length)




    // Get the track URI from track items 
    //const spotifyURI = await trackItems['items'][3]['track']['uri'].split(':')[2]
    // tracks.push(spotifyURI) // Push to array 


    
    

    // Create a connection to mongodb 
    //const {db} = await connectToDatabase();

    // Connect to listings and review
    //const data = await db.collection('users').insertOne();

    res.json({name:'Andy'});
}