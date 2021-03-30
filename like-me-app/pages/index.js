import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from "react"
import 'bulma/css/bulma.css'



export default function Home({SPOTIFY_AUTH_URL}) {



  return (
    <>
    <Head>
      <title>Like.Me</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="/fonts/style.css" rel="stylesheet"/>
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23eadbc7%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2257%22>💫</text></svg>" />
    </Head>

    <section className="hero is-fullheight">

      {/* HEADER */}
      <div className="hero-head" style={{margin:"0 auto"}}>
        <div className="columns is-mobile is-marginless heading has-text-weight-bold">
          <div className="column center">
            <Link href="https://like-me-one.vercel.app">
              <p className="navbar-item header-title" style={{color:'black'}}>LIKE-ME</p>
            </Link>
          </div>
        </div>        
      </div>

      <div className="hero-body">
    
        <div style={{margin:'0 auto',marginBottom:'auto'}}>

          <div className="columns is-mobile is-centered is-vcentered">
            <div className="column is-two-fifths">
              <span>
      
                <p className="title title-font-style hide-mobile" style={{color:'black'}}>See who likes the same music <br/> as you on Spotify</p>
                 

                <Link href={SPOTIFY_AUTH_URL}>
                  <button className="button is-black desktop-style sub-text">Find Matches</button>
                </Link>
  
              </span>  
            </div> 
            

            <div className="column">
              <Image
              src="/icons8-spotify-500.png"
              alt="Spotify Logo"
              height='500px'
              width='500px'
              />  
            </div>
            
          </div>



          <div className="box has-text-centered" style={{marginTop:'2em'}}>

            <p className="subtitle sub-text-font" style={{color:'black'}}>How It Works</p>

            <div className="block" style={{marginRight:'5px',marginLeft:'5px'}}>
              <p className="block sub-text">1. Connect to your Spotify account</p>
              <p className="block sub-text">
                2. We compare your music library to users in our database
              </p>
              <p className="block sub-text">
                3. See a list of users with the highest matching percentage
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
    
    
      <div class="hero-foot">
        <nav class="tabs">
          <div class="container">
            <ul>
              <li><a>Linkedin</a></li>
              <li><a>Instagram</a></li>
              <li><a>Github</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  </>   
  )
}


export async function getServerSideProps(context) {


  const SPOTIFY_AUTH_URL = process.env.SPOTIFY_AUTH_URL

  return {
    props: { SPOTIFY_AUTH_URL },
  }
}