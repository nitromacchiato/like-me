import 'bulma/css/bulma.css'


export default function ProfileCard({displayName,profileImage,percentage,profilePage}){
    return(
        
        <div className="columns is-multiline is-vcentered is-mobile is-11">
            <div className="column is-one-fifth  box has-text-centered button" style={{margin:"0 auto",width:'154px',height:'180px'}}>
                <div className="has-text-centered ">
                    <button href={profilePage}>
                        <div>
                            <figure className="image is-128x128 image_placement">
                                <img src={profileImage} />
                            </figure>
                        </div>
                    </button>
                    
                    <div>
                        <p className="has-text-weight-light playlist_subtitles">{displayName}</p>
                        <p className="has-text-weight-light playlist_subtitles">{percentage}</p>
                    </div>

                </div>
            </div>    
        </div>
        
    )
}

