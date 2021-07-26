import { gql } from "apollo-server-core";
import { buildSchema, print } from "graphql";

export const typeDefs = gql`
  enum Pronouns {
    THEY_THEM
    HE_HIS
    SHE_HER
    NONE
  }
  type User {
    id: ID
    email: String
    name: String
    createdAt: String # Make this a custom scalar
    birthday: String # Make this a custom scalar
    pronouns: Pronouns
    interests: [String!]
    mood: String

    # Custom
    formattedPronouns: String
  }
  type Conversation {
    id: ID
    channel: String
    createdAt: String # Make this a custom scalar
    people: [User]
    lastMessage: Message
  }
  type Message {
    id: ID
    text: String
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
  }
  type Mutation {
    createMessage(channel: String!, message: String!, author: ID!): Chat
    leaveWaitingRoom(userId: ID!): String
    createProfile(name: String!, pronouns: Pronouns, birthday: String!): Profile
    createChatFeedback(
      author: ID!
      channel: String!
      engagementRating: Int!
      howFeelingAfter: String!
      mood: String!
      smile: String!
      talkAgain: String!
    ): String
    updateInterests(userId: ID!, interests: [String!]): [String!]
    updateMood(userId: ID!, mood: String!): String
  }
  type Subscription {
    chat(channel: String!): Chat
    waitingRoom(userId: ID!, chatTypes: [String!]!): Match
  }
`;

const typeDefString = print(typeDefs);
export const schema = buildSchema(typeDefString);
