import * as React from "react";
import styled from "styled-components/native";

import Column from "../components/Column";
import OkayIcon from "../components/emotions/Okay";
import ProfileImage from "../components/ProfileImage";
import Row from "../components/Row";
import Space from "../components/Space";

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
  padding-bottom: 10px;
`;
const UserInfoCard = () => {
  return (
    <UserInfoCardContainer>
      <UserInfoHeading>
        <Column>
          <ProfileImage />
        </Column>
        <Space width={10} />
        <Column>
          <UserInfoTitle>Naomi</UserInfoTitle>
          <UserInfoSubtitle>She/her</UserInfoSubtitle>
        </Column>
      </UserInfoHeading>
      <Column>
        <Row>
          <UserInfoText>Feeling Happy </UserInfoText>
          <OkayIcon />
        </Row>
        <UserInfoText>Joined in July 2021</UserInfoText>
        <UserInfoText>Interested in Basketball, Marvel, and Art</UserInfoText>
      </Column>
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
