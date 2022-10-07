import fs from "fs";
import Web3 from "web3";
import EthDater from "ethereum-block-by-date";
import CHAINLINK_ORACLE from "../src/abis/CHAINLINK.js";
import SAND from "../src/abis/SAND.js";
import PAIR_ABI from "../src/abis/pair_uniswap.js";

const web3 = new Web3(
  // "https://greatest-falling-dinghy.discover.quiknode.pro/d471dd0a80b083394e8f01131feef4537db4cb99"
  "https://mainnet.infura.io/v3/076ccce983354a8cb12a6e50ef3e42aa"
  // "https://eth-mainnet.g.alchemy.com/v2/xTjjDopaEnsWTFFEVEmvQIrD3z6VLDBA"
);
const BN = web3.utils.BN;
const dater = new EthDater(web3);
const date_start = new Date();
const date_end = date_start.getDate() - 7;
let blocks = await dater.getEvery(
  "days",
  "2021-10-07T00:00:00Z",
  "2022-10-07T00:00:00Z",
  1
);

const PAIR_SAND_USDC = "0x5864DEa5f1750D1f8887F9FB7f3a50F15789514E";
const pair_sand_usdc = new web3.eth.Contract(PAIR_ABI, PAIR_SAND_USDC);

const Advisors = "0x07d2601739709C25FE0AfD50EC961BA589311CaA";
const Company = "0x2F2456953A2cBc21fdE058D33fb2aD8D59E72A35";
const Team = "0x5f5B8942aE6325227d5d82e5759E837271Fa2a67";
const Foundation = "0x8FFA64FB50559c3Ff09a1022b84B2c5233ed8068";

const pair = new web3.eth.Contract(PAIR_ABI, "0x1b40183efb4dd766f11bda7a7c3ad8982e998421");

const Sand = new web3.eth.Contract(
  SAND,
  "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"
);

const sleep = (milliseconds) => {
  console.log('witing');
  
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const write = async () => {
  let content = "export default [\n";
  let content2 = "export default [\n";
  const totalSupply = new BN(await Sand.methods.totalSupply().call());

  for (const i of blocks) {
    let blockNumberTarget = i.block;
    console.log(i, "of ", blocks.length);

    const { sqrtPriceX96 } = await pair_sand_usdc.methods.slot0().call({}, blockNumberTarget);
    const sqrtPriceinUsdc = new BN(sqrtPriceX96);
    const sqrtPrice = sqrtPriceinUsdc.mul(sqrtPriceinUsdc);
    const base = new BN(2).pow(new BN(192)).div(new BN(1e6));

    const price = sqrtPrice.mul(new BN(1e8)).div(base);

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

    await sleep(100);

    const LiquidSupply = totalSupply
      .sub(AdvisorsBalance)
      .sub(CompanyBalance)
      .sub(TeamBalance)
      .sub(FoundationBalance)
      .mul(new BN(price))
      .div(new BN(1e14))
      .div(new BN(1e6));

     const pricesFormated = Number(price)/100;

    content += `["${i.date.toString()}",${LiquidSupply.toString()}],\n`;
    content2 += `["${i.date.toString()}",${pricesFormated.toString()}],\n`;

    console.log(
      "blockNumberTarget",
      blockNumberTarget,
      "price",
      price.toString(),
      "LiquidSupply",
      LiquidSupply.toString()
    );
  }
  content += "];";
  content2 += "];";
  fs.writeFileSync("sand_data_09_29.js", content);
  fs.writeFileSync("sand_price_09_29.js", content2);
};

write();