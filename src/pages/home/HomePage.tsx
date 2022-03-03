import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNfes } from "../../store/nfe/nfeActions";
import { logout as createLogoutAction } from "../../store/auth/authActions";
import { Bar, ComposedChart, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import classNames from "./HomePage.module.scss";
import { formatMoney, getNfesTotalByMonth } from "../../app/util";
import { filterNfes } from "../../store/nfe/nfeSlice";

const currentDate = new Date();
const yearsCount = 20;
const startDate = currentDate.getFullYear();
const years = Array.from({ length: yearsCount }).map(
  (_, index) => startDate - index
);

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { nfe, auth } = useAppSelector((state) => state);
  const { user } = auth;
  const { nfes, status, filter, totalsByMonth: nfesTotalByMonth } = nfe;
  const logout = () => {
    dispatch(createLogoutAction());
  };
  const hasNfes = nfesTotalByMonth.length > 0;

  const onSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterNfes({ ...filter, year: Number(event.target.value) }));
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
        <div className={classNames.graphContainer}>
          <select value={filter.year} onChange={onSelectYear}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {hasNfes ? (
            <ComposedChart width={800} height={400} data={nfesTotalByMonth}>
              <YAxis />
              <Tooltip formatter={formatMoney} />
              <XAxis dataKey="name" />
              <Bar dataKey="total" barSize={20} fill="#28b8bd" />
            </ComposedChart>
          ) : (
            <div className={classNames.defaultMessage}>
              Não há NFe-s registradas para o período
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
