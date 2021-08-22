import {gql, useMutation, useQuery} from "@apollo/client";
import {useNavigation} from "@react-navigation/native";
import * as React from "react";
import {Dimensions, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";

import GoBack from "../components/GoBackButton";
import ProfileImage from "../components/ProfileImage";
import Space from "../components/Space";
import {PRONOUNS} from "../constants/Pronouns";
import {client} from "../graphql/Client";
import {useActualUser} from "../providers/UserProvider";

const Container = styled.View`
  background-color: #371463;
  flex: 1;
`;

const HeaderContainer = styled(SafeAreaView)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 16px 20px;
`;

const Title = styled.Text`
  font-family: Quicksand;
  font-size: 19px;
  font-weight: 700;
  color: #ffffff;
`;

const Label = styled.Text`
  font-family: Quicksand;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
  color: #ffffff;
`;

const Input = styled.TextInput`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 64px;
  width: 100%;
  height: 48px;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  color: #ffffff;
  padding: 14px 16px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid #ffffff;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 56px;
  padding-vertical: 12px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
`;

const Content = styled.View`
  height: 100%;
  justify-content: space-between;
  padding: 16px;
  padding-bottom: 180px;
`;

const ProfileImageContainer = styled.View`
  align-items: center;
  position: relative;
`;

const SelectedProfileImageRing = styled.View`
  width: 110px;
  height: 110px;
  position: absolute;
  border: 3px solid #d77dbe;
  border-radius: 55px;
  top: -10px;
`;

const SelectionOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 0;
`;

const SelectionOptionContainer = styled.TouchableOpacity`
  padding: 10px;
  height: 42px;
  border: 1px solid #ffffff;
  border-radius: 48px;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  background: ${(props: {selected: boolean}) => (props.selected ? "white" : "transparent")};
  margin-right: 8px;
  margin-bottom: 8px;
`;

const SelectionOptionText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  color: #ffffff;
  flex-wrap: wrap;
  flex-shrink: 1;
  font-size: 16px;
  color: ${(props: {selected: boolean}) => (props.selected ? "#371463" : "#ffffff")};
`;

interface Option {
  text: string;
  value?: string | number | undefined;
  selectedValue: string | number | undefined;
  setValue: (value: Record<string, string | number | undefined>) => void;
}

const SelectionOption = ({text, value, selectedValue, setValue}: Option) => {
  const selected = (value || text) === selectedValue;

  const handleSelect = () => {
    setValue({text, value: value || text});
  };

  return (
    <SelectionOptionContainer selected={selected} onPress={handleSelect}>
      <SelectionOptionText selected={selected}>{text}</SelectionOptionText>
    </SelectionOptionContainer>
  );
};

const EDIT_PROFILE_SCREEN_QUERY = gql`
  query EditProfileScreen($id: ID!) {
    getUser(id: $id) {
      id
      name
      pronouns
      profileImage
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($userId: ID!, $profileImage: Int, $name: String, $pronouns: Pronouns) {
    updateProfile(userId: $userId, profileImage: $profileImage, name: $name, pronouns: $pronouns) {
      id
      name
      profileImage
      formattedPronouns
    }
  }
`;

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const {id} = useActualUser();
  const {data} = useQuery(EDIT_PROFILE_SCREEN_QUERY, {
    variables: {id},
  });
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);
  const [pronouns, setPronouns] = React.useState<string | number | undefined>("");
  const [name, setName] = React.useState("");
  const [profileImage, setProfileImage] = React.useState(0);
  const carouselRef = React.useRef<Carousel<number>>(null);
  const {width: sliderWidth} = Dimensions.get("window");

  React.useEffect(() => {
    if (data && carouselRef) {
      const {
        getUser: {name, pronouns, profileImage},
      } = data;
      setName(name);
      setPronouns(pronouns);
      setProfileImage(profileImage);
      setTimeout(() => carouselRef?.current?.snapToItem(profileImage), 250);
    }
  }, [data, carouselRef]);

  const handleSave = async () => {
    await updateProfile({
      variables: {
        userId: id,
        name,
        pronouns,
        profileImage,
      },
    });
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderContainer>
        <GoBack />
        <Title>Edit Profile</Title>
      </HeaderContainer>
      <Content>
        <View>
          <ProfileImageContainer>
            <Carousel
              ref={carouselRef}
              onSnapToItem={(index: number) => setProfileImage(index)}
              data={[0, 1, 2, 3, 4]}
              removeClippedSubviews={false}
              renderItem={({index}: {index: number}) => (
                <View style={{alignItems: "center"}}>
                  <ProfileImage variant={index} size={90} />
                </View>
              )}
              sliderWidth={sliderWidth}
              itemWidth={120}
            />
            <SelectedProfileImageRing pointerEvents="none" />
          </ProfileImageContainer>
          <Space height={18} />
          <Label>Name</Label>
          <Input returnKeyType="done" value={name} onChangeText={(val) => setName(val)} />
          <Space height={32} />
          <Label>Pronouns</Label>
          <SelectionOptionsContainer>
            {Object.entries(PRONOUNS).map(([text, value], index) => {
              return (
                <SelectionOption
                  text={text}
                  value={value}
                  key={index}
                  selectedValue={pronouns}
                  setValue={({value}) => setPronouns(value)}
                />
              );
            })}
          </SelectionOptionsContainer>
        </View>
        <ButtonContainer onPress={handleSave}>
          <ButtonText>Save</ButtonText>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default EditProfileScreen;
