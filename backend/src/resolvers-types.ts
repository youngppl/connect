import { GraphQLResolveInfo } from 'graphql';
import { JufaContextType } from './app';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BadgeNumbers = {
  __typename?: 'BadgeNumbers';
  joymaker: Scalars['Int'];
  charming: Scalars['Int'];
  jufanaut: Scalars['Int'];
};

export type Chat = {
  __typename?: 'Chat';
  message: Scalars['String'];
  author: Scalars['ID'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID'];
  channel: Scalars['String'];
  createdAt: Scalars['String'];
  people?: Maybe<Array<User>>;
  lastMessage?: Maybe<Message>;
  messages?: Maybe<Array<Message>>;
};

export type ConversationType =
  | 'DEEP'
  | 'LIGHT'
  | 'SMALL';

export type Match = {
  __typename?: 'Match';
  message: Scalars['String'];
  users: Array<Scalars['ID']>;
  channel: Scalars['String'];
  chatType: Scalars['String'];
  icebreaker: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  userId?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage?: Maybe<Message>;
  leaveWaitingRoom?: Maybe<Scalars['String']>;
  createProfile?: Maybe<Profile>;
  createChatFeedback: User;
  updateInterests: User;
  updateMood: User;
};


export type MutationCreateMessageArgs = {
  channel: Scalars['String'];
  message: Scalars['String'];
  author: Scalars['ID'];
};


export type MutationLeaveWaitingRoomArgs = {
  userId: Scalars['ID'];
};


export type MutationCreateProfileArgs = {
  name: Scalars['String'];
  pronouns?: Maybe<Pronouns>;
  birthday: Scalars['String'];
};


export type MutationCreateChatFeedbackArgs = {
  author: Scalars['ID'];
  channel: Scalars['String'];
  engagementRating: Scalars['Int'];
  howFeelingAfter: Scalars['String'];
  mood: Scalars['String'];
  smile: Scalars['Boolean'];
  talkAgain: Scalars['Boolean'];
};


export type MutationUpdateInterestsArgs = {
  userId: Scalars['ID'];
  interests?: Maybe<Array<Scalars['String']>>;
};


export type MutationUpdateMoodArgs = {
  userId: Scalars['ID'];
  mood: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  message: Scalars['String'];
  id: Scalars['ID'];
};

export type Pronouns =
  | 'THEY_THEM'
  | 'HE_HIS'
  | 'SHE_HER'
  | 'NONE';

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getConversations?: Maybe<Array<Maybe<Conversation>>>;
  getConversation?: Maybe<Conversation>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetConversationsArgs = {
  userId: Scalars['ID'];
};


export type QueryGetConversationArgs = {
  channel: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chat?: Maybe<Message>;
  waitingRoom?: Maybe<Match>;
};


export type SubscriptionChatArgs = {
  channel: Scalars['String'];
};


export type SubscriptionWaitingRoomArgs = {
  userId: Scalars['ID'];
  chatTypes: Array<ConversationType>;
};

export type TalkNumbers = {
  __typename?: 'TalkNumbers';
  small: Scalars['Int'];
  deep: Scalars['Int'];
  light: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  birthday: Scalars['String'];
  pronouns: Pronouns;
  interests: Array<Scalars['String']>;
  mood: Scalars['String'];
  formattedPronouns?: Maybe<Scalars['String']>;
  overallRating?: Maybe<Scalars['Float']>;
  numSmallTalk?: Maybe<Scalars['Int']>;
  talkNumbers?: Maybe<TalkNumbers>;
  badgeNumbers?: Maybe<BadgeNumbers>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BadgeNumbers: ResolverTypeWrapper<BadgeNumbers>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Chat: ResolverTypeWrapper<Chat>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Conversation: ResolverTypeWrapper<Conversation>;
  ConversationType: ConversationType;
  Match: ResolverTypeWrapper<Match>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Profile: ResolverTypeWrapper<Profile>;
  Pronouns: Pronouns;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  TalkNumbers: ResolverTypeWrapper<TalkNumbers>;
  User: ResolverTypeWrapper<User>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BadgeNumbers: BadgeNumbers;
  Int: Scalars['Int'];
  Chat: Chat;
  String: Scalars['String'];
  ID: Scalars['ID'];
  Conversation: Conversation;
  Match: Match;
  Message: Message;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Profile: Profile;
  Query: {};
  Subscription: {};
  TalkNumbers: TalkNumbers;
  User: User;
  Float: Scalars['Float'];
};

export type BadgeNumbersResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['BadgeNumbers'] = ResolversParentTypes['BadgeNumbers']> = {
  joymaker?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  charming?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  jufanaut?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MatchResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Match'] = ResolversParentTypes['Match']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chatType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icebreaker?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'channel' | 'message' | 'author'>>;
  leaveWaitingRoom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLeaveWaitingRoomArgs, 'userId'>>;
  createProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<MutationCreateProfileArgs, 'name' | 'birthday'>>;
  createChatFeedback?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateChatFeedbackArgs, 'author' | 'channel' | 'engagementRating' | 'howFeelingAfter' | 'mood' | 'smile' | 'talkAgain'>>;
  updateInterests?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateInterestsArgs, 'userId'>>;
  updateMood?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateMoodArgs, 'userId' | 'mood'>>;
};

export type ProfileResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getConversations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Conversation']>>>, ParentType, ContextType, RequireFields<QueryGetConversationsArgs, 'userId'>>;
  getConversation?: Resolver<Maybe<ResolversTypes['Conversation']>, ParentType, ContextType, RequireFields<QueryGetConversationArgs, 'channel'>>;
};

export type SubscriptionResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  chat?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "chat", ParentType, ContextType, RequireFields<SubscriptionChatArgs, 'channel'>>;
  waitingRoom?: SubscriptionResolver<Maybe<ResolversTypes['Match']>, "waitingRoom", ParentType, ContextType, RequireFields<SubscriptionWaitingRoomArgs, 'userId' | 'chatTypes'>>;
};

export type TalkNumbersResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['TalkNumbers'] = ResolversParentTypes['TalkNumbers']> = {
  small?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deep?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  light?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birthday?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pronouns?: Resolver<ResolversTypes['Pronouns'], ParentType, ContextType>;
  interests?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  mood?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  formattedPronouns?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overallRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  numSmallTalk?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  talkNumbers?: Resolver<Maybe<ResolversTypes['TalkNumbers']>, ParentType, ContextType>;
  badgeNumbers?: Resolver<Maybe<ResolversTypes['BadgeNumbers']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = JufaContextType> = {
  BadgeNumbers?: BadgeNumbersResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  Match?: MatchResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TalkNumbers?: TalkNumbersResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = JufaContextType> = Resolvers<ContextType>;

export type MessageFragmentFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'text' | 'createdAt' | 'userId'>
);

export type ChatScreenSubscriptionVariables = Exact<{
  channel: Scalars['String'];
}>;


export type ChatScreenSubscription = (
  { __typename?: 'Subscription' }
  & { chat?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'id'>
    & MessageFragmentFragment
  )> }
);

export type CreateMessageMutationVariables = Exact<{
  channel: Scalars['String'];
  message: Scalars['String'];
  author: Scalars['ID'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage?: Maybe<(
    { __typename: 'Message' }
    & Pick<Message, 'id'>
    & MessageFragmentFragment
  )> }
);

export type ChatScreenConversationFragment = (
  { __typename?: 'Conversation' }
  & Pick<Conversation, 'id'>
  & { messages?: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id'>
    & MessageFragmentFragment
  )>> }
);

export type ChatScreenConversationQueryVariables = Exact<{
  channel: Scalars['String'];
}>;


export type ChatScreenConversationQuery = (
  { __typename?: 'Query' }
  & { getConversation?: Maybe<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id'>
    & ChatScreenConversationFragment
  )> }
);

export type CreateProfileMutationVariables = Exact<{
  name: Scalars['String'];
  birthday: Scalars['String'];
  pronouns: Pronouns;
}>;


export type CreateProfileMutation = (
  { __typename?: 'Mutation' }
  & { createProfile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'message' | 'id'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'mood'>
  )> }
);

export type ChatFeedbackMutationVariables = Exact<{
  author: Scalars['ID'];
  channel: Scalars['String'];
  engagementRating: Scalars['Int'];
  howFeelingAfter: Scalars['String'];
  mood: Scalars['String'];
  smile: Scalars['Boolean'];
  talkAgain: Scalars['Boolean'];
}>;


export type ChatFeedbackMutation = (
  { __typename?: 'Mutation' }
  & { createChatFeedback: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'mood'>
  ) }
);

export type ChatLogQueryQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ChatLogQueryQuery = (
  { __typename?: 'Query' }
  & { getConversations?: Maybe<Array<Maybe<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id' | 'createdAt' | 'channel'>
    & { lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text'>
    )>, people?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>> }
  )>>> }
);

export type UpdateMoodMutationVariables = Exact<{
  userId: Scalars['ID'];
  mood: Scalars['String'];
}>;


export type UpdateMoodMutation = (
  { __typename?: 'Mutation' }
  & { updateMood: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'mood'>
  ) }
);

export type UpdateInterestsMutationMutationVariables = Exact<{
  userId: Scalars['ID'];
  interests?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UpdateInterestsMutationMutation = (
  { __typename?: 'Mutation' }
  & { updateInterests: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'interests'>
  ) }
);

export type ProfileScreenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProfileScreenQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'createdAt' | 'birthday' | 'formattedPronouns' | 'interests' | 'overallRating'>
    & { talkNumbers?: Maybe<(
      { __typename?: 'TalkNumbers' }
      & Pick<TalkNumbers, 'deep' | 'small' | 'light'>
    )>, badgeNumbers?: Maybe<(
      { __typename?: 'BadgeNumbers' }
      & Pick<BadgeNumbers, 'charming' | 'joymaker' | 'jufanaut'>
    )> }
  )> }
);

export type WaitingScreenSubscriptionVariables = Exact<{
  userId: Scalars['ID'];
  chatTypes: Array<ConversationType> | ConversationType;
}>;


export type WaitingScreenSubscription = (
  { __typename?: 'Subscription' }
  & { waitingRoom?: Maybe<(
    { __typename?: 'Match' }
    & Pick<Match, 'message' | 'users' | 'channel' | 'icebreaker' | 'chatType'>
  )> }
);

export type GetUserQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQueryQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'pronouns' | 'createdAt' | 'birthday'>
  )> }
);

export type LeaveWaitingRoomMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type LeaveWaitingRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveWaitingRoom'>
);
