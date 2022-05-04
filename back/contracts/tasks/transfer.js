require("@nomiclabs/hardhat-web3");

task("transfer", "ERC20 transfer")
    .addParam("token", "Token address")
    .addParam("spender", "Spender address")
    .addParam("amount", "Token amount")
    .setAction(async function ({ token, spender, amount }, { ethers: { getSigners } }, runSuper) {
        const nearEyeToken = await ethers.getContractFactory("NearEyeToken")
        const nearEye = nearEyeToken.attach(token)
        const [minter] = await ethers.getSigners();
        await (await nearEye.connect(minter).transfer(spender, amount)).wait()
        console.log(`${minter.address} has transferred ${amount} tokens to ${spender}`);
    });

module.exports = {};