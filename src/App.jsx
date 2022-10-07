import { useState, useEffect } from "react";
import SAND from "./abis/SAND";
import CHAINLINK_ORACLE from "./abis/CHAINLINK.js";
import months from "./abis/months";
import { Chart } from "react-google-charts";
import SAND_DATA from "../sand_data_09_29.js";
import SAND_PRICE from "../sand_price_09_29.js";
import { FaTwitter, FaDiscord, FaEllipsisV } from "react-icons/fa";

const options = {
  title: "Price (USD)",
  curveType: "function",
  titleTextStyle: {
    color: "#fff",
  },
  legend: {
    textStyle: {
      color: "#fff",
    },
  },
  backgroundColor: "#1a1a1a",
  hAxis: {
    textStyle: {
      color: "#fff",
    },
  },
  vAxis: {
    textStyle: {
      color: "#fff",
    },
  },
};

const options2 = {
  title: "Marked Cap (USD)",
  titleTextStyle: {
    color: "#fff",
  },
  legend: {
    textStyle: {
      color: "#fff",
    },
  },
  backgroundColor: "#1a1a1a",
  hAxis: {
    textStyle: {
      color: "#fff",
    },
  },
  vAxis: {
    textStyle: {
      color: "#fff",
    },
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
  const [price, setPrice] = useState([["Month", "Price"]]);

  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    setData([...data, ...SAND_DATA]);
    setPrice([...price, ...SAND_PRICE]);
  }, []);
  return (
    <>
      <header className="container-fuild">
        <div className="row p-3">
          <span className="col-9">
            <img src="./logo.png" alt="logo" />
          </span>
          <span className="col-3 d-flex justify-content-between">
            <a
              className="text-secondary"
              href="https://twitter.com/0xSand"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              className="text-secondary"
              href="https://discord.gg/0xSand"
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord />
            </a>
            <FaEllipsisV />
          </span>
        </div>
      </header>

      <div className="container-fuild">
        <div className="row mx-2">
          <div className="col-3 logo-verse-container marco p-0">
            <img
              className="float-start logo-verse "
              src="https://static.nftgo.io/asset/1624853691744.png"
              alt=""
            />
          </div>
          <div className="col-9 p-0 ps-3">
            <div className="marco p-3 h-100">
              <h1>The Sandbox</h1>
              <p className="text-muted">
                "A Decentralized Gaming Ecosystem Made By Players"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container marco mt-4">
        <div className="flex-row">
          <nav className="navbar col-12">
            <a className="nav-link" href="#overview">
              Overview
            </a>
            <a className="nav-link" href="#tokenomics">
              Metics
            </a>
            <a className="nav-link" href="#roadmap">
              Specs
            </a>
            <a className="nav-link" href="#team">
              Lands
            </a>
            <a className="nav-link" href="#partners">
              Asset
            </a>
            <a className="nav-link" href="#contact">
              Avatars
            </a>
          </nav>
        </div>
        <hr className="row" />
        <div className="row">
          <div className="col-6">
            <h3 className="bg-dark rounded p-2">Native Coin</h3>
            <table className="table table-dark">
              <tbody>
                <tr>
                  <th scope="row">Coin Name</th>
                  <td className="dato">SAND</td>
                </tr>
                <tr>
                  <th scope="row">Coin Value</th>
                  <td className="dato">
                    {dollarUS.format(SAND_PRICE[SAND_PRICE.length - 1][1])}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Market Cap</th>
                  <td className="dato">
                    {dollarUS.format(
                      Number(SAND_DATA[SAND_DATA.length - 1][1])
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Daily Volume</th>
                  <td className="dato">--</td>
                </tr>
                <tr>
                  <th scope="row">Circulating Supply</th>
                  <td className="dato">
                    {numberWithCommas(
                      (
                        SAND_DATA[SAND_DATA.length - 1][1] /
                        SAND_PRICE[SAND_PRICE.length - 1][1]
                      ).toFixed()
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Max Supply</th>
                  <td className="dato">3,000,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <h3 className="bg-dark rounded p-2">LAND NFTs</h3>
            <p>
              Token Name: <span className="dato">$Sand</span>
            </p>
            <p>
              Floor Price: <span className="dato">$0.93</span>
            </p>
            <p>
              Market Cap: <span className="dato">$0.93</span>
            </p>
            <p>
              Daily Volume: <span className="dato">$0.93</span>
            </p>
            <p>
              Holdes: <span className="dato">$0.93</span>
            </p>
            <p>
              Circulating: <span className="dato">$0.93</span>
            </p>
            <p>
              Max Supply: <span className="dato">$0.93</span>
            </p>
          </div>
          <div className="col-6">
            <h3 className="bg-dark rounded p-2">ASSETS / WEARABLES NFTs</h3>
            <p>
              Token Name: <span className="dato">$Sand</span>
            </p>
            <p>
              Floor Price: <span className="dato">$0.93</span>
            </p>
            <p>
              Market Cap: <span className="dato">$0.93</span>
            </p>
            <p>
              Daily Volume: <span className="dato">$0.93</span>
            </p>
            <p>
              Holdes: <span className="dato">$0.93</span>
            </p>
            <p>
              Circulating: <span className="dato">$0.93</span>
            </p>
            <p>
              Max Supply: <span className="dato">$0.93</span>
            </p>
          </div>
          <div className="col-6">
            <h3 className="bg-dark rounded p-2">Additional NFT Features</h3>
            <p>
              NFT Name: <span className="dato">$Sand</span>
            </p>
            <p>
              Floor Price: <span className="dato">$0.93</span>
            </p>
            <p>
              Market Cap: <span className="dato">$0.93</span>
            </p>
            <p>
              Daily Volume: <span className="dato">$0.93</span>
            </p>
            <p>
              Holdes: <span className="dato">$0.93</span>
            </p>
            <p>
              Circulating: <span className="dato">$0.93</span>
            </p>
            <p>
              Max Supply: <span className="dato">$0.93</span>
            </p>
          </div>
          <div className="col-12">
            <h3 className="bg-dark rounded p-2">Community Network</h3>
            <div className="d-flex justify-content-between">
              <span>
                <a
                  className="btn btn-secondary discord"
                  href="https://discord.com/invite/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
              </span>
              <span>
                <a
                  className="btn btn-secondary twitter"
                  href="https://twitter.com/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </span>
              <span>
                <a
                  className="btn btn-secondary twitch"
                  href="https://www.twitch.tv/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitch
                </a>
              </span>
              {/* <span>
                <a
                  className="btn btn-secondary telegram"
                  href="https://t.me/sandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </span>
              <span>
                <a
                  className="btn btn-secondary reddit"
                  href="https://www.reddit.com/r/TheSandboxGaming/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Reddit
                </a>
              </span> */}
              <span>
                <a
                  className="btn btn-secondary instagram"
                  href="https://www.instagram.com/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </span>
              <span>
                <a
                  className="btn btn-secondary facebook"
                  href="https://www.facebook.com/TheSandboxGame/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </span>
              <span>
                <a
                  className="btn btn-secondary youtube"
                  href="https://www.youtube.com/channel/UCzv1t7voB-bxMmXLysT4h0w"
                >
                  Youtube
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <h3 className="bg-dark rounded p-2 mx-2">Metaverse Performance</h3>
          <div className="col-10 offset-1">
            <div className="container marco bg-secondary p-3 display m-4">
              <Chart
                className="m-0"
                chartType="LineChart"
                data={data}
                options={options2}
                width="100%"
                height="300px"
                legendToggle
              />
            </div>
          </div>
          <div className="col-10 offset-1">
            <div className="container marco bg-secondary p-3 display m-4">
              <Chart
                className="m-0"
                chartType="LineChart"
                data={price}
                options={options}
                width="100%"
                height="300px"
                legendToggle
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
