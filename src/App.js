import Menu from './components/Menu'
import { AuthContextProvider} from "./context/AuthContext";

import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
          <div className="container">
            <Menu />
          </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
