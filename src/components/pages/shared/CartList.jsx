// CartList.js
import React, { useEffect, useState } from "react";
import { getCartDetails } from "../../../services/Cart";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import emptyCart from "../../../assets/buyingIcon.gif";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  decrementQuantity,
  incrementQuantity,
  deleteCartItem,
} from "../../../redux/reducers/CartSlice";

const CartList = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { isUserLoggedIn } = useSelector((state) => state.login);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    isUserLoggedIn
      ? dispatch(getCartDetails())
      : (toast.error("Please Login First"), history("/login"));
  }, [dispatch, isUserLoggedIn, history]);

  const userCartList = cartList.filter((item) => item.username === username);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };
  const handleDelete = (productId) => {
    setDeleteProductId(productId);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCartItem({ productId: deleteProductId }));
    toast.success("Product removed from the cart");
    setDeleteProductId(null);
  };

  const handleMakePayment = () => {
    setShowPaymentModal(true);
  };

  return (
    <div>
      {userCartList.length > 0 ? (
        <Row className="justify-content-center">
          {userCartList.map((userCartItem, userCartIndex) => (
            <Col key={userCartIndex} md={4} className="mb-4">
              <Card style={{ width: "20rem" }}>
                <Card.Img
                  variant="top"
                  src={userCartItem.cartDetails.image}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title className="card-title">
                    {userCartItem.cartDetails.productName}
                  </Card.Title>
                  <Card.Text>{userCartItem.cartDetails.description}</Card.Text>
                  <Card.Text>
                    Price: ${userCartItem.cartDetails.price}
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between">
                    No. of Items: {userCartItem.quantity || 1}
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDelete(userCartItem.cartDetails.productId)
                      }
                    >
                      Delete
                    </Button>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                  <Button
                    style={{ width: "70px" }}
                    onClick={() =>
                      handleDecrement(userCartItem.cartDetails.productId)
                    }
                  >
                    -
                  </Button>{" "}
                  <Button
                    style={{ width: "70px" }}
                    onClick={() =>
                      handleIncrement(userCartItem.cartDetails.productId)
                    }
                  >
                    +
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
          <div>
            <Button className="btn btn-success" onClick={handleMakePayment}>
              Make Payment
            </Button>

            <Modal
              show={showPaymentModal}
              onHide={() => setShowPaymentModal(false)}
            >
              <Modal.Header>
                <Modal.Title>Payment Successful</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Your payment has been successfully processed. Thank you for your
                purchase!
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowPaymentModal(false);
                    history("/");
                  }}
                >
                  Go back to shop more...
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <Modal
              show={deleteProductId !== null}
              onHide={() => setDeleteProductId(null)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to remove this product from the cart?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteProductId(null)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Row>
      ) : (
        <div className="text-center mt-5">
          <img src={emptyCart} alt="empty-icon" />
          <h3>Your cart is empty!</h3>
          <p>Add items to it now.</p>
          <Button onClick={() => history("/")}>Shop now</Button>
        </div>
      )}
    </div>
  );
};

export default CartList;
