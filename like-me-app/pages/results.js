import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ProfileCard from '../components/card'
import 'bulma/css/bulma.css'


export default function Results({matches}) {

  console.log(matches.length)
  
  // Generate the top result render 
  function TopResult(){

    // Set User Values 
    const displayName = matches[0][0]
    const profilePage = matches[0][1]
    const profileImage = matches[0][2]
    const percentMatch = matches[0][3]

    return(
      <>
        <ProfileCard displayName={displayName} profileImage={profileImage} percentage={percentMatch} profilePage={profilePage}/>


        <div className="box has-text-centered">
          <p>You and {displayName} have the most songs in common!</p>
          <br/>

          <p> Click on any profile card to view the users Spotify's page</p>
        </div>
      </>
    )
  }
  




  return (
    <>
    <Head>
      <title>Like.Me</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="/fonts/style.css" rel="stylesheet"/>
    </Head>



    <section className="hero is-fullheight">

      {/* HEADER */}
      <div className="hero-head" style={{margin:"0 auto"}}>
        <div className="columns is-mobile is-marginless heading has-text-weight-bold">
          <div className="column center">
            <Link href="/">
              <p className="navbar-item header-title" style={{color:'black'}}>LIKE.ME</p>
            </Link>
          </div>
        </div>        
      </div>

      <div className="hero-body" style={{margin:"0 auto"}}>

          <div className="top-result">
            {/* Display TOP RESULT  */}
            {
              TopResult()
            }







          <div className="results-container" style={{maxWidth:'521px'}}>


            <div className="card-spacing">
              <ProfileCard displayName={matches[1][0]} profileImage={matches[1][2]} percentage={Math.round(matches[1][3])} profilePage={matches[1][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[2][0]} profileImage={matches[2][2]} percentage={Math.round(matches[2][3])} profilePage={matches[2][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[3][0]} profileImage={matches[3][2]} percentage={Math.round(matches[3][3])} profilePage={matches[3][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[4][0]} profileImage={matches[4][2]} percentage={Math.round(matches[4][3])} profilePage={matches[4][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[5][0]} profileImage={matches[5][2]} percentage={Math.round(matches[5][3])} profilePage={matches[5][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[6][0]} profileImage={matches[6][2]} percentage={Math.round(matches[6][3])} profilePage={matches[6][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[7][0]} profileImage={matches[7][2]} percentage={Math.round(matches[7][3])} profilePage={matches[7][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[8][0]} profileImage={matches[8][2]} percentage={Math.round(matches[8][3])} profilePage={matches[8][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[8][0]} profileImage={matches[8][2]} percentage={Math.round(matches[8][3])} profilePage={matches[8][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[9][0]} profileImage={matches[9][2]} percentage={Math.round(matches[9][3])} profilePage={matches[9][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[10][0]} profileImage={matches[10][2]} percentage={Math.round(matches[10][3])} profilePage={matches[10][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[11][0]} profileImage={matches[11][2]} percentage={Math.round(matches[11][3])} profilePage={matches[11][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[12][0]} profileImage={matches[12][2]} percentage={Math.round(matches[12][3])} profilePage={matches[12][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[13][0]} profileImage={matches[13][2]} percentage={Math.round(matches[13][3])} profilePage={matches[13][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[14][0]} profileImage={matches[14][2]} percentage={Math.round(matches[14][3])} profilePage={matches[14][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[15][0]} profileImage={matches[15][2]} percentage={Math.round(matches[15][3])} profilePage={matches[15][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[16][0]} profileImage={matches[16][2]} percentage={Math.round(matches[16][3])} profilePage={matches[16][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[17][0]} profileImage={matches[17][2]} percentage={Math.round(matches[17][3])} profilePage={matches[17][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[18][0]} profileImage={matches[18][2]} percentage={Math.round(matches[18][3])} profilePage={matches[18][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[19][0]} profileImage={matches[19][2]} percentage={Math.round(matches[19][3])} profilePage={matches[19][1]}/>
            </div>
            <div className="card-spacing">
              <ProfileCard displayName={matches[20][0]} profileImage={matches[20][2]} percentage={Math.round(matches[20][3])} profilePage={matches[20][1]}/>
            </div>

          </div>














          </div>
        </div>
    </section>
  </>   
  )
}



export async function getServerSideProps({query}) {


  const token = query.code

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: token, secret: process.env.LIKE_ME_API_KEY })
  };

  const getMatches = await fetch('http://localhost:3000/api/insert', requestOptions)
  const matchesData = await getMatches.json()



  
  matchesData.sort((function(index){
      return function(a, b){
          return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
      };
  })(3));


  const matches = matchesData.reverse()


  

  return {
    props: {matches}, // will be passed to the page component as props
  }
}