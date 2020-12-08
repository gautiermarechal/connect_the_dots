import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineCheck } from "react-icons/ai";
import useFetchSingleUser from "../../customHooks/UseFetchSingleUser";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import updateUser from "../../handlers/UpdateUser";
import Feed from "../Feed/index";

const UserProfilePage = () => {
  const [authorBookmarked, setAuthorBookmarked] = useState(false);
  const userId = useParams().id;
  useFetchSingleUser(userId);
  const singleUser = useSelector((state) => state.singleUser.single_user);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!singleUser) {
      return;
    }

    if (
      currentUser.authors_bookmarked.some(
        (author) => author._id === singleUser._id
      )
    ) {
      setAuthorBookmarked(true);
    }
  }, [singleUser, currentUser]);

  return (
    <>
      <MainContainer>
        {singleUser !== {} ? (
          <HeaderContainer>
            <UserInfoContainer>
              <UserInfo>
                <TitleUser>{singleUser.name}</TitleUser>
                <TitleUserName>@{singleUser.username}</TitleUserName>
              </UserInfo>
              <AuthorBookmarkButton
                onClick={() => {
                  if (!authorBookmarked) {
                    updateUser(
                      currentUser.id,
                      "authors_bookmarked",
                      singleUser.single_user
                    );
                  }
                }}
              >
                {authorBookmarked ? (
                  <AuthorAlreadyBookmarkedIcon />
                ) : (
                  <BookmarkAuthorIcon />
                )}
              </AuthorBookmarkButton>
            </UserInfoContainer>
            <Line />
          </HeaderContainer>
        ) : null}
        <FeedContainer>
          <Feed type="SingleUser" />
        </FeedContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
`;

const Line = styled.hr`
  width: 100%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const TitleUser = styled.h1`
  font-size: 60px;
`;

const TitleUserName = styled.h5``;

const BookmarkAuthorIcon = styled(AiOutlinePlusCircle)`
  height: 30px;
  width: 30px;
`;

const AuthorAlreadyBookmarkedIcon = styled(AiOutlineCheck)`
  height: 30px;
  width: 30px;
`;

const AuthorBookmarkButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 100%;
  cursor: pointer;
`;

const FeedContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80vw;
`;

export default UserProfilePage;
