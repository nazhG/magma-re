import fs from "fs";
import Web3 from "web3";
import EthDater from "ethereum-block-by-date";

const web3 = new Web3(
  "https://mainnet.infura.io/v3/076ccce983354a8cb12a6e50ef3e42aa"
);
const BN = web3.utils.BN;
const dater = new EthDater(web3);

let blocks = await dater.getEvery(
  'hours',
  '2019-09-02T12:00:00Z',
  '2019-09-30T12:00:00Z',
);

console.log(blocks);

// let blockNumberTarget = _blocknumber || blockNumber;

// let { answer: price } = await priceFeed.methods
//   .latestRoundData()
//   .call({}, blockNumberTarget);
// price /= 1e8;

// const AdvisorsBalance = new BN(
//   await Sand.methods.balanceOf(Advisors).call({}, blockNumberTarget)
// );
// const CompanyBalance = new BN(
//   await Sand.methods.balanceOf(Company).call({}, blockNumberTarget)
// );
// const TeamBalance = new BN(
//   await Sand.methods.balanceOf(Team).call({}, blockNumberTarget)
// );
// const FoundationBalance = new BN(
//   await Sand.methods.balanceOf(Foundation).call({}, blockNumberTarget)
// );

// const LiquidSupply = totalSupply
//   .sub(AdvisorsBalance)
//   .sub(CompanyBalance)
//   .sub(TeamBalance)
//   .sub(FoundationBalance)
//   .mul(new BN(price));

// console.log("Price", Price, "LiquidSupply", LiquidSupply);

// // fs.appendFile("mynewfile1.txt", "Hello content!\n", function (err) {
// //   if (err) throw err;
// //   console.log("Saved!");
// // });
