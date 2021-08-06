import {gql, useQuery} from "@apollo/client";
import * as React from "react";
import styled from "styled-components/native";

import Column from "../components/Column";
import ProfileImage from "../components/ProfileImage";
import Row from "../components/Row";
import Space from "../components/Space";
import {User} from "../types";

import MoodIcon from "./emotions/MoodIcon";

const UserInfoCardContainer = styled.View`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px 18px;
  width: 100%;
  align-self: center;
`;

const UserInfoHeading = styled(Row)`
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const UserInfoTitle = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
`;

const UserInfoSubtitle = styled(UserInfoTitle)`
  font-size: 16px;
`;

const UserInfoText = styled(UserInfoTitle)`
  font-size: 14px;
`;

const getUserQuery = gql`
  query UserInfoCardGetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      mood
      formattedPronouns
      interests
      createdAt
    }
  }
`;

const UserInfoCard = ({user}: {user: User}) => {
  const {data, loading} = useQuery(getUserQuery, {
    variables: {id: user.id},
  });

  if (loading) return null;

  const {getUser: fetchedUser} = data;

  return (
    <UserInfoCardContainer>
      <UserInfoHeading>
        <Column>
          <ProfileImage />
        </Column>
        <Space width={10} />
        <Column>
          <UserInfoTitle>{fetchedUser.name}</UserInfoTitle>
          <UserInfoSubtitle>{fetchedUser.formattedPronouns}</UserInfoSubtitle>
        </Column>
      </UserInfoHeading>
      <Column>
        <Row style={{alignItems: "center"}}>
          <UserInfoText>Feeling {fetchedUser.mood} </UserInfoText>
          <MoodIcon mood={fetchedUser.mood} />
        </Row>
        <Space height={8} />
        <UserInfoText>Joined in {fetchedUser.createdAt}</UserInfoText>
        <Space height={8} />
        <UserInfoText>
          Interested in{" "}
          {fetchedUser.interests.length > 0 ? fetchedUser.interests.join(", ").slice(0, -2) : "🤷🏽‍♀️"}
        </UserInfoText>
      </Column>
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
