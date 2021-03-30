import 'bulma/css/bulma.css'


function CheckForProfileImage(profileImage){
    // Gets the "https:" of the profile image url 
    // Ex. https://i.scdn.co/image/ab6775700000ee85ead44ce2dca6cc9b369b2ee6 turns into "https:"
    const https = profileImage.split(':')[0]

    if(https === "https"){
        return profileImage
    } else {
        return "/user.png"
    }

}



export default function ProfileCard({displayName,profileImage,percentage,profilePage}){

    const SetProfilePicture = async function(){
        return CheckForProfileImage(profileImage)
    }




    return(
        
        <div className="columns is-multiline is-vcentered is-mobile is-11">
            <div className="column is-one-fifth  box has-text-centered button" style={{margin:"0 auto",width:'154px',height:'180px'}}>
                <div className="has-text-centered ">
                
                    <a href={profilePage}  target="_blank">
                        <div>
                            <figure className="image image_placement">
                                <img style={{maxWidth:'auto',maxHeight:'170px'}} src={SetProfilePicture} />
                            </figure>
                        </div>
                    </a>
                

                    
                    <div style={{marginTop:'1em'}}>
                        
                        <p className="has-text-weight-light playlist_subtitles">{displayName}</p>
                        <p className="has-text-weight-light playlist_subtitles percentage">{percentage}%</p>
                        
                    </div>

                </div>
            </div>    
        </div>
        
    )
}