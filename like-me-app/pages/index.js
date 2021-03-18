import Head from 'next/head'
import Image from 'next/image'
import 'bulma/css/bulma.css'

export default function Home() {
  return (
    <>
    <Head>
      <title>Like.Me</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="/fonts/style.css" rel="stylesheet"/>
    </Head>

    <body>

      <section className="hero is-fullheight">

        {/* HEADER */}
        <div class="hero-head" style={{margin:"0 auto"}}>
          <div class="columns is-mobile is-marginless heading has-text-weight-bold">
            <div class="column center">
              <p class="navbar-item header-title" style={{color:'black'}}>LIKE.ME</p>
            </div>
          </div>        
        </div>

        <div className="hero-body">

          <div style={{margin:'0 auto',marginBottom:'auto'}}>

            <div class="columns is-mobile is-centered is-vcentered">
              <div class="column is-two-fifths">
                <span>
        
                  <p class="title title-font-style hide-mobile" style={{color:'black'}}>Find people with similar music <br/> taste  as you on Spotify</p>
                  <button className="button is-black desktop-style sub-text">Find Matches</button>

                </span>
              </div>

              <div class="column">
                <Image
                src="/icons/icons8-spotify-500.png"
                alt="Spotify Logo"
                height='500px'
                width='500px'
                />  
              </div>
              
            </div>


            {/* <button className="button is-black block desktop-style sub-text">Find Matches</button> */}

            <div className="box has-text-centered" style={{marginTop:'2em'}}>

              <p class="subtitle sub-text-font" style={{color:'black'}}>How It Works</p>

              <div className="block" style={{marginRight:'5px',marginLeft:'5px'}}>
                <p className="block sub-text">1. Connect to your Spotify account</p>
                <p className="block sub-text">
                  2. We generate matches based off who has the highest percentage of similar music as you based 
                  off your liked songs
                </p>
                <p className="block sub-text">
                  3. See a list of users ranked from highest matching percentage to least
                </p>
              </div>

              <Image
              src="/open-doodles-groovy.png"
              alt="Groovy Guy Dancing"
              height="200px"
              width="200px"
              />

            </div>


          </div>
          

    






        </div>






      </section>


    </body>


  </>   
  )
}
