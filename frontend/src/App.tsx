import React from 'react';
import { AuthProvider } from './context/authContext';
import AppRoutes from './routes/appRoutes';
import './App.css';

const App: React.FC = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;

// import React from 'react';
// import AppRoutes from './routes/appRoutes';

// function App() {
//   return <AppRoutes />
//   ;
// }

// export default App;

// function App(): React.JSX.Element {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }





