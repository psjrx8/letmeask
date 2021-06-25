import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../src/pages/Home';
import { NewRoom } from '../src/pages/NewRoom';
import { Room } from '../src/pages/Room';

import { AuthContextProvider } from '../src/contexts/AuthContext';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={ Home }/>
          <Route path="/rooms/new" component={ NewRoom }/>
          <Route path="/rooms/:id" component={ Room }/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
