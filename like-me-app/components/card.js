import 'bulma/css/bulma.css'


export default function ProfileCard(){
    return(
        
        <div className="columns is-multiline is-vcentered is-mobile is-11">
            <div className="column is-one-fifth  box has-text-centered button" style={{margin:"0 auto",width:'154px',height:'180px'}}>
                <div className="has-text-centered ">

                    <div>
                        <figure className="image is-128x128 image_placement">
                            <img src="C:\Users\Pineda\Documents\GitHub\like-me\like-me-app\public\open-doodles-groovy.png" />
                        </figure>
                    </div>
                    
                    <div>
                        <p className="has-text-weight-light playlist_subtitles">PineX08</p>
                    </div>

                </div>
            </div>    
        </div>
        
    )
}

