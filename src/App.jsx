
// import "./App.css";
// import DantzigMinimization from "./components/DantzigMinimization";
// import DantzigMaximization from './components/DantzigMaximization';

// const App = () => {
//   return (
//     <div className="App dantzig text-sm">
//       <DantzigMaximization />
//       <DantzigMinimization />
//     </div>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DantzigMinimization from "./components/DantzigMinimization";
import DantzigMaximization from './components/DantzigMaximization';

const App = () => {
  
  return (
    <Router>
      <div className="App dantzig text-sm ">
        <Routes>
          <Route path="/" element={<DantzigMinimization />} />
          <Route path="/maximization" element={<DantzigMaximization />} />
          <Route path="/minimization" element={<DantzigMinimization />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
