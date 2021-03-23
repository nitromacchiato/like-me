import { connectToDatabase } from "../util/mongodb"


/* 
    A simple brute force is used to generate match percentages. 

    A better approach would be to use $setIntersection provided by MongoDB and make the queries on their end but this feature 
    is only avaliable to paid tiers 
    Learn More: https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/#exp._S_setIntersection

*/ 

export async function match(songsArray){

    // Create a connection to mongodb 
    const {db} = await connectToDatabase();

    // FIND MATCHES 
    const Users = await db.collection('users').find({}).toArray()

    // Find highest matches from the users in the database 
    let matches = []

    Users.map((user) => {

        // Set User Information 
        const displayName = user['user']
        const profilePage = user['profile']
        const profileImage = user['image']
        const tracks = user['songs']


        // Compare Songs to User 
        const songMatchCount = []
        songsArray.some(song => {
            let isInList = tracks.includes(song)

            if(isInList === true ){
                songMatchCount.push(isInList)
            }  
        })


        // Calculate percentage match 
        const percentage = (songMatchCount.length / songsArray.length) * 100 
        

        // Profile Compiled 
        const userArray = [displayName,profilePage,profileImage,percentage]

        // Pushes matches to the array 

        if(matches.length > 20 ){
            
            matches.forEach(function (value,i){

                // Percentage in match array  
                const savedPercentage = value[3]


                // Removes percentage if the current one is larger 
                if(savedPercentage < userArray[3]){
                    matches.splice(i,1)
                    matches.push(userArray)
                }

            });


        } else {
            matches.push(userArray)
        }


    })

    return matches
}