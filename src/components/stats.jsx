import React from 'react'
import Graph from './Graph';
const Stats = (
    {
        wpm,
        accuracy,
        correctchars,
        incorrectchars,
        extrachar,
        missedchar
    } )=> {
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
            <Graph/>
          </div>
        </div>
    )
  }


export default Stats;