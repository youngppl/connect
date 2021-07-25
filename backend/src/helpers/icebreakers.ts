const ICEBREAKERS: Record<string, string[]> = {
  DEEP_TALK: [
    "What’s been on your mind? (6+ words)",
    "What’s something you changed your mind about recently?",
    "What’s an act of kindness you’ve received or given most recently?",
  ],
  LIGHT_TALK: [
    "What did you accomplish today? Wrong answers only.",
    "If you could go anywhere right now, where would you go?",
    "Guess my favorite ice cream flavor.",
  ],
  SMALL_TALK: [
    "What would a dolphin be doing right now? Wrong answers welcome.",
    "What would a elephant be doing right now? Wrong answers welcome.",
    "What would a gorilla be doing right now? Wrong answers welcome.",
    "What would a whale be doing right now? Wrong answers welcome.",
    "What’s the weather like today?",
    "What’d you have for lunch today?",
  ],
};

const getIcebreaker = (chatType: string): string => {
  const icebreakers = ICEBREAKERS[chatType];
  return icebreakers[Math.floor(Math.random() * icebreakers.length)];
};

export default getIcebreaker;
