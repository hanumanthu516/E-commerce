import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../services/Product";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productId, id } = useParams();
  const { productList } = useSelector((state) => state.products);
  const { isUserLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useNavigate();

  const selectedProduct = productList[productId - 1]?.items.find(
    (item) => item.productId === parseInt(id)
  );

  const handleAddToCart = () => {
    if (isUserLoggedIn) {
      const username = localStorage.getItem("username");

      const payload = {
        username,
        cartDetails: selectedProduct,
      };

      if (username) {
        dispatch(addProductToCart(payload));
      } else {
        showErrorToast("Failed to get username from local storage");
      }
    } else {
      toast.error("Please Login Before Proceeding");
      history("/login");
    }
  };

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <Card style={{ width: "20rem" }}>
          <Card.Img
            variant="top"
            src={selectedProduct.image}
            className="card-img-top"
          />
          <Card.Body>
            <Card.Title className="card-title">
              {selectedProduct.productName}
            </Card.Title>
            <Card.Text>{selectedProduct.description}</Card.Text>
            <Card.Text>Price: ${selectedProduct.price}</Card.Text>
            <div className="d-flex justify-content-between">
              <Link
                to={`/products/${productId}`}
                className="btn btn-primary mr-2"
              >
                Back to Products
              </Link>
              <Button variant="success" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
