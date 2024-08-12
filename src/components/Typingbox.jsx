import React, { createRef, useState, useEffect, useMemo, useRef } from 'react';
import { generate } from 'random-words';
import UpperMenu from './UpperMenu';
import { useTestMode } from '../context/TestModeContext';

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

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length).fill(0).map(i => createRef(null));
  }, [wordsArray]);

  useEffect(() => {
    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);


  const StartTimer = () => {

    const intervalId = setInterval(timer, 1000);
    setintervalId(intervalId);

    function timer() {
      setcountDown((latestcountDown) => {
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

      if (allcurrChars.length <= currentcharIndex) {
        //removing cursor from last place of a word
        allcurrChars[currentcharIndex - 1].classList.remove('current-right');
      }
      else {
        //remove cursor from in betqeen of the word
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
      return;

    }

    if (event.key === allcurrChars[currentcharIndex].innerText) {
      allcurrChars[currentcharIndex].className = 'correct';
    }
    else {
      allcurrChars[currentcharIndex].className = 'incorrect';
    }

    if (currentcharIndex + 1 === allcurrChars.length) {
      allcurrChars[currentcharIndex].className += ' current-right';
    }
    else {
      allcurrChars[currentcharIndex + 1].className = 'current';
    }
    setcurrentcharIndex(currentcharIndex + 1);
  }

  const focusInput = () => {
    inputRef.current.focus();
  }


  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = 'current'

    // StartTimer();
    // resetTest();
  }, [TestTime])



  return (
    <div>
      <UpperMenu countDown={countDown} />
      {(testEnd) ? (<h1>Test Over</h1>) : (<div className='type-box' onClick={focusInput}>
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
