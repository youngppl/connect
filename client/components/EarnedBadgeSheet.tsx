import {useNavigation} from "@react-navigation/native";
import * as React from "react";
import {SvgProps} from "react-native-svg";
import styled from "styled-components/native";

import BottomSheet, {BottomSheetButton} from "../components/BottomSheet";
import Charming from "../components/Charming";
import Jufanaut from "../components/Jufanaut";

import Column from "./Column";
import Joymaker from "./Joymaker";
import Space from "./Space";
import BadgeBackground from "./SparklyBadgeBackground";

const Container = styled(Column)`
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;
const SparklyBadgeBackground = styled(BadgeBackground)`
  position: absolute;
`;

const BadgeContainer = styled.View`
  height: 220px;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

const SmallText = styled.Text`
  font-family: Quicksand;
  font-weight: 500;
  font-size: 16px;
  color: #371463;
  text-align: center;
`;

const BigText = styled(SmallText)`
  font-weight: bold;
  font-size: 32px;
`;

const EarnedBadgeSheet = ({badge, count}: {badge: string; count: number}) => {
  const BADGES: Record<string, (props: SvgProps) => JSX.Element> = {
    Joymaker: Joymaker,
    "Jufa-naut": Jufanaut,
    Charming: Charming,
  };
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const Badge = BADGES[badge];

  React.useEffect(() => {
    if (count) setVisible(count === 1 || (count > 0 && count % 5 === 0));
  }, [count]);

  const subtitle: Record<string, string> = {
    Joymaker: `You've made ${count} people smile and laugh. Keep sparking the joy!`,
    "Jufa-naut": `You've been actively chatting for ${count} days. You're always welcome, we like you here!`,
    Charming: `${count} people want to connect with you. Stay you!`,
  };

  return (
    <BottomSheet setVisible={setVisible} visible={visible}>
      <Container>
        <BadgeContainer>
          <SparklyBadgeBackground />
          <Badge width={100} height={100} />
        </BadgeContainer>
        <SmallText>You received</SmallText>
        <BigText>{badge}</BigText>
        <Space height={8} />
        <SmallText>{subtitle[badge]}</SmallText>
      </Container>
      <BottomSheetButton
        onPress={() => {
          setVisible(false);
          navigation.navigate("ProfileTab");
        }}
      >
        View badges
      </BottomSheetButton>
      <Space height={6} />
      <BottomSheetButton onPress={() => setVisible(false)} light>
        Dismiss
      </BottomSheetButton>
    </BottomSheet>
  );
};

export default EarnedBadgeSheet;
