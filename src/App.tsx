import { createBrowserHistory } from 'history';
import NavBar from './components/navBar';
import TopBar from './components/topBar';
import { useEffect } from 'react';
import useRouteStore from './stores/routeStore';

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
      <NavBar route={route} history={history} />
    </div>
  );
}

export default App;
