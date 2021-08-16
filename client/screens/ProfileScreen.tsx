import {gql, useMutation, useQuery} from "@apollo/client";
import {AntDesign, Entypo} from "@expo/vector-icons";
import _ from "lodash";
import * as React from "react";
import {ActivityIndicator, FlatList, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import styled from "styled-components/native";

import BadgeBackground from "../components/BadgeBackground";
import BottomSheet, {BottomSheetButton, BottomSheetHeading} from "../components/BottomSheet";
import Charming from "../components/Charming";
import Joymaker from "../components/Joymaker";
import Jufanaut from "../components/Jufanaut";
import Space from "../components/Space";
import {useActualUser} from "../providers/UserProvider";

const Container = styled(SafeAreaView)`
  background-color: #371463;
  flex: 1;
  padding-horizontal: 18px;
`;

const Section = styled.View`
  flex: 1;
`;

const BaseText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
`;

const Button = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid #ffffff;
  border-radius: 32px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  color: #ffffff;
  flex-direction: row;
  align-items: center;
  width: 180px;
`;

const ButtonText = styled.Text`
  padding-vertical: 4px;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;

const AddInterestsButton = ({onPress}: {onPress: any}) => {
  return (
    <Button onPress={onPress}>
      <AntDesign name="pluscircleo" size={24} color="white" />
      <Space width={10} />
      <ButtonText>Add interests</ButtonText>
    </Button>
  );
};

const YourInterestContainer = styled.View`
  padding: 10px;
  height: 42px;
  border: 1px solid #371463;
  border-radius: 48px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  margin-right: 8px;
  margin-bottom: 8px;
`;

const YourInterestText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;

const YourInterestsSection = ({
  interests,
  addInterestPress,
}: {
  interests: string[];
  addInterestPress: any;
}) => {
  return (
    <Section>
      <BaseText>Your Interests</BaseText>
      <Space height={20} />
      {interests.length === 0 ? (
        <BaseText style={{fontSize: 18}}>
          You haven’t shared your interests. Let us know what your interested in and we can share it
          to whoever you talk to.
        </BaseText>
      ) : (
        <RowContainer>
          {interests.map((interest) => (
            <YourInterestContainer key={interest}>
              <YourInterestText>{interest}</YourInterestText>
            </YourInterestContainer>
          ))}
        </RowContainer>
      )}
      <Space height={20} />
      <AddInterestsButton onPress={() => addInterestPress(true)}></AddInterestsButton>
    </Section>
  );
};

interface InterestOptionItemProp {
  value: string;
}
interface InterestOptionProps {
  item: InterestOptionItemProp;
  setInterests: (value: any) => void;
  selected: boolean;
  disabled: boolean;
}

const WhiteChatText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  flex-wrap: wrap;
  flex-shrink: 1;
`;

const SelectionOptionText = styled(WhiteChatText)`
  font-size: 16px;
  color: ${(props: {selected: boolean}) => (props.selected ? "#ffffff" : "#371463")};
`;

const SelectionOptionContainer = styled.TouchableOpacity`
  padding: 10px;
  height: 42px;
  border: 1px solid #371463;
  border-radius: 48px;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  background: ${(props: {selected: boolean}) => (props.selected ? "purple" : "white")};
  margin-right: 8px;
  margin-bottom: 8px;
`;

const InterestOption = ({item, setInterests, selected, disabled}: InterestOptionProps) => {
  return (
    <SelectionOptionContainer
      disabled={disabled}
      selected={selected}
      onPress={() =>
        setInterests((oldInterests: StringBooleanHash) => ({
          ...oldInterests,
          [item.value]: !selected,
        }))
      }
    >
      <SelectionOptionText selected={selected}>{item.value}</SelectionOptionText>
    </SelectionOptionContainer>
  );
};

const INTEREST_OPTIONS = [
  {value: "Sports"},
  {value: "Fitness"},
  {value: "Outdoor Activity"},
  {value: "Dance"},
  {value: "Music"},
  {value: "Podcasts"},
  {value: "Gaming"},
  {value: "Movies"},
  {value: "TV shows"},
  {value: "Anime"},
  {value: "Reading"},
  {value: "Writing"},
  {value: "Art"},
  {value: "Coding"},
  {value: "Food"},
  {value: "Travel"},
  {value: "Mindfulness"},
  {value: "Fashion"},
  {value: "Beauty"},
  {value: "Photography"},
  {value: "Activism"},
  {value: "STEM"},
  {value: "Business"},
];

const Line = styled.View`
  border-bottom-color: rgba(55, 20, 99, 0.2);
  border-bottom-width: 1px;
`;

const SuggestionText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  align-items: center;
  text-align: center;
  color: #3e3e3e;
`;

const SuggestionTextButton = styled.TouchableOpacity`
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const SuggestionTextButtonText = styled.Text`
  color: #371463;
`;

const UPDATE_INTERESTS_MUTATION = gql`
  mutation UpdateInterestsMutation($userId: ID!, $interests: [String!]) {
    updateInterests(userId: $userId, interests: $interests) {
      id
      interests
    }
  }
`;

const InterestSheet = ({
  visibleModal,
  initialInterests,
  setVisibleModal,
  userId,
  setShowNoSuggestionsModal,
}: {
  initialInterests: string[];
  visibleModal: boolean;
  setVisibleModal: any;
  userId: string | number | null;
  setShowNoSuggestionsModal: any;
}) => {
  const [updateInterests] = useMutation(UPDATE_INTERESTS_MUTATION);
  const [interests, setInterests] = React.useState<StringBooleanHash>(() => {
    const baseInterests: StringBooleanHash = {};
    for (const option of INTEREST_OPTIONS) {
      const key: string = option.value;
      const initialExists = initialInterests.includes(key);
      baseInterests[key] = initialExists;
    }
    return baseInterests;
  });

  const handleDone = () => {
    const mutationInterests = _.keys(_.pickBy(interests, _.identity));
    console.log(interests);
    console.log("mutation interests", mutationInterests);
    updateInterests({
      variables: {interests: mutationInterests, userId},
    });
    setVisibleModal(false);
  };

  const disabledInterests = _.values(interests).filter((x) => x === true).length >= 3;

  return (
    <BottomSheet visible={visibleModal} setVisible={setVisibleModal}>
      <ScrollView>
        <BottomSheetHeading>Select up to 3 interests</BottomSheetHeading>
        <Space height={44} />
        <FlatList
          data={INTEREST_OPTIONS}
          contentContainerStyle={{flexDirection: "column"}}
          numColumns={3}
          keyExtractor={(item) => item.value}
          renderItem={({item}: {item: InterestOptionItemProp}) => (
            <InterestOption
              item={item}
              setInterests={setInterests}
              selected={interests[item.value] === true}
              disabled={disabledInterests && !interests[item.value]}
            />
          )}
        />
        <Space height={40} />
        <Line />
        <Space height={16} />
        <SuggestionText>
          Missing Something? Suggest interests here so we can share your interest.
        </SuggestionText>
        <Space height={8} />
        <SuggestionTextButton
          onPress={() => {
            setVisibleModal(false);
            setShowNoSuggestionsModal(true);
          }}
        >
          <SuggestionTextButtonText>Suggest Interests</SuggestionTextButtonText>
        </SuggestionTextButton>
        <Space height={70} />
        <BottomSheetButton onPress={handleDone}>Done</BottomSheetButton>
      </ScrollView>
    </BottomSheet>
  );
};

const NoSuggestionsSheet = ({
  visibleModal,
  setVisibleModal,
}: {
  visibleModal: boolean;
  setVisibleModal: any;
}) => {
  return (
    <BottomSheet visible={visibleModal} setVisible={setVisibleModal}>
      <BottomSheetHeading>
        {"Thank you, but we're not taking suggestions right now!"}
      </BottomSheetHeading>
    </BottomSheet>
  );
};

const ProfileSection = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ColumnContainer = styled.View``;
const RowContainer = styled.View`
  flex-direction: row;
`;

const ProfilePhoto = styled.View`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background-color: #ffffff;
`;

const TalkCounter = ({count, text}: {count: number; text: string}) => {
  return (
    <ColumnContainer style={{justifyContent: "center", alignItems: "center"}}>
      <BaseText>{count}</BaseText>
      <BaseText style={{fontSize: 16}}>{text}</BaseText>
    </ColumnContainer>
  );
};

type UserProp = {
  name: string;
  talkNumbers: Record<string, number>;
  formattedPronouns: string;
  overallRating: number;
};

const ProfilePortion = ({user}: {user: UserProp}) => {
  return (
    <ProfileSection>
      <BaseText>Profile</BaseText>
      <Space height={20} />
      <ColumnContainer
        style={{
          paddingHorizontal: 18,
          paddingVertical: 8,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          margin: 16,
          borderRadius: 16,
          width: "100%",
        }}
      >
        <RowContainer style={{alignItems: "center", paddingVertical: 16}}>
          <ProfilePhoto />
          <Space width={8} />
          <ColumnContainer>
            <RowContainer>
              <BaseText>{user.name}</BaseText>
              <AntDesign name="star" size={24} color="#FF97D5" />
              <BaseText>{user.overallRating.toFixed(1)}</BaseText>
            </RowContainer>
            <BaseText style={{fontSize: 16}}>{user.formattedPronouns}</BaseText>
          </ColumnContainer>
          <RowContainer style={{flex: 1}} />
          <Entypo name="chevron-right" size={24} color="white" />
        </RowContainer>
        <Line
          style={{
            borderBottomColor: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <RowContainer style={{justifyContent: "space-between", paddingVertical: 16}}>
          <TalkCounter count={user.talkNumbers.deep} text={"Deep talks"} />
          <TalkCounter count={user.talkNumbers.light} text={"Light talks"} />
          <TalkCounter count={user.talkNumbers.small} text={"Small talks"} />
        </RowContainer>
      </ColumnContainer>
    </ProfileSection>
  );
};

const BadgeContainer = styled.View`
  height: 90px;
  align-items: center;
  justify-content: center;
`;

const Badge = styled(BadgeBackground)`
  position: absolute;
`;

const PinkContainer = styled.View`
  position: absolute;
  background-color: #ff97d5;
  border-radius: 8px;
  width: 30px;
  height: 16px;
  top: 8px;
  right: -4px;
  justify-content: center;
  align-items: center;
`;

const BadgeText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
`;

const BadgeItem = ({
  badgeComponent,
  text,
  count,
}: {
  badgeComponent: React.ReactElement;
  text: string;
  count: number;
}) => {
  return (
    <ColumnContainer>
      <ColumnContainer>
        <PinkContainer>
          <BadgeText>{count}</BadgeText>
        </PinkContainer>
        <BadgeContainer>
          <Badge />
          {badgeComponent}
        </BadgeContainer>
      </ColumnContainer>
      <BaseText style={{fontSize: 16}}>{text}</BaseText>
    </ColumnContainer>
  );
};

const BadgesPortion = ({badgeNumbers}: {badgeNumbers: Record<string, number>}) => {
  return (
    <RowContainer style={{justifyContent: "space-around", alignItems: "center"}}>
      <BadgeItem badgeComponent={<Joymaker />} text={"Joymaker"} count={badgeNumbers.joymaker} />
      <BadgeItem badgeComponent={<Jufanaut />} text={"Jufa-naut"} count={badgeNumbers.jufanaut} />
      <BadgeItem badgeComponent={<Charming />} text={"Charming"} count={badgeNumbers.charming} />
    </RowContainer>
  );
};

interface StringBooleanHash {
  [key: string]: boolean;
}

const ErrorText = styled.Text`
  color: red;
`;

const ProfileContent = ({userId}: {userId: string | number | null}) => {
  const [showInterestsModal, setShowInterestsModal] = React.useState(false);
  const [showNoSuggestionsModal, setShowNoSuggestionsModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const {loading, error, data} = useQuery(ProfileScreen.query, {
    variables: {id: userId},
  });
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <ErrorText>`Error! ${error.message}`</ErrorText>;

  return (
    <>
      <ProfilePortion user={data.getUser} />
      <Space height={10} />
      <BadgesPortion badgeNumbers={data.getUser.badgeNumbers} />
      <Space height={40} />
      <YourInterestsSection
        interests={data.getUser.interests}
        addInterestPress={setShowInterestsModal}
      ></YourInterestsSection>
      <InterestSheet
        userId={userId}
        initialInterests={data.getUser.interests}
        visibleModal={showInterestsModal}
        setVisibleModal={setShowInterestsModal}
        setShowNoSuggestionsModal={setShowNoSuggestionsModal}
      ></InterestSheet>
      <NoSuggestionsSheet
        visibleModal={showNoSuggestionsModal}
        setVisibleModal={setShowNoSuggestionsModal}
      ></NoSuggestionsSheet>
    </>
  );
};

const ProfileScreen = () => {
  const {id} = useActualUser();
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileContent userId={id} />
      </ScrollView>
    </Container>
  );
};

ProfileScreen.query = gql`
  query ProfileScreen($id: ID!) {
    getUser(id: $id) {
      id
      name
      createdAt
      birthday
      formattedPronouns
      interests
      overallRating
      talkNumbers {
        deep
        small
        light
      }
      badgeNumbers {
        charming
        joymaker
        jufanaut
      }
    }
  }
`;

export default ProfileScreen;
