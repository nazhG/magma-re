import { useState } from "react";
import SAND from "./abis/SAND";

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

  // https://mainnet.infura.io/v3/076ccce983354a8cb12a6e50ef3e42aa

  const Sand = new web3.eth.Contract(
    SAND,
    "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"
  );

  const BN = web3.utils.BN;

  const format = (amount) => {
    return amount
      .toString()
      .substring(0, amount.toString().length - 18)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatTime = (time) => {
    console.log(time);
    
    const date = new Date(time * 1000);
    return date.toLocaleString();
  };

  const getSandBalance = async () => {
    const blockNumber = await web3.eth.getBlockNumber()
    setcurrentBlockNumber(blockNumber)

    const time = await web3.eth.getBlock(blockNumber)
    setcurrentTime(formatTime(time.timestamp))

    const totalSupply = new BN(await Sand.methods.totalSupply().call());

    const AdvisorsBalance = new BN(
      await Sand.methods.balanceOf(Advisors).call()
    );
    const CompanyBalance = new BN(await Sand.methods.balanceOf(Company).call());
    const TeamBalance = new BN(await Sand.methods.balanceOf(Team).call());
    const FoundationBalance = new BN(
      await Sand.methods.balanceOf(Foundation).call()
    );

    console.log("totalSupply", format(totalSupply));
    console.log("AdvisorsBalance", format(AdvisorsBalance));
    console.log("CompanyBalance", format(CompanyBalance));
    console.log("TeamBalance", format(TeamBalance));
    console.log("FoundationBalance", format(FoundationBalance));

    const liquidSupply = totalSupply
      .sub(AdvisorsBalance)
      .sub(CompanyBalance)
      .sub(TeamBalance)
      .sub(FoundationBalance);

    console.log("liquidSupply", format(liquidSupply));

    setLiquityBalance(format(liquidSupply));
  };

  return (
    <>
      <h1>Magma-Re / current block num: {currentBlockNumber} - time: {currentTime} </h1>

      <button onClick={getSandBalance}>Get Sand Liquity Balance: {liquityBalance}</button>
    </>
  );
}

export default App;
