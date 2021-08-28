import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './App.css';
import Entries from './views/Entries';
import Entry from './views/Entry';
import NotFound from './views/NotFound';
import Feeds from './components/Feeds';

function Content() {
  const location = useLocation();

  return (
    <div className="max-w-5xl mx-auto h-full">
      <SwitchTransition>
        <CSSTransition classNames="fade" timeout={100} key={location.key} unmountOnExit appear>

          <Switch location={location}>
            <Route exact path="/" component={Entries} />
            <Route exact path="/entries/:id" component={Entry} />
            <Route exact path="/:group/:id" component={Entries} />
            <Route path="*" component={NotFound} />
          </Switch>

        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App flex flex-row h-screen">
        <aside className="bg-gray-50 flex-shrink-0 overflow-y-auto w-1/5">
          <header className="mb-2">
            <Link to="/" className="block hover:text-gray-800 px-4 py-4 text-gray-500 text-sm uppercase">
              Miniflux Client
            </Link>
          </header>

          <Feeds />
        </aside>
        <main className="flex-grow overflow-y-auto p-10">
          <Content />
        </main>
      </div>
    </Router>
  );
}

export default App;
