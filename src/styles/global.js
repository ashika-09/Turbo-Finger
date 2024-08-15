import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
 
*{
  box-sizing: border-box;
}

body{
 background: ${({ theme }) => theme.background};
 color: ${({ theme }) => theme.textColor};
 margin:0;
 padding:0;
 transition:all 0.25s linear;
 }

 .canvas{
  display:grid;
  min-height: 100vh;
  grid-auto-flow:row;
  grid-template-row: auto 1fr auto;
  gap:0.4rem;
  padding:2rem;
  width:100vw;
  align-items:center;
  text-align:center;
  overflow: hidden;
 }
  .type-box{
   display:block;
   max-width:1000px;
   height:150px;
   margin-left:auto;
   margin-right:auto;
   overflow:hidden;
  }

  .words{
       font-size:25px;
       display:flex;
       flex-wrap:wrap;
       color: ${({ theme }) => theme.typeBoxText}
  }
  .word{
    margin:5px;
    padding-right:2px;
    }

.upper-menu{
  display: flex;
  width:1000px;
  justify-content:space-between;
  font-size:1.4rem;
  padding:0.8rem;
  margin-left:auto;
  margin-right:auto;
}
.modes{
  display:flex;
  gap:0.4rem;
}

.time-mode:hover{
  color:green;
  cursor:pointer;
}
.hidden-input{
  opacity:0;
}
.current{
   border-left: 2px solid ;
  animation:blinking 2s infinite;
  animation-timing-function:ease;
  @keyframes blinking{
  0%{border-left-color:${({ theme }) => theme.textColor}}
  25%{border-left-color:${({ theme }) => theme.background}}
  50%{border-left-color:${({ theme }) => theme.textColor}}
  75%{border-left-color:${({ theme }) => theme.background}}
  100%{border-left-color:${({ theme }) => theme.textColor}}
  }
}

.current-right{
  border-right: 2px solid ;
  animation:blinkingright 2s infinite;
  animation-timing-function:ease;
  @keyframes blinkingright{
  0%{border-right-color:${({ theme }) => theme.textColor}}
  25%{borderright-color:${({ theme }) => theme.background}}
  50%{border-right-color:${({ theme }) => theme.textColor}}
  75%{border-right-color:${({ theme }) => theme.background}}
  100%{border-right-color:${({ theme }) => theme.textColor}}
  }
}

.correct{
  color:${({ theme }) => theme.textColor};
}
.incorrect{
  color:red;
}

.footer{
  width:1000px;
  display:flex;
  justify-content: space-between;
  margin: auto;
}

.stats-box{
    display:flex;
    wodth:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
}     
.left-stats{
  width:30%;
  padding: 30px;
}

.right-stats{
  width:70%
}
.title{
  font-size:20px;
  color:${({ theme }) => theme.typeBoxText};
}
.subtitle{
  font-size:30px;
}

.header{
 width:1000px;
 display:flex;
 justify-content:space-between;
 margin:auto;
}
        
`