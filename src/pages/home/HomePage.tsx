import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNfes } from "../../store/nfe/nfeActions";
import { Bar, ComposedChart, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import classNames from "./HomePage.module.scss";

const monthNames: { [key: number]: string } = {
  1: "Jan",
  2: "Fev",
  3: "Mar",
  4: "Abr",
  5: "Mai",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Set",
  10: "Out",
  11: "Nov",
  12: "Dez",
};

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { nfe, auth } = useAppSelector((state) => state);
  const { user } = auth;
  const { nfes, status } = nfe;
  const data = nfes.map((nfe) => ({
    month: nfe.date.month,
    value: nfe.value,
    name: monthNames[nfe.date.month],
  }));

  React.useEffect(() => {
    const isIdle = status === "idle";

    if (isIdle) {
      dispatch(getNfes(user?.email || ""));
    }
  }, [status, nfes, dispatch, user]);

  return (
    <div className={classNames.container}>
      <header className={classNames.header}>
        <Link to="/new">
          <button type="button">Lançar nota fiscal</button>
        </Link>
      </header>
      <main className={classNames.body}>
        <ComposedChart width={800} height={400} data={data}>
          <YAxis />
          <XAxis dataKey="name" />
          <Bar dataKey="value" barSize={20} fill="#28b8bd" />
        </ComposedChart>
      </main>
    </div>
  );
};

export default HomePage;
