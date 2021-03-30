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
  // Animation was created by Ciprian Ionescu on CodePen 
  // https://codepen.io/awjones/pen/gQQypd

  return(

    <>
      
      {/* <!--loading animation for shyftplan.com--> */}
      <div class="ajaxLoad">
      
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" viewBox="0 0 1498.2 1265.9" enable-background="new 0 0 1498.2 1265.9" xml:space="preserve">
          <g>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FF9900" d="M890.8,920c26,29.6,83.7,79,122,96.6c0,0-83,3.1-89.2,84.2
              c108.6-148.5,240.7,17.2,185.2,97.9c69.1-48.2,18.3-126.4-6.7-147.9c0,0,69.9,45.4,63.1,117.8c53.4-132.4-119.4-144.6-228.9-261.6
              C929.5,903.1,903.7,902.9,890.8,920L890.8,920z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#D4D4D4" d="M884.1,1010.5c0,0-129.8,67.6-254.3,33.1
              c-80.9,40-206.1,85.8-343.1,124c-13.9-4.2-27.7-43.4-24.3-49.1c28.5-18.8,57.4-38.6,85.5-59C473,968.8,590.1,871.7,666.7,857.2
              C751.4,841.2,849.9,950.5,884.1,1010.5L884.1,1010.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#00A6FF" d="M347.8,1059.6c68.2-49.3,232.5-206.6,290.6-245.4
              c-16.2,176.1-206.7,306.7-351.8,353.4c-8.4-0.7-31.3-28.2-24.3-49.1C267.3,1115.7,331.3,1071.5,347.8,1059.6L347.8,1059.6z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M286.7,1167.6c-75.4,21.7-151.9,40.8-222.1,54.8c55.7-23.8,118.9-59,197.7-103.9
              C273,1128.2,284.9,1153.8,286.7,1167.6L286.7,1167.6z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1398.9,193.5c-65.1,68.2-69.6,85.3-51.9,143.9
              c-251.9,10.5-206.4-240.1-184.1-278.6c28-19.9,136.2-42.9,210,18.6C1430.8,137.3,1401.7,161.4,1398.9,193.5L1398.9,193.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FF0800" d="M1338.1,294.9c-169.9-14.1-156.2-174.3-145-249.1
              c44.4-16.2,121.7-18.6,179.7,31.6c55.7,57.5,30.6,85.7,26,116C1374.5,224.8,1337,250.9,1338.1,294.9L1338.1,294.9z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFD900" d="M1346.4,335.5c16.9,38.9,141.9,246.4-146.6,509.1
              c-76.2,55.3-191.8,122.2-315.4,165.7C430.8,1090.5,967.1,342.4,1346.4,335.5L1346.4,335.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFBB00" d="M1346.4,335.5c21.8,37,196,263.7-146.7,509.1
              c-113.3-47.1-190.9-142.7-190.9-252.9c0-52.4,17.5-101.5,48.1-143.6C1152.7,382.3,1254.8,337.5,1346.4,335.5L1346.4,335.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#214197" d="M1346.4,335.5c23.9,38.3,161.7,213.3-46.6,424.2
              c-130-44.1-241.9-192.7-200.3-339.3C1182.2,370,1267.9,337.2,1346.4,335.5L1346.4,335.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#3E5881" d="M1346.4,335.5c16.8,27,90,121.4,59.3,249
              c-120.4-36.9-149.4-140.4-152-234.1C1285.3,341.4,1316.4,336.2,1346.4,335.5L1346.4,335.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#0F7D00" d="M1162.9,58.9c-2.5,11-20.8,19-41.2,29.6
              c-25.5,26-57.4,73.2-76.2,154.5c-36.1,155.6-580.5,710.2-696.7,816c357.3-117.5,786.6-244.7,773.8-598.4
              c88-53.9,152.4-100,223.8-125.1C1248.4,330.1,1124.9,279.2,1162.9,58.9L1162.9,58.9z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#00A6FF" d="M1162.9,58.9c-3,2.2-22.7,12.3-41.2,29.6
              c-8.3,100.1,2.5,238.9,133.7,290.2c30.7-17.6,60.2-32.3,91-43.2C1248.4,330.1,1124.9,279.2,1162.9,58.9L1162.9,58.9z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#D4D4D4" d="M1260.4,107.8c-17.5,0-31.6,14.1-31.6,31.6
              c0,17.5,14.1,31.6,31.6,31.6c17.5,0,31.6-14.2,31.6-31.6C1292,122,1277.9,107.8,1260.4,107.8L1260.4,107.8z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1260.4,115.5c-13.2,0-24,10.7-24,24c0,13.2,10.7,24,24,24c13.2,0,24-10.7,24-24
              C1284.4,126.2,1273.7,115.5,1260.4,115.5L1260.4,115.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#17AD03" d="M1042.9,251.9c11,13.8,380.8,387.9-549.8,665.2
              C705.6,684.1,827.5,526,1042.9,251.9L1042.9,251.9z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FF9900" d="M799.5,987.2c26,29.6,83.7,79,122,96.6c0,0-83,3.1-89.2,84.2
              c108.6-148.5,240.7,17.2,185.2,97.9c69.1-48.2,18.3-126.4-6.7-147.9c0,0,69.9,45.4,63.1,117.8c53.4-132.4-119.4-144.6-228.9-261.6
              C838.2,970.2,812.3,970.1,799.5,987.2L799.5,987.2z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFB3B0" d="M1498.2,149.5l-99.4,44l-50.3,15.3l11.7-56l-23.4-72.1l36-3.2
              C1413.5,87.5,1458.6,107,1498.2,149.5L1498.2,149.5z"/>
            <path d="M1498.2,149.5c-49.7-14.9-120-15.5-138,3.3C1369.9,148.2,1418.6,140.5,1498.2,149.5L1498.2,149.5z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M1265.6,124.8c-3.2,0-5.8,2.6-5.8,5.8c0,3.2,2.6,5.8,5.8,5.8
              c3.2,0,5.8-2.6,5.8-5.8C1271.3,127.4,1268.8,124.8,1265.6,124.8L1265.6,124.8z"/>
          </g>
        </svg>
      </div>

    </>
  )
}


function Matches(Results,moreThanOne){

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
                {moreThanOne && 
          
                  Results.map((user)=>{
                    // Counter 
                    let count = 0 


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


  // check if there is more than match. 
  const[moreThanOne, setMoreThanOne ] = useState(false)

  if(userMatches.length > 1 ){
    setMoreThanOne(true)
  }



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
    </Head>


    {loading && 
      LoadingScreen()
    }


    {!loading && 
    
      Matches(userMatches,moreThanOne)
    
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