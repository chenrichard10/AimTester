import React, { useRef, useState, Suspense} from 'react'
import Timer from 'react-compound-timer'

function Stopwatch(props) {
    return(
        <Timer initialTime={0}>
        {({ start, resume, pause, stop, reset}) => (
            <React.Fragment>
                <div>
                    <Timer.Seconds /> seconds, 
                    <Timer.Milliseconds /> milliseconds
                </div>
                <div>
                    <button onClick={reset}> New </button>
                </div>
            </React.Fragment>)}
       
        </Timer>)
    }

export default Stopwatch