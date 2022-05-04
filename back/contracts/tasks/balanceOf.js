task("balanceOf", "Total supply of ERC20 token")
.addParam("token", "Token address")
.addParam("account", "Account address")
.setAction(async function ({ token, account }, { ethers: { getSigners } }, runSuper) {
  const nearEyeToken = await ethers.getContractFactory("NearEyeToken")
  const nearEye = nearEyeToken.attach(token)
  const [minter] = await ethers.getSigners();
  const balance = (await (await nearEye.connect(minter)).balanceOf(account)).toNumber()
  console.log(`Account ${account} has a total token balance:  ${balance} WTM`);
});

module.exports = {};