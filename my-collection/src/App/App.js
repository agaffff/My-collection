import './App.css';
import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import {Switch, Route} from 'react-router-dom';
import ListCollection from 'components/ListCollection/ListCollection';

function App() {
  return (
   <Switch>
     <Route exact path="/" component={HomePage}/>
     <Route exact path="/login" component={LoginPage}/>
     <Route exact path="/register" component={RegisterPage}/>
     <Route exact path="/listCollection" component={ListCollection}/>
   </Switch>
  );
}

export default App;
