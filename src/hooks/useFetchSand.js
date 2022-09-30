import { useState } from "react";

export const useFetchSand = (web3, BN, _blocknumber) => {
  const [Price, setPrice] = useState();
  const [AdvisorsBalance, setAdvisorsBalance] = useState();
  const [CompanyBalance, setCompanyBalance] = useState();
  const [TeamBalance, setTeamBalance] = useState();
  const [FoundationBalance, setFoundationBalance] = useState();
  const [LiquidSupply, setLiquidSupply] = useState();

  const fetch = async () => {
    let blockNumberTarget = _blocknumber || blockNumber;

    const { answer: price } = await priceFeed.methods
      .latestRoundData()
      .call({}, blockNumberTarget);
    setPrice(price / 1e8);

    setAdvisorsBalance(
      new BN(await Sand.methods.balanceOf(Advisors).call({}, blockNumberTarget))
    );
    setCompanyBalance(
      new BN(await Sand.methods.balanceOf(Company).call({}, blockNumberTarget))
    );
    setTeamBalance(
      new BN(await Sand.methods.balanceOf(Team).call({}, blockNumberTarget))
    );
    setFoundationBalance(
      new BN(
        await Sand.methods.balanceOf(Foundation).call({}, blockNumberTarget)
      )
    );

    setLiquidSupply(
      totalSupply
        .sub(AdvisorsBalance)
        .sub(CompanyBalance)
        .sub(TeamBalance)
        .sub(FoundationBalance)
        .mul(new BN(price))
    );
  };

  fetch();

  return {
    Price,
    AdvisorsBalance,
    CompanyBalance,
    TeamBalance,
    FoundationBalance,
    LiquidSupply
  };
};
