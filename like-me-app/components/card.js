import 'bulma/css/bulma.css'
import {useState} from "react"




export default function ProfileCard({displayName,profileImage,percentage,profilePage}){

    // Default pictures for users without a Spotify profile image 
    const defaultPictures = ['/character_1.png','/character_2.png','/character_3.png','/character_4.png','/character_5.png','/character_6.png','/character_7.png','/character_8.png',,'/character_9.png','/character_10.png']


    if(profileImage.length == 0 ){

        // Get a random number from 0 - 10 
        const randomNumber = Math.floor(Math.random() * 11); 
        profileImage = defaultPictures[randomNumber]


    }


    return(
        
        <div className="columns is-multiline is-vcentered is-mobile is-11">
            <div className="column is-one-fifth  box has-text-centered button" style={{margin:"0 auto",width:'154px',height:'auto'}}>
                <div className="has-text-centered ">
                
                    <a href={profilePage}  target="_blank">
                        <div>
                            <figure className="image is-128x128 image_placement">
                                <img src={profileImage} />
                            </figure>
                        </div>
                    </a>
                

                    
                    <div style={{marginTop:'1em'}}>
                        
                        <p className="has-text-weight-normal playlist_subtitles">{displayName}</p>
                        <p className="has-text-weight-bold playlist_subtitles percentage">{percentage}%</p>
                        
                    </div>

                </div>
            </div>    
        </div>
        
    )
}