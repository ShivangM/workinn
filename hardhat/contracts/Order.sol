// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// Enum for different milestone states
enum MilestoneState {
    INCOMPLETE,
    IN_PROGRESS,
    COMPLETED,
    CANCELED
}

// Struct for project file details
// struct ProjectFile {
//     string id;
//     string name;
//     string url;
//     string fileType;
// }

// Struct for the buyer's brief
struct BuyerBrief {
    string projectTitle;
    string projectDescription;
    uint256 projectBudget;
    string projectDeadline;
    string[] projectFiles;
}

// Struct for milestone details
struct Milestone {
    uint256 id;
    string title;
    string description;
    uint256 amount;
    string deadline;
    string[] files;
    MilestoneState state;
    string completedAt;
    string paidAt;
}

// Struct for the seller's brief
// struct SellerBrief {
//     string summary;
//     Milestone[] milestones;
// }

// Enum for different order statuses
enum OrderStatus {
    NEGOTIATION,
    AWAITING_SIGNATURE,
    IN_PROGRESS,
    COMPLETED,
    CANCELED
}

// Struct for an order
struct Order {
    string id;
    string buyerId;
    string sellerId;
    address payable buyerWallet;
    address payable sellerWallet;
    string serviceId;
    BuyerBrief buyersBrief;
    string sellersSummary;
    OrderStatus status;
    string createdAt;
    string updatedAt;
    string completedAt;
    string cancelledAt;
}

// Main contract
contract OrderContract {
    mapping(string => Order) public orders; // Mapping to store orders
    mapping(string => uint256) public depositedFunds; // Mapping to store deposited funds
    mapping(string => address) public orderBuyers; // Mapping to store order buyers
    mapping(string => Milestone[]) milestones; // Mapping to store milestones

    // Function to create an order
    function createOrder(
        string memory id,
        string memory buyerId,
        string memory sellerId,
        address payable sellerWallet,
        string memory serviceId,
        BuyerBrief memory buyersBrief,
        string memory sellersSummary
    ) external {
        require(msg.sender == sellerWallet, "Unauthorized user.");
        orders[id] = Order(
            id,
            buyerId,
            sellerId,
            payable(address(0)),
            sellerWallet,
            serviceId,
            buyersBrief,
            sellersSummary,
            OrderStatus.AWAITING_SIGNATURE,
            getCurrentTime(),
            getCurrentTime(),
            "",
            ""
        );
    }

    function addMilestone(
        string memory orderId,
        Milestone memory milestone
    ) external {
        milestones[orderId].push(milestone);
    }

    // Function to sign an order
    function signOrder(string memory orderId, uint256 amount) external payable {
        require(
            orders[orderId].buyerWallet == address(0),
            "Order is already signed."
        );
        require(
            orders[orderId].status == OrderStatus.AWAITING_SIGNATURE,
            "Order is not in the awaiting signature state."
        );
        require(msg.value == amount, "Please deposit the exact amount.");
        orders[orderId].buyerWallet = payable(msg.sender);
        orders[orderId].status = OrderStatus.IN_PROGRESS;
        depositedFunds[orderId] = amount;
        orderBuyers[orderId] = msg.sender;
    }

    // Function to release milestone funds
    function releaseMilestoneFunds(
        string memory orderId,
        uint256 milestoneId
    ) external {
        require(orderBuyers[orderId] == msg.sender, "Unauthorized user.");
        require(
            orders[orderId].status == OrderStatus.IN_PROGRESS,
            "Order is not in progress."
        );
        Milestone storage currentMilestone = milestones[orderId][milestoneId];

        require(
            currentMilestone.state == MilestoneState.IN_PROGRESS,
            "Milestone is not in progress."
        );
        uint256 amountToRelease = currentMilestone.amount;
        (bool success, ) = orders[orderId].sellerWallet.call{
            value: amountToRelease
        }("");
        require(success, "Transfer failed.");
        currentMilestone.paidAt = getCurrentTime(); // Set paidAt time to the current time
        depositedFunds[orderId] -= amountToRelease;
        if (milestoneId < milestones[orderId].length - 1) {
            milestones[orderId][milestoneId + 1].state = MilestoneState
                .IN_PROGRESS;
        }
        if (milestoneId == milestones[orderId].length - 1) {
            orders[orderId].status = OrderStatus.COMPLETED;
            (success, ) = orders[orderId].sellerWallet.call{
                value: depositedFunds[orderId]
            }("");
            require(success, "Transfer failed.");
            depositedFunds[orderId] = 0;
        }
    }

    // Function to cancel an order
    function cancelOrder(string memory orderId) external {
        require(orderBuyers[orderId] == msg.sender, "Unauthorized user.");
        require(
            orders[orderId].status != OrderStatus.CANCELED,
            "Order is already canceled."
        );
        Order storage currentOrder = orders[orderId];
        currentOrder.status = OrderStatus.CANCELED;
        (bool success, ) = currentOrder.buyerWallet.call{
            value: depositedFunds[orderId]
        }("");
        require(success, "Transfer failed.");
        for (uint256 i = 0; i < milestones[orderId].length; i++) {
            if (milestones[orderId][i].state == MilestoneState.IN_PROGRESS) {
                milestones[orderId][i].state = MilestoneState.CANCELED;
            }
        }
    }

    // Function to get the current time
    function getCurrentTime() internal view returns (string memory) {
        return string(abi.encodePacked(block.timestamp));
    }
}
