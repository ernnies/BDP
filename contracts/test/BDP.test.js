const { expect } = require("chai");

describe("BDP", function () {
  let BDP, bdp, owner, trader;

  beforeEach(async function () {
    [owner, trader] = await ethers.getSigners();
    BDP = await ethers.getContractFactory("BDP");
    bdp = await BDP.deploy();
    await bdp.deployed();
  });

  it("should place an order", async function () {
    const amount = ethers.utils.parseUnits("1", 18);
    const price = ethers.utils.parseUnits("50000", 18);
    const commitment = ethers.utils.randomBytes(32);
    const pubKeyX = ethers.utils.randomBytes(32);
    const messageHash = ethers.utils.randomBytes(32);
    const signature = ethers.utils.randomBytes(64);

    await expect(
      bdp.connect(trader).placeOrder(amount, price, true, commitment, pubKeyX, messageHash, signature)
    ).to.emit(bdp, "OrderPlaced");
  });

  it("should match orders", async function () {
    const amount = ethers.utils.parseUnits("1", 18);
    const price = ethers.utils.parseUnits("50000", 18);
    const commitment = ethers.utils.randomBytes(32);
    const pubKeyX = ethers.utils.randomBytes(32);
    const messageHash = ethers.utils.randomBytes(32);
    const signature = ethers.utils.randomBytes(64);

    await bdp.connect(trader).placeOrder(amount, price, true, commitment, pubKeyX, messageHash, signature);
    await bdp.connect(trader).placeOrder(amount, price, false, commitment, pubKeyX, messageHash, signature);
    await expect(bdp.matchOrders(1, 2)).to.emit(bdp, "OrderMatched");
  });
});