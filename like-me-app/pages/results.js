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
    body: JSON.stringify({ code: token})
  };

  const getMatches = await fetch("https://like-me-one.vercel.app/api/insert", requestOptions)
  const matchesData = await getMatches.json()
  

  return matchesData

}









function LoadingScreen(){


  return(


    <>

      <sction className="hero is-fullheight ">

        <div className="hero-body has-text-centered" style={{margin:"0 auto"}}>
          
          <p className="title">Loading..... </p>
          <p className="subtitle">Please give us a second while we generate your matches</p>

        </div>


      </sction>


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
            <ProfileCard displayName={Results[0][0]} profileImage={Results[0][2]} percentage={Math.round(Results[0][3])} profilePage={Results[0][1]} />

            <div className="box has-text-centered">
                <p>You and {Results[0][0]} have the most songs in common! Check their page out</p>
                <br/>

                <p> Click on any profile card to view the users Spotify's page</p>
            </div>

            <div className="results-container" style={{maxWidth:'612px', display:'flex', justifyContent:'center'}}>

                {/* Display Remaining results if there is more than one  */}
                {
                  Results.map((user)=>{
       
                    // Set Variables 
                    const displayName = user[0]
                    const profileImage = user[2]
                    const percentage = Math.round(user[3])
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

    
    <div className="has-text-centered">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </section>


    
  )
}











export default function Home({SpotifyAuthCode}) {

  // Set loading screen 
  const [loading,setLoading] = useState(true)
  const [userMatches , setUserMatches] = useState([])



  async function GenerateTheMatchesPage(){


 
    const GeneratedMatches = await getMatches(SpotifyAuthCode)
    

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
      <Link href="https://like-me-one.vercel.app">
      <title>Like.Me</title>
      </Link>
      <link href="../fonts/style.css" rel="stylesheet"/>
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23eadbc7%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2257%22>💫</text></svg>" />
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



  

  return {
    props: {SpotifyAuthCode}, // will be passed to the page component as props
  }
}