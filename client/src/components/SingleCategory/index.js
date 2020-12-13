import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useFetchSingleCategory from "../../customHooks/UseFetchSingleCategory";
import useFetchCategoryConnections from "../../customHooks/UseFetchCategoryConnections";
import { useSelector } from "react-redux";
import Feed from "../Feed";
import LoadingSpinner from "../LoadingSpinner";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import updateUser from "../../handlers/UpdateUser";

const SingleCategory = () => {
  const id = useParams().id;
  useFetchSingleCategory(id);
  useFetchCategoryConnections(id);
  const singleCategory = useSelector((state) => state.singleCategory);
  const [categoryBookmarked, setCategoryBookmarked] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!singleCategory) {
      return;
    }
    if (currentUser.categories_bookmarked) {
      if (
        currentUser.categories_bookmarked.some(
          (category) => category._id === singleCategory.single_category._id
        )
      ) {
        setCategoryBookmarked(true);
      }
    }
  }, [singleCategory, currentUser]);

  return (
    <>
      <MainContainer>
        {singleCategory.single_category ? (
          <>
            <Title>{singleCategory.single_category.name}</Title>
            <Line />
            <BookmarkContainer>
              <BookmarkButton
                onClick={() => {
                  if (!categoryBookmarked) {
                    updateUser(
                      currentUser.id,
                      "categories_bookmarked",
                      singleCategory.single_category
                    );
                    window.location.reload();
                  }
                }}
              >
                {categoryBookmarked ? (
                  <AlreadyBookmarkCategory />
                ) : (
                  <BookmarkCategory />
                )}{" "}
              </BookmarkButton>
            </BookmarkContainer>
            <Feed type="SingleCategory" />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.h1``;

const Line = styled.hr`
  width: 80%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const BookmarkContainer = styled.div`
  display: flex;
  width: 70vw;
  justify-content: flex-end;
`;

const BookmarkButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 100%;
  cursor: pointer;
`;

const AlreadyBookmarkCategory = styled(AiOutlineCheck)`
  height: 30px;
  width: 30px;
`;

const BookmarkCategory = styled(BsBookmark)`
  height: 30px;
  width: 30px;
`;
export default SingleCategory;
