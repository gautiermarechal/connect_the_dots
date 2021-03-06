import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pausePostConnection } from "../../redux/actions/PostConnectionActions";
import { FaUserCircle } from "react-icons/fa";
import { COLORS } from "../../constants";
import createConnection from "../../handlers/CreateConnection";
import addUnknownCategory from "../../handlers/AddUnknownCategory";
import addConnectionToCurrentUser from "../../handlers/AddConnectionToCurrentUser";

const LightNavigationBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const postConnection = useSelector((state) => state.postConnection);
  const history = useHistory();
  return (
    <>
      <MainContainer>
        <Link to="/" onClick={() => dispatch(pausePostConnection())}>
          <NavItem>
            <MainTitle>Connect the dots.</MainTitle>
          </NavItem>
        </Link>
        <RightSection>
          <Link
            to={`/account/${currentUser.id}`}
            onClick={() => dispatch(pausePostConnection())}
          >
            <NavItem>
              <FaUserCircle />
            </NavItem>
          </Link>
          <NavItem>
            <PublishButton
              onClick={() => {
                createConnection(postConnection.post_connection);
                addConnectionToCurrentUser(
                  postConnection.post_connection.author._id,
                  postConnection.post_connection
                );
                [...new Set(postConnection.post_connection.categories)].forEach(
                  (category) => {
                    addUnknownCategory(category);
                  }
                );
                history.push("/feed");
              }}
            >
              Publish
            </PublishButton>
          </NavItem>
        </RightSection>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 78px;
  padding: 20px;
`;

const MainTitle = styled.h1`
  font-weight: 800;
`;

const NavItem = styled.h3`
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 200px;
`;

const PublishButton = styled.div`
  background-color: ${COLORS.blue};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  display: flex;
    justify-content: center;
    align-items: center;
}
`;

export default LightNavigationBar;
