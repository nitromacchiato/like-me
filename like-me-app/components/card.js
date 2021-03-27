import 'bulma/css/bulma.css'




export default function ProfileCard({displayName,profileImage,percentage,profilePage}){
    return(
        
        <div className="columns is-multiline is-vcentered is-mobile is-11">
            <div className="column is-one-fifth  box has-text-centered button" style={{margin:"0 auto",width:'154px',height:'180px'}}>
                <div className="has-text-centered ">
                    <a href={profilePage}  target="_blank">
                        <div>
                            <figure className="image image_placement">
                                <img style={{maxWidth:'auto',maxHeight:'170px'}} src={profileImage} />
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