import React from 'react';
import cn from 'classnames';
import type { BrowserHistory } from 'history';

interface NavBarProps {
  tab: 'home' | 'stats' | 'goals';
  history: BrowserHistory;
}

const NavBar: React.FC<NavBarProps> = ({ tab, history }) => {
  return (
    <div className="absolute bottom-0 bg-navBlue flex  w-full h-[48px] items-center justify-around">
      <div
        className={cn('i-material-symbols:home-app-logo text-2xl', {
          'text-primaryBlue': tab === 'home',
          'text-secondaryWhite': tab !== 'home',
        })}
        onClick={() => history.push('#home')}
      />
      <div
        className={cn('i-material-symbols:bar-chart-rounded text-2xl', {
          'text-primaryBlue': tab === 'stats',
          'text-secondaryWhite': tab !== 'stats',
        })}
        onClick={() => history.push('#stats')}
      />
      <div
        className={cn('i-material-symbols:target text-2xl', {
          'text-primaryBlue': tab === 'goals',
          'text-secondaryWhite': tab !== 'goals',
        })}
        onClick={() => history.push('#goals')}
      />
    </div>
  );
};

export default NavBar;
