import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ProfileCard from '../components/card'
import 'bulma/css/bulma.css'

export default function Results({matches}) {

  const [count,setCount] = useState(0)

  return (
    <>
    <Head>
      <title>Like.Me</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="/fonts/style.css" rel="stylesheet"/>
    </Head>



    <section className="hero is-fullheight ">

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
              <ProfileCard/>


              {/*  Display Results  */}
              {
                <>
                  {/* <ProfileCard displayName={matches[-1]} profileImage={matches[-1][2]} percentage={matches[-1][3]} profilePage={matches[-1][1]}/> */}

                  <div className="box has-text-centered">
                    <p>You and {matches[0]} have the most songs in common!</p>
                    <br/>

                    <p> Click on any profile card to view the users Spotify's page</p>
                  </div>

                </>
              }



              <div className="results-container" style={{maxWidth:'521px'}}>

                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
                  </div>
                  <div className="card-spacing">
                      <ProfileCard/>
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
  const matches = await getMatches.json()


  
  matches.sort((function(index){
      return function(a, b){
          return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
      };
  })(3));




  return {
    props: {matches}, // will be passed to the page component as props
  }
}