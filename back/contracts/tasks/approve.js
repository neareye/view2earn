require("@nomiclabs/hardhat-web3");

task("approve", "ERC20 approve")
    .addParam("token", "Token address")
    .addParam("spender", "Spender address")
    .addParam("amount", "Token amount")
    .setAction(async function ({ token, spender, amount }, { ethers: { getSigners } }, runSuper) {
        const nearEyeToken = await ethers.getContractFactory("NearEyeToken")
        const nearEye = nearEyeToken.attach(token)
        const [sender] = await ethers.getSigners();
        await (await nearEye.connect(sender).approve(spender, amount)).wait()
        console.log(`${sender.address} has approved ${amount} tokens to ${spender}`);
    });

module.exports = {};