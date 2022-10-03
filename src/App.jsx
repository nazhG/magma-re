import { useState, useEffect } from "react";
import SAND from "./abis/SAND";
import CHAINLINK_ORACLE from "./abis/CHAINLINK.js";
import months from "./abis/months";
import { Chart } from "react-google-charts";
import SAND_DATA from "../sand_data_09_29.js";

const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: {
    ticks: ["$8.00", "$6.00", "$4.00", "$2.00", "$0.00"],
  },
};

const web3 = new Web3(
  "https://mainnet.infura.io/v3/076ccce983354a8cb12a6e50ef3e42aa"
);

const Advisors = "0x07d2601739709C25FE0AfD50EC961BA589311CaA";
const Company = "0x2F2456953A2cBc21fdE058D33fb2aD8D59E72A35";
const Team = "0x5f5B8942aE6325227d5d82e5759E837271Fa2a67";
const Foundation = "0x8FFA64FB50559c3Ff09a1022b84B2c5233ed8068";

function App() {
  const [liquityBalance, setLiquityBalance] = useState(0);
  const [currentBlockNumber, setcurrentBlockNumber] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [data, setData] = useState([["Month", "Liquid Supply"]]);

  useEffect(() => {
    setData([...data, ...SAND_DATA]);
  }, []);
  return (
    <>
      <h1>
        Magma-Re / current block num: {currentBlockNumber} - time: {currentTime}{" "}
      </h1>

      {/* <button onClick={getSandBalance}>
        Get Sand Liquity Balance: {liquityBalance}
      </button> */}
      <hr />

      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        width="80%"
        height="400px"
        legendToggle
      />
    </>
  );
}

export default App;
