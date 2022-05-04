task("transferFrom", "ERC20 transferFrom")
    .addParam("token", "Token address")
    .addParam("sender", "Sender address")
    .addParam("amount", "Token amount")
    .setAction(async function ({ token, sender, amount }, { ethers: { getSigners } }, runSuper) {
        const nearEyeToken = await ethers.getContractFactory("NearEyeToken")
        const nearEye = nearEyeToken.attach(token)
        const [recipient] = await ethers.getSigners()
        console.log(recipient.address);
        await (await nearEye.connect(recipient).transferFrom(sender, recipient.address, amount)).wait()
        console.log(`${recipient.address} has received ${amount} tokens from ${sender}`)
    });

module.exports = {};