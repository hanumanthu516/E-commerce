import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Products = () => {
  const { productList } = useSelector((state) => state.products);
  const { productId } = useParams();

  return (
    <div>
      <h1 className="mb-4">Products</h1>
      {productList.length > 0 && (
        <Row className="gx-3 gy-3">
          {productList[productId - 1]?.items?.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4" style={{ width: "18rem", height: "100%" }}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title className="card-title">
                    {item.productName}
                  </Card.Title>
                  <Link
                    to={`/productDetails/${productId}/${item.productId}`}
                    className="link-underline-light"
                  >
                    More Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Products;
