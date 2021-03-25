import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/card'
import 'bulma/css/bulma.css'


export default function Results({appKey}) {


  const [loading,setLoading] = useState(true)


  const token = query.code

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: token, secret: appKey })
  };

  const getMatches = await fetch('https://like-me-seven.vercel.app/api/insert', requestOptions)
  const matchesData = await getMatches.json()



  
  matchesData.sort((function(index){
      return function(a, b){
          return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
      };
  })(3));


  const matches = matchesData.reverse()

  useEffect(() => {
    // Always do navigations after the first render
    if(matches.length == 0 || matches == undefined || matches === null){
      setLoading(true)
    } else {
      setLoading(false)
    }
  })
  



  
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
      <Link href={process.env.NEXT_URL}>
      <title>Like.Me</title>
      </Link>
      <link href="../fonts/style.css" rel="stylesheet"/>
    </Head>


    {!loading && 
      <section className="hero is-fullheight">

      {/* HEADER */}
      <div className="hero-head" style={{margin:"0 auto"}}>
        <div className="columns is-mobile is-marginless heading has-text-weight-bold">
          <div className="column center">
            <Link href="https://like-me-seven.vercel.app/">
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

          </div>
          </div>
        </div>
    </section>
    }

    {loading && 

      <section>
        <p>Loading ....</p>
      </section>
    
    }

  </>   
  )
}



export async function getServerSideProps({query}) {


  const appKey = proccess.env.LIKE_ME_API_KEY


  

  return {
    props: {appKey}, // will be passed to the page component as props
  }
}