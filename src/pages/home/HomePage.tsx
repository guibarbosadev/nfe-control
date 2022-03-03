import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNfes } from "../../store/nfe/nfeActions";
import { logout as createLogoutAction } from "../../store/auth/authActions";
import { Bar, ComposedChart, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import classNames from "./HomePage.module.scss";
import { formatMoney, getNfesTotalByMonth } from "../../app/util";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { nfe, auth } = useAppSelector((state) => state);
  const { user } = auth;
  const { nfes, status } = nfe;
  const nfesTotalByMonth = getNfesTotalByMonth(new Date().getFullYear(), nfes);
  const logout = () => {
    dispatch(createLogoutAction());
  };

  React.useEffect(() => {
    const isIdle = status === "idle";

    if (isIdle) {
      dispatch(getNfes(user?.email || ""));
    }
  }, [status, nfes, dispatch, user]);

  return (
    <div className={classNames.container}>
      <header className={classNames.header}>
        <button type="button" onClick={logout}>
          Sair
        </button>
        <Link to="/new">
          <button type="button">Lançar nota fiscal</button>
        </Link>
      </header>
      <main className={classNames.body}>
        <ComposedChart width={800} height={400} data={nfesTotalByMonth}>
          <YAxis />
          <Tooltip formatter={formatMoney} />
          <XAxis dataKey="name" />
          <Bar dataKey="total" barSize={20} fill="#28b8bd" />
        </ComposedChart>
      </main>
    </div>
  );
};

export default HomePage;
