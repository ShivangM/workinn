// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// Enum for different order statuses
enum OrderStatus {
    NEGOTIATION,
    AWAITING_SIGNATURE,
    IN_PROGRESS,
    COMPLETED,
    CANCELED
}

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

// Struct for the seller's brief
// struct SellerBrief {
//     string summary;
//     Milestone[] milestones;
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
    mapping(string => Order) orders; // Mapping to store orders
    mapping(string => uint256) depositedFunds; // Mapping to store deposited funds
    mapping(string => address) orderBuyers; // Mapping to store order buyers
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
        require(
            orders[orderId].sellerWallet == msg.sender,
            "Unauthorized user."
        );

        require(
            orders[orderId].status == OrderStatus.AWAITING_SIGNATURE,
            "Order is not in the awaiting signature state."
        );

        if (milestones[orderId].length == 0) {
            milestone.id = 0;
            milestone.state = MilestoneState.IN_PROGRESS;
        } else {
            milestone.id = milestones[orderId].length;
            milestone.state = MilestoneState.INCOMPLETE;
        }

        milestones[orderId].push(milestone);
    }

    // Function to sign an order
    function signOrder(string memory orderId) external payable {
        require(
            orders[orderId].buyerWallet == address(0),
            "Order is already signed."
        );

        require(
            orders[orderId].status == OrderStatus.AWAITING_SIGNATURE,
            "Order is not in the awaiting signature state."
        );

        require(
            msg.value == orders[orderId].buyersBrief.projectBudget,
            "Please deposit the exact amount."
        );
        orders[orderId].buyerWallet = payable(msg.sender);
        orders[orderId].status = OrderStatus.IN_PROGRESS;
        milestones[orderId][0].state = MilestoneState.IN_PROGRESS;

        depositedFunds[orderId] = msg.value;
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

        require(
            milestoneId < milestones[orderId].length,
            "Milestone does not exist."
        );

        Milestone storage currentMilestone = milestones[orderId][milestoneId];

        require(
            currentMilestone.state == MilestoneState.IN_PROGRESS,
            "Milestone is not in progress."
        );

        require(
            currentMilestone.amount <= depositedFunds[orderId],
            "Insufficient funds."
        );

        uint256 amountToRelease = currentMilestone.amount;

        orders[orderId].sellerWallet.transfer(amountToRelease);

        currentMilestone.state = MilestoneState.COMPLETED; // Set milestone state to completed
        currentMilestone.completedAt = getCurrentTime(); // Set completedAt time to the current time
        currentMilestone.paidAt = getCurrentTime(); // Set paidAt time to the current time
        depositedFunds[orderId] -= amountToRelease; // Subtract the released amount from the deposited funds

        // Set the next milestone state to in progress
        if (milestoneId < milestones[orderId].length - 1) {
            milestones[orderId][milestoneId + 1].state = MilestoneState
                .IN_PROGRESS;
        }

        // Set the order status to completed if all milestones are completed
        if (milestoneId == milestones[orderId].length - 1) {
            orders[orderId].sellerWallet.transfer(depositedFunds[orderId]);
            orders[orderId].completedAt = getCurrentTime();
            orders[orderId].status = OrderStatus.COMPLETED;
            depositedFunds[orderId] = 0;
        }
    }

    // Function to cancel an order
    function cancelOrder(string memory orderId) external {
        require(orderBuyers[orderId] == msg.sender, "Unauthorized user.");

        require(
            orders[orderId].status == OrderStatus.IN_PROGRESS,
            "Order is not in progress."
        );

        require(
            orders[orderId].status != OrderStatus.CANCELED,
            "Order is already canceled."
        );

        Order storage currentOrder = orders[orderId];

        currentOrder.buyerWallet.transfer(depositedFunds[orderId]);

        for (uint256 i = 0; i < milestones[orderId].length; i++) {
            if (milestones[orderId][i].state == MilestoneState.IN_PROGRESS) {
                milestones[orderId][i].state = MilestoneState.CANCELED;
            }
        }

        currentOrder.cancelledAt = getCurrentTime();
        currentOrder.status = OrderStatus.CANCELED;
    }

    // Function to get milestones
    function getMilestones(
        string memory orderId
    ) external view returns (Milestone[] memory) {
        return milestones[orderId];
    }

    // Function to get an order
    function getOrder(
        string memory orderId
    ) external view returns (Order memory) {
        return orders[orderId];
    }

    // Function to get the deposited funds
    function getDepositedFunds(
        string memory orderId
    ) external view returns (uint256) {
        return depositedFunds[orderId];
    }

    // Function to get the current time
    function getCurrentTime() internal view returns (string memory) {
        return string(abi.encodePacked(block.timestamp));
    }
}
