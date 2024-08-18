import React, { useEffect } from 'react'
import Graph from './Graph';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { auth, db } from '../firebaseConfig';


const Stats = (
    {
        wpm,
        accuracy,
        correctchars,
        incorrectchars,
        extrachar,
        missedchar,
        graphdata
    } )=> {

    let timeSet= new Set();
    const newgraph = graphdata.filter(i=>{
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    });
   
    const pushDatatodb=()=>{
      const resultsRef= db.collection('Result');
      const { uid }=auth.currentUser;
      resultsRef.add({
        wpm:wpm,
        accuracy:accuracy,
        timestpam:new Date(),
        characters: `${correctchars}/${incorrectchars}/${missedchar}/${extrachar}`,
        userid:uid
      }).then((res)=>{
        toast.success('Data Saved to the database', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }).catch((err)=>{
        toast.error('Not able to save data', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      });
    }

      useEffect(()=>{
        if(auth.currentUser){
        pushDatatodb();
        }
        else{
          toast.warning('login to save results', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        }
      })

    return (
        <div className="stats-box">
          <div className="left-stats">
             <div className="title">WPM</div>
             <div className="subtitle">{wpm}</div>
             <div className="title">Accuracy</div>
             <div className="subtitle">{accuracy}</div>
             <div className="title">Characters</div>
             <div className="subtitle">{correctchars}/{incorrectchars}/{missedchar}/{extrachar}</div>
          </div>

          <div className='right-stats'>
            <Graph graphdata={newgraph}/>
          </div>/
        </div>
    )
  }


export default Stats;