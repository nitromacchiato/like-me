import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProfileCard from '../components/card'
import 'bulma/css/bulma.css'



async function getMatches(token,ResultsApi,ApplicationKey){


  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: token, secret: ApplicationKey })
  };

  const getMatches = await fetch(ResultsApi , requestOptions)
  const matchesData = await getMatches.json()
  

  return matchesData

}









function LoadingScreen(){
  // Animation was created by Ciprian Ionescu on CodePen 
  // https://codepen.io/ciprianionescu/pen/GpqEdw

  return(

    <>
    <svg height="400" width="400" id="preloader">
      <g filter="url(#goo)">
        <circle className="outer" cx="200" cy="200" r="150" />
        <circle className="drop" cx="200" cy="200" r="20" />
      </g>

      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />

        </filter>
      </defs>
    </svg> 
    </>
  )
}


function Matches(Results){

  console.log('RESULTS ARE ', Results)


  return(

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
            <ProfileCard displayName={Results[0][0]} profileImage={Results[0][2]} percentage={Results[0][3]} profilePage={Results[0][1]} />

            <div className="box has-text-centered">
                <p>You and {Results[0][0]} have the most songs in common! Check their page out</p>
                <br/>

                <p> Click on any profile card to view the users Spotify's page</p>
            </div>

            <div className="results-container" style={{maxWidth:'612px', display:'flex', justifyContent:'center'}}>

                {/* Display Remaining results  */}
                {Results.map((user)=>{
                  // Counter 
                  let count = 0 


                  // Set Variables 
                  const displayName = user[0]
                  const profileImage = user[2]
                  const percentage = user[3]
                  const profilePage = user[1]


                  if(Results[0][0] != displayName ){

                    return(

                      <div className="card-spacing" style={{margin:'0 auto'}}>
                            <ProfileCard displayName={displayName} profileImage={profileImage} percentage={percentage} profilePage={profilePage}/>
                      </div>

                    )

                  }
                })
                }
 
            
            </div>
        </div>
    </div>
  </section>


    
  )
}











export default function Home({SpotifyAuthCode, ApplicationKey}) {

  const [loading,setLoading] = useState(true)
  const [userMatches , setUserMatches] = useState([])



  async function GenerateTheMatchesPage(){


    const ResultsApi = "https://like-me-seven.vercel.app/api/insert"
    const GeneratedMatches = await getMatches(SpotifyAuthCode,ResultsApi, ApplicationKey)
    

    setUserMatches(GeneratedMatches)
    

   if(GeneratedMatches.length > 2){
     setLoading(false)
   }

  }


  // make a request to generate matches 
  useEffect(() => {
    GenerateTheMatchesPage()
  },[])




  return (
    <>
    <Head>
      <Link href="https://like-me-seven.vercel.app/">
      <title>Like.Me</title>
      </Link>
      <link href="../fonts/style.css" rel="stylesheet"/>
    </Head>


    {loading && 
      LoadingScreen()
    }


    {!loading && 
    
      Matches(userMatches)
    
    }
  </>   
  )
}



export async function getServerSideProps({query}) {

  const SpotifyAuthCode = query.code
  const ApplicationKey = process.env.LIKE_ME_API_KEY


  

  return {
    props: {SpotifyAuthCode, ApplicationKey}, // will be passed to the page component as props
  }
}