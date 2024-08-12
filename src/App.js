import { GlobalStyles } from "./styles/global";
import Typingbox from "./components/Typingbox";
import UpperMenu from "./components/UpperMenu";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./context/ThemeContext" ;

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles />
        <div>header</div>
        <Typingbox />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
