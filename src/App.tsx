import { useEffect, useRef, useState } from 'react';
import { createBrowserHistory } from 'history';
import NavBar from './components/navBar';
import TopBar from './components/topBar';
import HomePage from './pages/homePage';
import TrendsPage from './pages/trendsPage.tsx';
import useSwipe from './customHooks/useSwipe.ts';

type Tab = 'home' | 'stats' | 'goals';

const history = createBrowserHistory();

function App() {
  const slideRef = useRef<HTMLDivElement | null>(null);
  const initialRender = useRef(true);

  const defaultTab = (history.location.hash.replace('#', '') as Tab) || 'home';

  const [tab, setTab] = useState<Tab>(defaultTab);

  useEffect(() => {
    const unListen = history.listen(({ location }) => {
      setTab((location.hash.replace('#', '') as Tab) || 'home');
    });

    return () => {
      unListen();
    };
  }, []);

  const handleSwipeLeft = () => {
    if (tab === 'home') history.push('#stats');
    else if (tab === 'stats') history.push('#goals');
  };
  const handleSwipeRight = () => {
    if (tab === 'goals') history.push('#stats');
    else if (tab === 'stats') history.push('#home');
  };

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    handleSwipeLeft,
    handleSwipeRight,
  );

  useEffect(() => {
    if (slideRef.current) {
      if (initialRender.current) {
        initialRender.current = false;
        slideRef.current.style.transition = 'none';
      } else {
        slideRef.current.style.transition =
          'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)';
      }
      slideRef.current.style.transform = `translateX(-${tab === 'home' ? 0 : tab === 'stats' ? 100 : 200}vw)`;
    }
  }, [tab]);

  return (
    <div className="bg-darkBlue w-100vw h-100dvh relative overflow-hidden">
      <TopBar />
      <div
        className="flex overflow-x-visible h-[calc(100dvh-96px)] w-[300vw]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        ref={slideRef}
      >
        <HomePage />
        <TrendsPage />
      </div>
      <NavBar tab={tab} history={history} />
    </div>
  );
}

export default App;
