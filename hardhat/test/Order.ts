import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { OrderContract, OrderContract__factory } from "../typechain-types";

describe("OrderContract", function () {
  let OrderContract: OrderContract__factory;
  let orderContract: OrderContract;
  let seller: SignerWithAddress;
  let buyer: SignerWithAddress;
  let orderId: string;

  before(async function () {
    OrderContract = await ethers.getContractFactory("OrderContract");
    [seller, buyer] = await ethers.getSigners();
    orderContract = await OrderContract.deploy();
    await orderContract.deployed();

    orderId = "order_id";
  });

  it("Should create an order", async function () {
    const projectBudget = ethers.utils.parseEther("1.0");

    const buyerBrief = {
      projectTitle: "Test Project",
      projectDescription: "This is a test project.",
      projectBudget: projectBudget,
      projectDeadline: "2023-11-30",
      projectFiles: [],
    };

    const sellersSummary = "This is the seller's summary.";
    const sellerWallet = await seller.getAddress();

    await orderContract.connect(seller).createOrder(
      orderId,
      "buyerId",
      "sellerId",
      sellerWallet,
      "123",
      buyerBrief,
      sellersSummary
    );

    const order = await orderContract.getOrder(orderId);
    expect(order.buyersBrief.projectBudget).to.equal(projectBudget);
  });

  it("Should create milestones", async function () {
    // Create 3 milestones
    for (let i = 0; i < 3; i++) {
      await orderContract.connect(seller).addMilestone(orderId, {
        id: i,
        title: `Milestone ${i + 1}`,
        description: `Description for milestone ${i + 1}`,
        amount: ethers.utils.parseEther("0.3"),
        deadline: "2023-11-10",
        files: ["file1", "file2"],
        state: 0,
        completedAt: "",
        paidAt: "",
      });
    }

    const milestones = await orderContract.getMilestones(orderId);
    expect(milestones.length).to.equal(3);
  });

  it("Should sign an order", async function () {
    await orderContract.connect(buyer).signOrder(orderId, { value: ethers.utils.parseEther("1.0") });

    const order = await orderContract.getOrder(orderId);
    expect(order.buyerWallet).to.equal(await buyer.getAddress());
  });

  it("Should check smart contract fund when the buyer has signed the contract", async function () {
    const depositedFunds = await orderContract.getDepositedFunds(orderId);
    expect(depositedFunds).to.equal(ethers.utils.parseEther("1.0"));
  });

  it("Should release milestone funds", async function () {
    await orderContract.connect(buyer).releaseMilestoneFunds(orderId, 0);

    const order = await orderContract.getOrder(orderId);
    expect(order.status).to.equal(2); // OrderStatus.OnGoing
  });

  it("Should cancel an order", async function () {
    await orderContract.connect(buyer).cancelOrder(orderId);

    const order = await orderContract.getOrder(orderId);
    expect(order.status).to.equal(4); // OrderStatus.CANCELED
  });
});
