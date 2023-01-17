import './App.css';
import Navbar from "./komponente/Navbar"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Glavna from './stranice/Glavna'
import ONama from './stranice/ONama/ONama'
import {Singup} from './stranice/Login/Index.jsx'
import {Register} from './stranice/Login/Index.jsx'
import Profil from './stranice/Profil/Profil'
import Welcome from './stranice/Welcome/Welcome'
import Podaci from './stranice/Podaci/Podaci';
import Casovi from './stranice/Casovi/Casovi'

function App() {
  return (
    
   <>
   <Router>
     <Navbar/>
     <Switch>
     <Route path='/' exact component={Glavna}/>
     <Route path='/oNama' component={ONama} />
     <Route path='/prijaviSe' component={Singup}/>
     <Route path='/registrujSe' component={Register}/>
     <Route path='/Profil'component={Profil}/>
     <Route path='/Dobrodosli' component={Welcome}/>
     <Route path='/Podaci' component={Podaci}/>
     <Route path='/Casovi' component={Casovi}/>
     
    
     
    
      
       </Switch>
   </Router>
   
    
   
   </>

  );
}

export default App;
