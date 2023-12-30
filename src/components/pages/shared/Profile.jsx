import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDetails } from "../../../services/Auth";
import userIcon from "../../../assets/userIcon.gif";

const Profile = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");

  // Access user details from the Redux store
  const userDetails = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getLoggedInUserDetails());
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="text-center">
            <img
              src={userIcon}
              alt="User Icon"
              style={{ height: "70px", width: "80px" }}
            />

            <Card.Text className="text-center">
              <strong>{username}</strong>
            </Card.Text>
          </Card.Title>
          {userDetails && (
            <>
              <Card.Text>
                <strong>Email:</strong> {userDetails.userDetails?.email}
              </Card.Text>
              <Card.Text>
                <strong>First Name:</strong>{" "}
                {userDetails.userDetails?.firstName}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {userDetails.userDetails?.lastName}
              </Card.Text>
              <Card.Text>
                <strong>Phone Number:</strong>{" "}
                {userDetails.userDetails?.phoneNumber}
              </Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
