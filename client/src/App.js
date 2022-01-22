import { BrowserRouter } from "react-router-dom";
import Main from "./MyApp/Main/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
