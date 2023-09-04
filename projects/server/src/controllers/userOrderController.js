const { userOrderService } = require("../services");
const { messages } = require("../helpers");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    const result = await userOrderService.addToCart(
      // req.user.id,
      userId,
      productId,
      quantity
    );

    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Product added to cart successfully"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json(messages.error(500, "Internal server error"));
  }
};

async function removeFromCart(req, res) {
  try {
    const { productId, userId } = req.body;
    const result = await userOrderService.removeFromCart(userId, productId);
    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Success Remove Product From Cart"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json(messages.error(500, "Internal server error"));
  }
}

const editCartItem = async (req, res) => {
  try {
    const { quantity, userId, productId } = req.body;
    const result = await userOrderService.editCartItem(
      userId,
      productId,
      quantity
    );

    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Cart item updated successfully"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error editing cart item:", error);
    return res.status(500).json(messages.error(500, "Internal server error"));
  }
};

async function clearCart(req, res) {
  try {
    const userId = req.params.userId;
    const result = await userOrderService.clearCart(userId);
    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Cart cleared successfully"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error resetting cart:", error);
    return res.status(500).json(messages.error(500, "Internal server error"));
  }
}

async function getCartTotal(req, res) {
  try {
    const userId = req.params.userId;
    const result = await userOrderService.getCartTotal(userId);
    if (result.status === 200) {
      return res
        .status(200)
        .json(
          messages.response({ message: `Cart total: ${result.data.total}` })
        );
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error getting cart total:", error);
    return res.status(500).json(messages.error(500, "Internal server error"));
  }
}

async function viewCart(req, res) {
  try {
    const userId = req.params.userId;
    const result = await userOrderService.viewCart(userId);
    return res
      .status(result.status)
      .json(messages.response({ data: result.data }));
  } catch (error) {
    console.error("Error viewing cart:", error);
    return res.status(500).json(messages.error(500, "Internal server error"));
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  editCartItem,
  clearCart,
  getCartTotal,
  viewCart,
};
