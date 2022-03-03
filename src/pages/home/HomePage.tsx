import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNfes } from "../../store/nfe/nfeActions";
import { logout as createLogoutAction } from "../../store/auth/authActions";
import {
  Bar,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import classNames from "./HomePage.module.scss";
import { formatMoney, NFE_TOTAL_BY_YEAR } from "../../app/util";
import { filterNfes } from "../../store/nfe/nfeSlice";
import { NfeGraphModes } from "../../store/nfe/nfeTypes";

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
  const {
    nfes,
    remainingTotal,
    status,
    filter,
    totalsByMonth: nfesTotalByMonth,
  } = nfe;
  const logout = () => {
    dispatch(createLogoutAction());
  };
  const hasNfes = nfesTotalByMonth.length > 0;
  const pieData = [
    { name: "Valor disponível", value: remainingTotal },
    { name: "Valor emitido", value: NFE_TOTAL_BY_YEAR - remainingTotal },
  ];

  const onSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterNfes({ ...filter, year: Number(event.target.value) }));
  };

  const onSelectGraphMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      filterNfes({ ...filter, graph: event.target.value as NfeGraphModes })
    );
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
          <div className={classNames.selectsContainer}>
            <select value={filter.year} onChange={onSelectYear}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select value={filter.graph} onChange={onSelectGraphMode}>
              <option value={NfeGraphModes.TotalByMonth}>
                Total mês a mês
              </option>
              <option value={NfeGraphModes.RemainingTotal}>
                Total restante
              </option>
            </select>
          </div>

          {!hasNfes ? (
            <div className={classNames.defaultMessage}>
              Não há NFe-s registradas para o período
            </div>
          ) : (
            <>
              {filter.graph === NfeGraphModes.TotalByMonth && (
                <ComposedChart width={800} height={400} data={nfesTotalByMonth}>
                  <YAxis />
                  <Tooltip formatter={formatMoney} />
                  <XAxis dataKey="name" />
                  <Bar dataKey="total" barSize={20} fill="#28b8bd" />
                </ComposedChart>
              )}
              {filter.graph == NfeGraphModes.RemainingTotal && (
                <PieChart width={800} height={400}>
                  <Pie data={pieData} dataKey="value" nameKey="name">
                    <Cell fill="#8ecc8d" />
                    <Cell fill="#e76558" />
                  </Pie>
                  <Tooltip formatter={formatMoney} />
                </PieChart>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
