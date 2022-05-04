task("totalSupply", "Total supply of ERC20 token")
.addParam("token", "Token address")
.setAction(async function ({ token }, { ethers: { getSigners } }, runSuper) {
  const nearEyeToken = await ethers.getContractFactory("NearEyeToken")
  const nearEye = nearEyeToken.attach(token)
  const [minter] = await ethers.getSigners();
  const totalSupply = (await (await nearEye.connect(minter)).totalSupply()).toNumber()
  console.log(`Total Supply is ${totalSupply}`);
});

module.exports = {};