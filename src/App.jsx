import { useState, useEffect } from "react";
import SAND from "./abis/SAND";
import CHAINLINK_ORACLE from "./abis/CHAINLINK.js";
import OPEN_SEA_RESPONSE from "./abis/open_sea_response.js";
import months from "./abis/months";
import { Chart } from "react-google-charts";
import SAND_DATA from "../sand_data_09_29.js";
import SAND_PRICE from "../sand_price_09_29.js";
import { FaTwitter, FaDiscord, FaEllipsisV, FaEthereum } from "react-icons/fa";
import axios from "axios";

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
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [metaverseActive, setMetaverseActive] = useState(0);

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    if (name === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const {
    collection: { stats },
  } = OPEN_SEA_RESPONSE;

  useEffect(() => {

    //https://api.opensea.io/api/v1/collection/decentraland
    axios.get('https://api.opensea.io/api/v1/collection/sandbox').then(resp => {
      console.log(resp.data)
    })


    axios.get(`https://seahorse-app-caibw.ondigitalocean.app/price/${ metaverses[metaverseActive].token }/${new Date(startDate).getTime()}/${endDate ? (new Date(endDate).getTime()) : 9999999999999999}`).then(resp => {
      const data0 = resp.data.map(
        (item) => {
          const date = new Date(item.date);
          return { c: [{ v: `${date.getDay()}/${date.getMonth()}` }, { v: Number(item.price) }] }
        }
      );
      setData({
        cols: [{ id: 'task', label: 'Task', type: 'string' },
        { id: 'hours', label: 'Price', type: 'number' }],
        rows: data0
      });
      console.log(data);
    });

  }, [startDate, endDate, metaverseActive]);

  const metaverses = [
    {
      name: "Sandbox",
      token: "SAND",
      address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
      image: "https://static.nftgo.io/asset/1624853691744.png",
      link: "https://sandbox.game/",
      tittle: "A Decentralized Gaming Ecosystem Made By Players",
      description: "The Sandbox is a community-driven platform where creators can monetize voxel assets and gaming experiences on the blockchain. The Sandbox metaverse comprises a map made up of 166,464 LANDS. LAND owners can host contests and events, stake SAND to earn and customize assets, monetize assets and experiences, vote in the metaverse governance, play games that you or others create, and more! Trade the collection and keep your eyes peeled for future drops",
    },
    {
      name: "Decentraland",
      token: "MANA",
      address: "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
      image: "https://static.nftgo.io/asset/1626416314237.png",
      link: "https://decentraland.org/",
      tittle: "Create, explore and trade in the first-ever virtual world owned by its users.",
      description: "No description.",
    },
    {
      name: "Somnium Space",
      token: "CUBE",
      address: "0xdf801468a808a32656d2ed2d2d80b72a129739f4",
      image: "https://lh3.googleusercontent.com/mzUNo5vk95qQfpAbXir0_6oJmZlyqnq_ix3BIjmfeVGrFPoxeAqf-vYHMvh115bSdJGxRtgGTWKldOzdJQGtEqGW=s130",
      link: "https://somniumspace.com/",
      tittle: "SOMNIUM SPACE IS A VIRTUAL REALITY WORLD: Open, Social & Persistent.",
      description: "Somnium Space is a virtual world where you can create, play, and monetize your content. It’s a place where you can be anyone you want to be, and do anything you want to do. It’s a place where you can be anyone you want to be, and do anything you want to do.",
    },
    {
      name: "Voxels",
      token: "VOXEL",
      address: "0xd0258a3fd00f38aa8090dfee343f10a9d4d30d3f",
      image: "https://www.voxels.com/images/Voxels_logo_128.png",
      link: "https://www.voxels.com/",
      tittle: "A USER-OWNED VIRTUAL WORLD: Players can buy land, build on it, customize their avatar with wearable NFTs and more!",
      description: "No description.",
    },
    {
      name: "Otherside",
      token: "$APE",
      address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
      image: "https://lh3.googleusercontent.com/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI=s120",
      link: "https://otherside.xyz/",
      tittle: "ENTER the OTHERSIDE",
      description: "Otherside is a gamified, interoperable metaverse currently under development. The game blends mechanics from massively multiplayer online role playing games (MMORPGs) and web3-enabled virtual worlds. Think of it as a metaRPG where the players own the world, your NFTs can become playable characters, and thousands can play together in real time.",
    },

  ];
  return (
    <>
      <header className="container-fuild">
        <div className="col-12 row p-3">
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
      <div className="container">
        <div className="row">
          <nav class="nav">
            {metaverses.map((metaverse, index) => (
              <a class="nav-link primary" href="#"
                onClick={() => setMetaverseActive(index)}  >
                {metaverse.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="container-fuild">
        <div className="row mx-2">
          <div className="col-3 logo-verse-container marco p-0">
            <img
              className="float-start logo-verse "
              src={metaverses[metaverseActive].image}
              alt=""
            />
          </div>
          <div className="col-9 p-0 ps-3">
            <div className="marco p-3 h-100">
              <h1>
                {metaverses[metaverseActive].name}
              </h1>
              <p className="text-muted">
                {metaverses[metaverseActive].description}
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
          <div className="col-12 col-md-6">
            <h3 className="bg-dark rounded p-2">Native Coin</h3>
            <table className="table table-dark">
              <tbody>
                <tr>
                  <th scope="row">Coin Name</th>
                  <td className="dato">SAND</td>
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
                  <th scope="row">Coin Value</th>
                  <td className="dato">
                    {dollarUS.format(SAND_PRICE[SAND_PRICE.length - 1][1])}
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
          <div className="col-12 col-md-6">
            <h3 className="bg-dark rounded p-2">LAND NFTs</h3>
            <table className="table table-dark">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td className="dato">LAND</td>
                </tr>
                <tr>
                  <th scope="row">Market Cap</th>
                  <td className="dato">{dollarUS.format(stats.market_cap)}</td>
                </tr>
                <tr>
                  <th scope="row">Asset</th>
                  <td className="dato">{numberWithCommas(stats.total_supply)}</td>
                </tr>
                <tr>
                  <th scope="row">Owners</th>
                  <td className="dato">{numberWithCommas(stats.num_owners)}</td>
                </tr>
                <tr>
                  <th scope="row">Floor Price</th>
                  <td className="dato"><FaEthereum />{stats.floor_price.toFixed(3)}</td>
                </tr>
                <tr>
                  <th scope="row">Average Price</th>
                  <td className="dato"><FaEthereum />{stats.average_price.toFixed(3)}</td>
                </tr>
                <tr>
                  <th scope="row">Volumen (24h)**</th>
                  <td className="dato"><FaEthereum />{stats.one_day_volume.toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="col-6">
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
          </div> */}
          <div className="col-12">
            <h3 className="bg-dark rounded p-2">Community Network</h3>
            <div className="d-flex d-flex flex-wrap justify-content-between">
              <span className="mt-1">
                <a
                  className="btn btn-secondary discord"
                  href="https://discord.com/invite/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
              </span>
              <span className="mt-1">
                <a
                  className="btn btn-secondary twitter"
                  href="https://twitter.com/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </span>
              <span className="mt-1">
                <a
                  className="btn btn-secondary twitch"
                  href="https://www.twitch.tv/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitch
                </a>
              </span>
              <span className="mt-1">
                <a
                  className="btn btn-secondary instagram"
                  href="https://www.instagram.com/thesandboxgame"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </span>
              <span className="mt-1">
                <a
                  className="btn btn-secondary facebook"
                  href="https://www.facebook.com/TheSandboxGame/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </span>
              <span className="mt-1">
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
          <h3 className="bg-dark rounded p-2">Metaverse Performance</h3>
          <div className="col-12 col-md-10 offset-md-1 d-flex justify-content-around mt-4">
            <input type="date" name="start" id="start"

              value={startDate}
              onChange={handleDateChange}

            />
            <input type="date" name="end" id="end"

              value={endDate}
              onChange={handleDateChange}

            />
          </div>

          <div className="col-12 col-md-10 offset-md-1">
            <div className="container marco bg-secondary p-3 display mt-4">
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
        </div>
      </div>
    </>
  );
}

export default App;
