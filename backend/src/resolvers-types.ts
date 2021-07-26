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

export type Chat = {
  __typename?: 'Chat';
  message: Scalars['String'];
  author: Scalars['ID'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id?: Maybe<Scalars['ID']>;
  channel?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  people?: Maybe<Array<Maybe<User>>>;
  lastMessage?: Maybe<Message>;
};

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
  text?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage?: Maybe<Chat>;
  leaveWaitingRoom?: Maybe<Scalars['String']>;
  createProfile?: Maybe<Profile>;
  createChatFeedback?: Maybe<Scalars['String']>;
  updateInterests?: Maybe<Array<Scalars['String']>>;
  updateMood?: Maybe<Scalars['String']>;
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
  smile: Scalars['String'];
  talkAgain: Scalars['String'];
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
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetConversationsArgs = {
  userId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chat?: Maybe<Chat>;
  waitingRoom?: Maybe<Match>;
};


export type SubscriptionChatArgs = {
  channel: Scalars['String'];
};


export type SubscriptionWaitingRoomArgs = {
  userId: Scalars['ID'];
  chatTypes: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  pronouns?: Maybe<Pronouns>;
  interests?: Maybe<Array<Scalars['String']>>;
  mood?: Maybe<Scalars['String']>;
  formattedPronouns?: Maybe<Scalars['String']>;
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
  Chat: ResolverTypeWrapper<Chat>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Conversation: ResolverTypeWrapper<Conversation>;
  Match: ResolverTypeWrapper<Match>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Profile: ResolverTypeWrapper<Profile>;
  Pronouns: Pronouns;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Chat: Chat;
  String: Scalars['String'];
  ID: Scalars['ID'];
  Conversation: Conversation;
  Match: Match;
  Message: Message;
  Mutation: {};
  Int: Scalars['Int'];
  Profile: Profile;
  Query: {};
  Subscription: {};
  User: User;
  Boolean: Scalars['Boolean'];
};

export type ChatResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  channel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  people?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
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
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMessage?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'channel' | 'message' | 'author'>>;
  leaveWaitingRoom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLeaveWaitingRoomArgs, 'userId'>>;
  createProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<MutationCreateProfileArgs, 'name' | 'birthday'>>;
  createChatFeedback?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateChatFeedbackArgs, 'author' | 'channel' | 'engagementRating' | 'howFeelingAfter' | 'mood' | 'smile' | 'talkAgain'>>;
  updateInterests?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, RequireFields<MutationUpdateInterestsArgs, 'userId'>>;
  updateMood?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateMoodArgs, 'userId' | 'mood'>>;
};

export type ProfileResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getConversations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Conversation']>>>, ParentType, ContextType, RequireFields<QueryGetConversationsArgs, 'userId'>>;
};

export type SubscriptionResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  chat?: SubscriptionResolver<Maybe<ResolversTypes['Chat']>, "chat", ParentType, ContextType, RequireFields<SubscriptionChatArgs, 'channel'>>;
  waitingRoom?: SubscriptionResolver<Maybe<ResolversTypes['Match']>, "waitingRoom", ParentType, ContextType, RequireFields<SubscriptionWaitingRoomArgs, 'userId' | 'chatTypes'>>;
};

export type UserResolvers<ContextType = JufaContextType, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pronouns?: Resolver<Maybe<ResolversTypes['Pronouns']>, ParentType, ContextType>;
  interests?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  mood?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  formattedPronouns?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = JufaContextType> = {
  Chat?: ChatResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  Match?: MatchResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = JufaContextType> = Resolvers<ContextType>;
