import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNfes } from "../../store/nfe/nfeActions";
import { Bar, ComposedChart, XAxis, YAxis } from "recharts";

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

  console.log(data);

  return (
    <div>
      <ComposedChart width={800} height={400} data={data}>
        <YAxis />
        <XAxis dataKey="name" />
        <Bar dataKey="value" barSize={20} fill="#28b8bd" />
      </ComposedChart>
    </div>
  );
};

export default HomePage;
