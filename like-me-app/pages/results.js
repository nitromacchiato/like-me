import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ProfileCard from '../components/card'
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

      <section className="hero is-fullheight ">

        {/* HEADER */}
        <div class="hero-head" style={{margin:"0 auto"}}>
          <div class="columns is-mobile is-marginless heading has-text-weight-bold">
            <div class="column center">
              <Link href="/">
                <p class="navbar-item header-title" style={{color:'black'}}>LIKE.ME</p>
              </Link>
            </div>
          </div>        
        </div>

        <div className="hero-body" style={{margin:"0 auto"}}>

            <div className="top-result">
                <ProfileCard/>

                <div className="box has-text-centered">
                    <p>You and Andy have <strong>4091</strong> songs in common! Thats a lot of songs.</p>
                    <br/>

                    <p> Click on any profile card to view the users Spotify's page</p>
                </div>

                <div class="results-container" style={{maxWidth:'521px'}}>
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
                    <div className="card-spacing">
                        <ProfileCard/>
                    </div>
                </div>
                









            </div>


        </div>



      </section>
    </body>


  </>   
  )
}
