import { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import useRouteStore from './stores/routeStore';
import NavBar from './components/navBar';
import TopBar from './components/topBar';
import HomePage from './pages/homePage';

function App() {
  const history = createBrowserHistory();
  const route = useRouteStore((state) => state.route);
  const updateRoute = useRouteStore((state) => state.updateRoute);

  useEffect(() => {
    const unListen = history.listen(({ location }) => {
      updateRoute(location.pathname);
    });

    return () => {
      unListen();
    };
  }, [route]);

  return (
    <div className="bg-darkBlue w-100vw h-100vh relative">
      <TopBar />
      <HomePage />
      <NavBar route={route} history={history} />
    </div>
  );
}

export default App;
