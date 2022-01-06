import './App.css';
import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
   <Switch>
     <Route exact path="/" component={HomePage}/>
     <Route exact path="/login" component={LoginPage}/>
     <Route exact path="/register" component={RegisterPage}/>
   </Switch>
  );
}

export default App;
