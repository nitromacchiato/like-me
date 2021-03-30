  
import { connect, ReplSet } from "mongodb"
import { connectToDatabase } from "../../util/mongodb"
import { getRefreshToken } from "../../lib/refreshToken"
import { getUserInfo } from "../../lib/getCurrentUserInfo"
import { getSavedTracks } from "../../lib/getSavedTracks"
import { match } from "../../lib/match"


async function GenerateSongsArray(accessToken){

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
    console.log('Succefully Generated Songs Array')

    return tracks
}






export default async function handler(req,res){

    // Retrieve the code from the query 
    const code = req.body['code']
    const key = process.env.LIKE_ME_API_KEY 



    if(key === process.env.LIKE_ME_API_KEY ){
        //STATUS LOG - SUCCESSFULY CONNECTED TO API 
        console.log('Connected to API')

        // Create a connection to mongodb 
        const {db} = await connectToDatabase();

        // Generate a new access and refresh token using our code given during authroization 
        const getToken = await getRefreshToken(code)
        const accessToken = await getToken['access_token']

        // STATUS LOG - TOKEN 
        console.log('Successfully Generated an Access Token')

        // Retrieve User Information 
        const getUser = await getUserInfo(accessToken)
        const user = await getUser.json()


        // Detailed User Info 
        const display_name = await user['display_name']
      
        // See if the user already exist in the database 
        const exist = await db.collection('users').find({'user': display_name}).count() > 0;
        
        console.log('Does the user exist in the database:',exist)

        if(exist != true){

            // User Profile Picture 
            let image = user['images'][0]['url'] 
            if(image === undefined){
                image = '/user.png'
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
            console.log('Succefully Generated Songs Array')
        
        
            
            // FIND MATCHES 
            const results = await match(tracks)

            // STATUS LOG - FOUND MATCHES 
            console.log('Succefully Found Matches')
            

            // Upload to database 
            const data = await db.collection('users').insertOne({user:display_name,profile:profilePage,image:image,songs:tracks,matches:results});

            // STATUS LOG - DATABASE UPDATE 
            console.log('Successfully Uploaded User To Database')
            console.log('SENDING RESULTS....')


            res.send(results);

        } else {

            console.log('User Already Exist')

            const userDatabaseInfo = await db.collection('users').find({'user': display_name}).toArray()
            const userDatabaseSongs = await userDatabaseInfo[0]['songs']
            const userDatabaseMatches = await userDatabaseInfo[0]['matches']
            const userName = await userDatabaseInfo[0]['user']
            const currentSongs = await GenerateSongsArray(accessToken)
            


            /*
                Will generate new matches and 
                Updates the database if the user has made changes to their saved songs library
                Limitations - User could end up making edits on songs array but still have the same length 
                Best option would be to compare each match to see if there are any new songs id added 
                OR
                to do it by date comparison and creating a date entry row 
            */ 
            
            if(userDatabaseSongs.length != currentSongs.length){

                // STATUS LOG ---- UPDATING DATABASE WITH NEW SONGS ARRAY
                console.log('Library of Songs Has Been Changed')
                console.log('Generating New Matches')

                // Generate Matches 
                const results = await match(currentSongs)

                // STATUS LOG - FOUND MATCHES 
                console.log('Succefully Found Matches')

                // Upload to database 
                const NewSongsDataUpload = await db.collection('users').updateOne({'user':userName},{$set:{songs:currentSongs}})
                const NewMatchesDataUpload = await db.collection('users').updateOne({'user':userName},{$set:{matches:results}})

                // STATUS LOG - DATABASE UPDATE 
                console.log('Successfully Uploaded User To Database')


                // Return matches to client side 
                res.send(results)

            } else {

                // Send previous matches if songs array is the same 
                res.send(userDatabaseMatches) 
            }
            
        }

    } else {

        res.json({error:'Invalid Application Key'})
        
    }
    
}