import { useState, useEffect } from "react";
import SAND from "./abis/SAND";
import CHAINLINK_ORACLE from "./abis/CHAINLINK.js";
import months from "./abis/months";
import { Chart } from "react-google-charts";

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

  // https://mainnet.infura.io/v3/076ccce983354a8cb12a6e50ef3e42aa

  const Sand = new web3.eth.Contract(
    SAND,
    "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"
  );

  const priceFeed = new web3.eth.Contract(
    CHAINLINK_ORACLE,
    "0x35E3f7E558C04cE7eEE1629258EcbbA03B36Ec56"
  );

  const BN = web3.utils.BN;

  const format = (amount) => {
    return amount.toString().substring(0, amount.toString().length - 18);
    // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleString();
  };

  let totalSupply = 0;

  const getSandBalance = async (month) => {
    const blockNumber = await web3.eth.getBlockNumber();
    setcurrentBlockNumber(blockNumber);

    const time = await web3.eth.getBlock(blockNumber);
    setcurrentTime(formatTime(time.timestamp));

    let blockNumberTarget = month.blocknumber || blockNumber;

    const { answer: price } = await priceFeed.methods
      .latestRoundData()
      .call({}, blockNumberTarget);
    console.log(price / 1e8);
    const AdvisorsBalance = new BN(
      await Sand.methods.balanceOf(Advisors).call({}, blockNumberTarget)
    );
    const CompanyBalance = new BN(
      await Sand.methods.balanceOf(Company).call({}, blockNumberTarget)
    );
    const TeamBalance = new BN(
      await Sand.methods.balanceOf(Team).call({}, blockNumberTarget)
    );
    const FoundationBalance = new BN(
      await Sand.methods.balanceOf(Foundation).call({}, blockNumberTarget)
    );

    const liquidSupply = totalSupply
      .sub(AdvisorsBalance)
      .sub(CompanyBalance)
      .sub(TeamBalance)
      .sub(FoundationBalance)
      .mul(new BN(price));

    // console.table({
    //   month: month.month,
    //   blockNumberTarget,
    //   totalSupply: format(totalSupply),
    //   AdvisorsBalance: format(AdvisorsBalance),
    //   CompanyBalance: format(CompanyBalance),
    //   TeamBalance: format(TeamBalance),
    //   FoundationBalance: format(FoundationBalance),
    //   liquidSupply: format(liquidSupply),
    // });

    return liquidSupply;
  };

  const getSupply = async () => {
    totalSupply = new BN(await Sand.methods.totalSupply().call());
  };

  useEffect(() => {
    getSupply();
    const getData = async (blockNumber) => {
      let monthsData = [];
      for (const month of months) {
        monthsData = [
          ...monthsData,
          [month.month, Number(format(await getSandBalance(month)))],
        ];
      }

      setData([...data, ...monthsData]);
    };

    getData();
  }, []);
  return (
    <>
      <h1>
        Magma-Re / current block num: {currentBlockNumber} - time: {currentTime}{" "}
      </h1>

      <button onClick={getSandBalance}>
        Get Sand Liquity Balance: {liquityBalance}
      </button>
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
