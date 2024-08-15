import React, { createRef, useState, useEffect, useMemo, useRef } from 'react';
import { generate } from 'random-words';
import UpperMenu from './UpperMenu';
import Stats from './stats';
import { useTestMode } from '../context/TestModeContext';
import Header from './Header';
const Typingbox = () => {
  const [wordsArray, setwordsArray] = useState(() => {
    return generate(50); // Use the `generate` function to get random words
  });

  const inputRef = useRef(null);
  const { TestTime } = useTestMode();
  const [countDown, setcountDown] = useState(TestTime);
  const [testStart, settestStart] = useState(false);
  const [testEnd, settestEnd] = useState(false);
  const [intervalId, setintervalId] = useState(null);
  const [currentwordIndex, setcurrentwordIndex] = useState(0);
  const [currentcharIndex, setcurrentcharIndex] = useState(0);
  const [correctchar, setcorrectchar] = useState(0);
  const [incorrectchar, setincorrectchar] = useState(0);
  const [extrachars, setextrachars] = useState(0);
  const [missedchars, setmissedchars] = useState(0);
  const [correctwords, setcorrectwords] = useState(0);
  const [graphdata , setgraphdata] = useState([]);

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length).fill(0).map(i => createRef(null));
  }, [wordsArray]);



  const StartTimer = () => {

    const intervalId = setInterval(timer, 1000);
    setintervalId(intervalId);

    function timer() {
      setcountDown((latestcountDown) => {
           setcorrectchar((correctchar)=>{
            setgraphdata((graphdata)=>{
              return [...graphdata , [
                TestTime-latestcountDown+1,
                (correctchar/5)/((TestTime-latestcountDown+1)/60)
              ]];
            })
            return correctchar;
           })

        
        if (latestcountDown === 1) {
          settestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestcountDown - 1;
      });
    }
  }


  const resetTest = () => {
    if (intervalId) clearInterval(intervalId);
    setcountDown(TestTime);
    setcurrentcharIndex(0);
    settestStart(false);
    settestEnd(false);
    setwordsArray(generate(50));
    resetwordSpanRefClassname()
    focusInput();
  };

  const resetwordSpanRefClassname = () => {
    wordsSpanRef.forEach(ref => {
      const childNodes = ref.current ? Array.from(ref.current.childNodes) : [];
      childNodes.forEach(node => {
        node.className = '';
      });
    });
    if (wordsSpanRef[0].current) {
      wordsSpanRef[0].current.childNodes[0].className = 'current';
    }
  };

  const handleUserInput = (event) => {
    if (!testStart) {
      StartTimer();
      settestStart(true);
    }
    const allcurrChars = wordsSpanRef[currentwordIndex].current.childNodes;

    if (event.keyCode === 32) {//for space

      let correctcharsinwords = wordsSpanRef[currentwordIndex].current.querySelectorAll('.correct')

      if (correctcharsinwords.length === allcurrChars.length) {
        setcorrectwords(correctwords + 1);
      }


      if (allcurrChars.length <= currentcharIndex) {
        //removing cursor from last place of a word
        allcurrChars[currentcharIndex - 1].classList.remove('current-right');
      }
      else {
        //remove cursor from in between of the word
        setmissedchars(missedchars + (allcurrChars.length - currentcharIndex));
        allcurrChars[currentcharIndex].classList.remove('current')
      }

      wordsSpanRef[currentwordIndex + 1].current.childNodes[0].className = 'current';
      setcurrentwordIndex(currentwordIndex + 1);
      setcurrentcharIndex(0);
      return;
    }

    if (event.keyCode === 8) {
      //logic for backspace
      if (currentcharIndex !== 0) {

        if (allcurrChars.length === currentcharIndex) {

          if (allcurrChars[currentcharIndex - 1].className.includes('extra')) {
            allcurrChars[currentcharIndex - 1].remove();
            allcurrChars[currentcharIndex - 2].className += ' current-right';
          }
          else {
            allcurrChars[currentcharIndex - 1].className = 'current';
          }
          setcurrentcharIndex(currentcharIndex - 1);
          return;
        }

        allcurrChars[currentcharIndex].className = '';
        allcurrChars[currentcharIndex - 1].className = 'current';
        setcurrentcharIndex(currentcharIndex - 1);
      }

      return;
    }

    if (currentcharIndex === allcurrChars.length) {

      let newSpan = document.createElement('span');
      newSpan.innerText = event.key;
      newSpan.className = 'incorrect extra current-right';
      allcurrChars[currentcharIndex - 1].classList.remove('current-right');
      wordsSpanRef[currentwordIndex].current.append(newSpan);
      setcurrentcharIndex(currentcharIndex + 1);
      setextrachars(extrachars + 1);
      return;

    }

    if (event.key === allcurrChars[currentcharIndex].innerText) {
      allcurrChars[currentcharIndex].className = 'correct';
      setcorrectchar(correctchar + 1);
    }
    else {
      allcurrChars[currentcharIndex].className = 'incorrect';
      setincorrectchar(incorrectchar + 1);
    }

    if (currentcharIndex + 1 === allcurrChars.length) {
      allcurrChars[currentcharIndex].className += ' current-right';
    }
    else {
      allcurrChars[currentcharIndex + 1].className = 'current';
    }
    setcurrentcharIndex(currentcharIndex + 1);
  }

  const calculateWPM = () => {
    return Math.round((correctchar / 5) / (TestTime / 60));
  }

  const calculateAcc = () => {
    return Math.round((correctwords / currentwordIndex) * 100);
  }
  const focusInput = () => {
    inputRef.current.focus();
  }
  useEffect(()=>{
    setcountDown(TestTime);
  }, [TestTime])

  useEffect(() => {
    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = 'current'
  }, [])



  return (
    <div>
      <UpperMenu countDown={countDown} />
      {(testEnd) ? (<Stats
       wpm={calculateWPM()} 
       accuracy={calculateAcc()} 
       correctchars={correctchar}
       incorrectchars={incorrectchar}
       missedchar={missedchars}
       extrachar={extrachars}
       graphdata={graphdata}
       />) : (<div className='type-box' onClick={focusInput}>
        <div className='words'>
          {wordsArray.map((word, index) => (
            <span className='word' ref={wordsSpanRef[index]}>
              {word.split('').map((char, charIndex) => (
                <span key={charIndex} >{char}</span>
              ))}
            </span>
          ))}
        </div>
      </div>)}
      <input
        type="text"
        className='hidden-input'
        onKeyDown={handleUserInput}
        ref={inputRef}
      />
    </div>
  );
};

export default Typingbox;
