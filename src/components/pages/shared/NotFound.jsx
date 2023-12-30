import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4">404 - Not Found</h1>
      <p className="lead">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button as={Link} to="/" variant="primary">
        Go to Home Page
      </Button>
    </div>
  );
};

export default NotFound;
