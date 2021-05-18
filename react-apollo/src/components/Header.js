import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const Header = () => {
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">


        {/*{authToken && (*/}
        {/*  <div className="flex">*/}
        {/*    <div className="ml1">|</div>*/}
        {/*    <Link*/}
        {/*      to="/create"*/}
        {/*      className="ml1 no-underline black"*/}
        {/*    >*/}
        {/*      Retrieve Posts from economist.com*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              sessionStorage.clear();
              history.push(`/`);
              history.go(0);
            }}
          >
            logout
          </div>
        ) : (
          <Link
            to="/login"
            className="ml1 no-underline black"
          >
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
