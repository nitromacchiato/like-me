import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from "react"
import 'bulma/css/bulma.css'



export default function Home({SPOTIFY_AUTH_URL}) {

  console.log(SPOTIFY_AUTH_URL)

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
        <div className="hero-head" style={{margin:"0 auto"}}>
          <div className="columns is-mobile is-marginless heading has-text-weight-bold">
            <div className="column center">
              <p className="navbar-item header-title" style={{color:'black'}}>LIKE.ME</p>
            </div>
          </div>        
        </div>

        <div className="hero-body">

          <div style={{margin:'0 auto',marginBottom:'auto'}}>

            <div className="columns is-mobile is-centered is-vcentered">
              <div className="column is-two-fifths">
                <span>
        
                  <p className="title title-font-style hide-mobile" style={{color:'black'}}>Find people with similar music <br/> taste  as you on Spotify</p>
                  <a href={ SPOTIFY_AUTH_URL }>                 
                    <button className="button is-black desktop-style sub-text">Find Matches</button>
                  </a>

                </span>
              </div>

              <div className="column">
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

              <p className="subtitle sub-text-font" style={{color:'black'}}>How It Works</p>

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


export async function getServerSideProps(context) {


  const SPOTIFY_AUTH_URL = process.env.SPOTIFY_AUTH_URL

  return {
    props: { SPOTIFY_AUTH_URL },
  }
}