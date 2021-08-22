import {gql} from "apollo-server-core";
import {buildSchema, print} from "graphql";

export const typeDefs = gql`
  scalar Date
  enum Pronouns {
    THEY_THEM
    HE_HIS
    SHE_HER
    NONE
  }
  enum ConversationType {
    DEEP
    LIGHT
    SMALL
  }
  type BadgeNumbers {
    joymaker: Int!
    charming: Int!
    jufanaut: Int!
  }
  type TalkNumbers {
    small: Int!
    deep: Int!
    light: Int!
  }
  type UserExtra {
    showJoymaker: Boolean
    showJufanaut: Boolean
    showCharming: Boolean
  }
  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: String!
    birthday: String! # Make this a custom scalar
    pronouns: Pronouns!
    interests: [String!]!
    profileImage: Int
    mood: String
    extra: UserExtra

    # Custom
    formattedPronouns: String
    overallRating: Float
    numSmallTalk: Int
    talkNumbers: TalkNumbers
    badgeNumbers: BadgeNumbers
  }
  type Conversation {
    id: ID!
    channel: String!
    createdAt: String! # Make this a custom scalar
    people: [User!]
    icebreaker: String

    # Custom
    lastMessage: Message
    messages: [Message!]
    streak: Int
    isUnread(userId: ID!): Boolean
  }
  type Message {
    id: ID
    createdAt: Date
    text: String!
    userId: ID
  }
  type ChatUpdate {
    userId: ID
    channel: String
  }
  type Chat {
    message: String!
    author: ID!
  }
  type Profile {
    message: String!
    id: ID!
  }
  type Match {
    message: String!
    users: [ID!]!
    channel: String!
    chatType: String!
    icebreaker: String!
  }
  type Query {
    getUser(id: ID!): User
    getConversations(userId: ID!): [Conversation]
    getConversation(channel: String!): Conversation
    onlineUsers: Int!
    singleLogQuery(userId: ID!, channel: String): Conversation
  }
  type Mutation {
    createMessage(channel: String!, message: String!, author: ID!): Message
    createProfile(name: String!, pronouns: Pronouns, birthday: String!): Profile
    createChatFeedback(
      author: ID!
      channel: String!
      engagementRating: Int!
      howFeelingAfter: String!
      mood: String!
      smile: Boolean!
      talkAgain: Boolean!
    ): User!
    dismissBadge(userId: ID!, badge: String!): User
    leaveWaitingRoom(userId: ID!): String
    updateInterests(userId: ID!, interests: [String!]): User!
    updateMood(userId: ID!, mood: String!): User!
    updateProfile(userId: ID!, name: String, pronouns: Pronouns, profileImage: Int): User!
    setLastMessageTime(userId: ID!, conversationId: ID!): Conversation
    setPushToken(userId: ID!, pushToken: String): User
  }
  type Subscription {
    chat(channel: String!): Message
    homeScreenChatUpdates(userId: ID!): ChatUpdate
    waitingRoom(userId: ID!, chatTypes: [ConversationType!]!): Match
  }
`;

const typeDefString = print(typeDefs);
export const schema = buildSchema(typeDefString);
