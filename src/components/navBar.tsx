import React from 'react';
import cn from 'classnames';
import type { BrowserHistory } from 'history';

interface NavBarProps {
  route: string;
  history: BrowserHistory;
}

const NavBar: React.FC<NavBarProps> = ({ route, history }) => {
  console.log(route); 
  return (
    <div className="absolute bottom-0 bg-navBlue flex  w-full h-[64px] items-center justify-around">
      <div
        className={cn('i-material-symbols:home-app-logo text-2xl', {
          'text-primaryBlue': ['', '/'].includes(route),
          'text-secondaryWhite': !['', '/'].includes(route),
        })}
        onClick={() => history.push('/')}
      />
      <div
        className={cn('i-material-symbols:bar-chart-rounded text-2xl', {
          'text-primaryBlue': route === '/stats',
          'text-secondaryWhite': route !== '/stats',
        })}
        onClick={() => history.push('/stats')}
      />
      <div
        className={cn('i-material-symbols:target text-2xl', {
          'text-primaryBlue': route === '/goals',
          'text-secondaryWhite': route !== '/goals',
        })}
        onClick={() => history.push('/goals')}
      />
    </div>
  );
};

export default NavBar;
