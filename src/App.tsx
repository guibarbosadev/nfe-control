import React from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Router from "./app/Router";
import { getCurrentUser } from "./store/authActions";
import "./global.scss";

function App(): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const getUser = React.useCallback(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  React.useEffect(getUser, [getUser]);
  return <Router />;
}

export default App;
