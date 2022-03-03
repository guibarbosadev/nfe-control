import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNfes } from "../../store/nfe/nfeActions";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { nfe, auth } = useAppSelector((state) => state);
  const { user } = auth;
  const { nfes, status } = nfe;

  React.useEffect(() => {
    const isIdle = status === "idle";

    if (isIdle) {
      dispatch(getNfes(user?.email || ""));
    }
  }, [status, nfes, dispatch, user]);

  return <div>HomePage</div>;
};

export default HomePage;
