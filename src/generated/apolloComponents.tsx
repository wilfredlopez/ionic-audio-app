import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  AmIAuthorized?: Maybe<Scalars['Boolean']>;
  getAllUsers: Array<User>;
  getSongByid: Song;
  getSongByGenre: SongResponse;
  getAllSongs: SongResponse;
  searchSongs: SongResponse;
  getPromotedSongs: SongResponse;
  getUserPlaylist?: Maybe<Playlist>;
};


export type QueryGetSongByidArgs = {
  id: Scalars['String'];
};


export type QueryGetSongByGenreArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  genre: Scalars['String'];
};


export type QueryGetAllSongsArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySearchSongsArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QueryGetPromotedSongsArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  stripeId?: Maybe<Scalars['String']>;
  ccLast4?: Maybe<Scalars['String']>;
  subscriptionStatus?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  count: Scalars['Float'];
  admin?: Maybe<Scalars['Boolean']>;
  confirmed: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  themeMode?: Maybe<Scalars['String']>;
  playlistId?: Maybe<Scalars['String']>;
  playlist?: Maybe<Playlist>;
  name: Scalars['String'];
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['ID'];
  userId: Scalars['String'];
  songs?: Maybe<Array<UserSongs>>;
};

export type UserSongs = {
  __typename?: 'UserSongs';
  songId: Scalars['String'];
  data?: Maybe<Song>;
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['ID'];
  artist: Scalars['String'];
  title: Scalars['String'];
  genre: Scalars['String'];
  album?: Maybe<Scalars['String']>;
  viewCount?: Maybe<Scalars['Int']>;
  promoted?: Maybe<Scalars['Boolean']>;
  imageUrl: Scalars['String'];
  audioUrl: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  artistList: Array<Scalars['String']>;
  name: Scalars['String'];
};


export type SongResponse = {
  __typename?: 'SongResponse';
  songs: Array<Song>;
  totalCount: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  updateUser: Scalars['Boolean'];
  adminLogin?: Maybe<User>;
  login?: Maybe<User>;
  changeTheme: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  makeUserAdmin: Scalars['Boolean'];
  confirmUser: Scalars['Boolean'];
  uploadSong: Song;
  saveAndUploadSong: Song;
  saveAndUploadSongWithBulkPng: Song;
  deleteSongById: Scalars['Boolean'];
  promoteSong: Scalars['Boolean'];
  updateSong: Song;
  addSongView: Scalars['Boolean'];
  addToPlaylist: Scalars['Boolean'];
  removeFromPlaylist: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  userData: UserInputType;
};


export type MutationUpdateUserArgs = {
  userInput: UpdateUserInputType;
};


export type MutationAdminLoginArgs = {
  loginData: UserLoginInput;
};


export type MutationLoginArgs = {
  loginData: UserLoginInput;
};


export type MutationChangeThemeArgs = {
  themeMode: Scalars['String'];
};


export type MutationMakeUserAdminArgs = {
  email: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationUploadSongArgs = {
  songData: SongInputType;
};


export type MutationSaveAndUploadSongArgs = {
  songData: SaveAndUploadSongInput;
};


export type MutationSaveAndUploadSongWithBulkPngArgs = {
  songData: SaveAndUploadSongInput;
};


export type MutationDeleteSongByIdArgs = {
  id: Scalars['String'];
};


export type MutationPromoteSongArgs = {
  id: Scalars['String'];
};


export type MutationUpdateSongArgs = {
  updateInput: UpdateSongInputType;
  id: Scalars['String'];
};


export type MutationAddSongViewArgs = {
  id: Scalars['String'];
};


export type MutationAddToPlaylistArgs = {
  songsData: AddToPlaylistInputType;
};


export type MutationRemoveFromPlaylistArgs = {
  id: Scalars['String'];
};

export type UserInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

export type UpdateUserInputType = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SongInputType = {
  artist: Scalars['String'];
  title: Scalars['String'];
  genre: Scalars['String'];
  album?: Maybe<Scalars['String']>;
  viewCount?: Maybe<Scalars['Int']>;
  imageUrl: Scalars['String'];
  audioUrl: Scalars['String'];
};

export type SaveAndUploadSongInput = {
  artist: Scalars['String'];
  title: Scalars['String'];
  genre: Scalars['String'];
  album?: Maybe<Scalars['String']>;
  imageFile?: Maybe<Scalars['Upload']>;
  audioFile?: Maybe<Scalars['Upload']>;
  imageUrl?: Maybe<Scalars['String']>;
  audioUrl?: Maybe<Scalars['String']>;
};


export type UpdateSongInputType = {
  artist?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  album?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  audioUrl?: Maybe<Scalars['String']>;
  promoted?: Maybe<Scalars['Boolean']>;
};

export type AddToPlaylistInputType = {
  songs: Array<PlaylistSong>;
};

export type PlaylistSong = {
  songId: Scalars['String'];
};

export type MyUploadType = {
  __typename?: 'MyUploadType';
  stream: Scalars['Boolean'];
  createReadStream: Scalars['Boolean'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type SongFragmentFragment = (
  { __typename?: 'Song' }
  & Pick<Song, 'name' | 'imageUrl' | 'audioUrl' | 'id' | 'artist' | 'title' | 'genre' | 'album' | 'createdAt' | 'updatedAt' | 'viewCount' | 'promoted' | 'artistList'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'name' | 'avatar' | 'id' | 'email' | 'admin' | 'firstName' | 'lastName' | 'accessToken' | 'refreshToken' | 'themeMode'>
);

export type AddSongViewgMutationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddSongViewgMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSongView'>
);

export type AddToPlaylistMutationMutationVariables = Exact<{
  songs: Array<PlaylistSong>;
}>;


export type AddToPlaylistMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToPlaylist'>
);

export type DeleteSongByIdMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSongByIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSongById'>
);

export type GetAllSongsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetAllSongsQuery = (
  { __typename?: 'Query' }
  & { getAllSongs: (
    { __typename?: 'SongResponse' }
    & Pick<SongResponse, 'totalCount'>
    & { songs: Array<(
      { __typename?: 'Song' }
      & SongFragmentFragment
    )> }
  ) }
);

export type GetPromotedSongsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetPromotedSongsQuery = (
  { __typename?: 'Query' }
  & { getPromotedSongs: (
    { __typename?: 'SongResponse' }
    & Pick<SongResponse, 'totalCount'>
    & { songs: Array<(
      { __typename?: 'Song' }
      & SongFragmentFragment
    )> }
  ) }
);

export type GetSongByGenreQueryVariables = Exact<{
  genre: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetSongByGenreQuery = (
  { __typename?: 'Query' }
  & { getSongByGenre: (
    { __typename?: 'SongResponse' }
    & Pick<SongResponse, 'totalCount'>
    & { songs: Array<(
      { __typename?: 'Song' }
      & SongFragmentFragment
    )> }
  ) }
);

export type GetSongByidQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSongByidQuery = (
  { __typename?: 'Query' }
  & { getSongByid: (
    { __typename?: 'Song' }
    & SongFragmentFragment
  ) }
);

export type GetUserPlaylistQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPlaylistQuery = (
  { __typename?: 'Query' }
  & { getUserPlaylist?: Maybe<(
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'id'>
    & { songs?: Maybe<Array<(
      { __typename?: 'UserSongs' }
      & Pick<UserSongs, 'songId'>
      & { data?: Maybe<(
        { __typename?: 'Song' }
        & SongFragmentFragment
      )> }
    )>> }
  )> }
);

export type RemoveFromPlaylistMutationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveFromPlaylistMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFromPlaylist'>
);

export type SaveAndUploadSongMutationVariables = Exact<{
  artist: Scalars['String'];
  title: Scalars['String'];
  genre: Scalars['String'];
  album?: Maybe<Scalars['String']>;
  audioFile?: Maybe<Scalars['Upload']>;
  imageFile?: Maybe<Scalars['Upload']>;
  imageUrl?: Maybe<Scalars['String']>;
  audioUrl?: Maybe<Scalars['String']>;
}>;


export type SaveAndUploadSongMutation = (
  { __typename?: 'Mutation' }
  & { saveAndUploadSong: (
    { __typename?: 'Song' }
    & SongFragmentFragment
  ) }
);

export type SaveAndUploadSongWithBulkPngMutationVariables = Exact<{
  artist: Scalars['String'];
  title: Scalars['String'];
  genre: Scalars['String'];
  album?: Maybe<Scalars['String']>;
  audioFile?: Maybe<Scalars['Upload']>;
  imageFile?: Maybe<Scalars['Upload']>;
  imageUrl?: Maybe<Scalars['String']>;
  audioUrl?: Maybe<Scalars['String']>;
}>;


export type SaveAndUploadSongWithBulkPngMutation = (
  { __typename?: 'Mutation' }
  & { saveAndUploadSongWithBulkPng: (
    { __typename?: 'Song' }
    & SongFragmentFragment
  ) }
);

export type SearchSongsQueryVariables = Exact<{
  query: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type SearchSongsQuery = (
  { __typename?: 'Query' }
  & { searchSongs: (
    { __typename?: 'SongResponse' }
    & Pick<SongResponse, 'totalCount'>
    & { songs: Array<(
      { __typename?: 'Song' }
      & SongFragmentFragment
    )> }
  ) }
);

export type UpdateSongMutationVariables = Exact<{
  id: Scalars['String'];
  artist?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  album?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  audioUrl?: Maybe<Scalars['String']>;
  promoted?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateSongMutation = (
  { __typename?: 'Mutation' }
  & { updateSong: (
    { __typename?: 'Song' }
    & SongFragmentFragment
  ) }
);

export type UploadSongMutationVariables = Exact<{
  artist: Scalars['String'];
  title: Scalars['String'];
  genre: Scalars['String'];
  album?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  audioUrl: Scalars['String'];
}>;


export type UploadSongMutation = (
  { __typename?: 'Mutation' }
  & { uploadSong: (
    { __typename?: 'Song' }
    & SongFragmentFragment
  ) }
);

export type ChangeThemeMutationMutationVariables = Exact<{
  themeMode: Scalars['String'];
}>;


export type ChangeThemeMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeTheme'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type AmIAuthorizedQueryVariables = Exact<{ [key: string]: never; }>;


export type AmIAuthorizedQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'AmIAuthorized'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export const SongFragmentFragmentDoc = gql`
    fragment SongFragment on Song {
  name
  imageUrl
  audioUrl
  id
  artist
  title
  genre
  album
  createdAt
  updatedAt
  viewCount
  promoted
  artistList
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  name
  avatar
  id
  email
  admin
  firstName
  lastName
  accessToken
  refreshToken
  themeMode
}
    `;
export const AddSongViewgMutationDocument = gql`
    mutation AddSongViewgMutation($id: String!) {
  addSongView(id: $id)
}
    `;
export type AddSongViewgMutationMutationFn = Apollo.MutationFunction<AddSongViewgMutationMutation, AddSongViewgMutationMutationVariables>;

/**
 * __useAddSongViewgMutationMutation__
 *
 * To run a mutation, you first call `useAddSongViewgMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSongViewgMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSongViewgMutationMutation, { data, loading, error }] = useAddSongViewgMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddSongViewgMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddSongViewgMutationMutation, AddSongViewgMutationMutationVariables>) {
        return Apollo.useMutation<AddSongViewgMutationMutation, AddSongViewgMutationMutationVariables>(AddSongViewgMutationDocument, baseOptions);
      }
export type AddSongViewgMutationMutationHookResult = ReturnType<typeof useAddSongViewgMutationMutation>;
export type AddSongViewgMutationMutationResult = Apollo.MutationResult<AddSongViewgMutationMutation>;
export type AddSongViewgMutationMutationOptions = Apollo.BaseMutationOptions<AddSongViewgMutationMutation, AddSongViewgMutationMutationVariables>;
export const AddToPlaylistMutationDocument = gql`
    mutation AddToPlaylistMutation($songs: [PlaylistSong!]!) {
  addToPlaylist(songsData: {songs: $songs})
}
    `;
export type AddToPlaylistMutationMutationFn = Apollo.MutationFunction<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>;

/**
 * __useAddToPlaylistMutationMutation__
 *
 * To run a mutation, you first call `useAddToPlaylistMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToPlaylistMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToPlaylistMutationMutation, { data, loading, error }] = useAddToPlaylistMutationMutation({
 *   variables: {
 *      songs: // value for 'songs'
 *   },
 * });
 */
export function useAddToPlaylistMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>) {
        return Apollo.useMutation<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>(AddToPlaylistMutationDocument, baseOptions);
      }
export type AddToPlaylistMutationMutationHookResult = ReturnType<typeof useAddToPlaylistMutationMutation>;
export type AddToPlaylistMutationMutationResult = Apollo.MutationResult<AddToPlaylistMutationMutation>;
export type AddToPlaylistMutationMutationOptions = Apollo.BaseMutationOptions<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>;
export const DeleteSongByIdDocument = gql`
    mutation DeleteSongById($id: String!) {
  deleteSongById(id: $id)
}
    `;
export type DeleteSongByIdMutationFn = Apollo.MutationFunction<DeleteSongByIdMutation, DeleteSongByIdMutationVariables>;

/**
 * __useDeleteSongByIdMutation__
 *
 * To run a mutation, you first call `useDeleteSongByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSongByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSongByIdMutation, { data, loading, error }] = useDeleteSongByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSongByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSongByIdMutation, DeleteSongByIdMutationVariables>) {
        return Apollo.useMutation<DeleteSongByIdMutation, DeleteSongByIdMutationVariables>(DeleteSongByIdDocument, baseOptions);
      }
export type DeleteSongByIdMutationHookResult = ReturnType<typeof useDeleteSongByIdMutation>;
export type DeleteSongByIdMutationResult = Apollo.MutationResult<DeleteSongByIdMutation>;
export type DeleteSongByIdMutationOptions = Apollo.BaseMutationOptions<DeleteSongByIdMutation, DeleteSongByIdMutationVariables>;
export const GetAllSongsDocument = gql`
    query GetAllSongs($skip: Int, $limit: Int) {
  getAllSongs(skip: $skip, limit: $limit) {
    totalCount
    songs {
      ...SongFragment
    }
  }
}
    ${SongFragmentFragmentDoc}`;

/**
 * __useGetAllSongsQuery__
 *
 * To run a query within a React component, call `useGetAllSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSongsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetAllSongsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSongsQuery, GetAllSongsQueryVariables>) {
        return Apollo.useQuery<GetAllSongsQuery, GetAllSongsQueryVariables>(GetAllSongsDocument, baseOptions);
      }
export function useGetAllSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSongsQuery, GetAllSongsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllSongsQuery, GetAllSongsQueryVariables>(GetAllSongsDocument, baseOptions);
        }
export type GetAllSongsQueryHookResult = ReturnType<typeof useGetAllSongsQuery>;
export type GetAllSongsLazyQueryHookResult = ReturnType<typeof useGetAllSongsLazyQuery>;
export type GetAllSongsQueryResult = Apollo.QueryResult<GetAllSongsQuery, GetAllSongsQueryVariables>;
export const GetPromotedSongsDocument = gql`
    query GetPromotedSongs($skip: Int, $limit: Int) {
  getPromotedSongs(skip: $skip, limit: $limit) {
    totalCount
    songs {
      ...SongFragment
    }
  }
}
    ${SongFragmentFragmentDoc}`;

/**
 * __useGetPromotedSongsQuery__
 *
 * To run a query within a React component, call `useGetPromotedSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPromotedSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPromotedSongsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPromotedSongsQuery(baseOptions?: Apollo.QueryHookOptions<GetPromotedSongsQuery, GetPromotedSongsQueryVariables>) {
        return Apollo.useQuery<GetPromotedSongsQuery, GetPromotedSongsQueryVariables>(GetPromotedSongsDocument, baseOptions);
      }
export function useGetPromotedSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPromotedSongsQuery, GetPromotedSongsQueryVariables>) {
          return Apollo.useLazyQuery<GetPromotedSongsQuery, GetPromotedSongsQueryVariables>(GetPromotedSongsDocument, baseOptions);
        }
export type GetPromotedSongsQueryHookResult = ReturnType<typeof useGetPromotedSongsQuery>;
export type GetPromotedSongsLazyQueryHookResult = ReturnType<typeof useGetPromotedSongsLazyQuery>;
export type GetPromotedSongsQueryResult = Apollo.QueryResult<GetPromotedSongsQuery, GetPromotedSongsQueryVariables>;
export const GetSongByGenreDocument = gql`
    query GetSongByGenre($genre: String!, $skip: Int, $limit: Int) {
  getSongByGenre(genre: $genre, skip: $skip, limit: $limit) {
    totalCount
    songs {
      ...SongFragment
    }
  }
}
    ${SongFragmentFragmentDoc}`;

/**
 * __useGetSongByGenreQuery__
 *
 * To run a query within a React component, call `useGetSongByGenreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSongByGenreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSongByGenreQuery({
 *   variables: {
 *      genre: // value for 'genre'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetSongByGenreQuery(baseOptions: Apollo.QueryHookOptions<GetSongByGenreQuery, GetSongByGenreQueryVariables>) {
        return Apollo.useQuery<GetSongByGenreQuery, GetSongByGenreQueryVariables>(GetSongByGenreDocument, baseOptions);
      }
export function useGetSongByGenreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSongByGenreQuery, GetSongByGenreQueryVariables>) {
          return Apollo.useLazyQuery<GetSongByGenreQuery, GetSongByGenreQueryVariables>(GetSongByGenreDocument, baseOptions);
        }
export type GetSongByGenreQueryHookResult = ReturnType<typeof useGetSongByGenreQuery>;
export type GetSongByGenreLazyQueryHookResult = ReturnType<typeof useGetSongByGenreLazyQuery>;
export type GetSongByGenreQueryResult = Apollo.QueryResult<GetSongByGenreQuery, GetSongByGenreQueryVariables>;
export const GetSongByidDocument = gql`
    query GetSongByid($id: String!) {
  getSongByid(id: $id) {
    ...SongFragment
  }
}
    ${SongFragmentFragmentDoc}`;

/**
 * __useGetSongByidQuery__
 *
 * To run a query within a React component, call `useGetSongByidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSongByidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSongByidQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSongByidQuery(baseOptions: Apollo.QueryHookOptions<GetSongByidQuery, GetSongByidQueryVariables>) {
        return Apollo.useQuery<GetSongByidQuery, GetSongByidQueryVariables>(GetSongByidDocument, baseOptions);
      }
export function useGetSongByidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSongByidQuery, GetSongByidQueryVariables>) {
          return Apollo.useLazyQuery<GetSongByidQuery, GetSongByidQueryVariables>(GetSongByidDocument, baseOptions);
        }
export type GetSongByidQueryHookResult = ReturnType<typeof useGetSongByidQuery>;
export type GetSongByidLazyQueryHookResult = ReturnType<typeof useGetSongByidLazyQuery>;
export type GetSongByidQueryResult = Apollo.QueryResult<GetSongByidQuery, GetSongByidQueryVariables>;
export const GetUserPlaylistDocument = gql`
    query GetUserPlaylist {
  getUserPlaylist {
    id
    songs {
      songId
      data {
        ...SongFragment
      }
    }
  }
}
    ${SongFragmentFragmentDoc}`;

/**
 * __useGetUserPlaylistQuery__
 *
 * To run a query within a React component, call `useGetUserPlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPlaylistQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPlaylistQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPlaylistQuery, GetUserPlaylistQueryVariables>) {
        return Apollo.useQuery<GetUserPlaylistQuery, GetUserPlaylistQueryVariables>(GetUserPlaylistDocument, baseOptions);
      }
export function useGetUserPlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPlaylistQuery, GetUserPlaylistQueryVariables>) {
          return Apollo.useLazyQuery<GetUserPlaylistQuery, GetUserPlaylistQueryVariables>(GetUserPlaylistDocument, baseOptions);
        }
export type GetUserPlaylistQueryHookResult = ReturnType<typeof useGetUserPlaylistQuery>;
export type GetUserPlaylistLazyQueryHookResult = ReturnType<typeof useGetUserPlaylistLazyQuery>;
export type GetUserPlaylistQueryResult = Apollo.QueryResult<GetUserPlaylistQuery, GetUserPlaylistQueryVariables>;
export const RemoveFromPlaylistMutationDocument = gql`
    mutation RemoveFromPlaylistMutation($id: String!) {
  removeFromPlaylist(id: $id)
}
    `;
export type RemoveFromPlaylistMutationMutationFn = Apollo.MutationFunction<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>;

/**
 * __useRemoveFromPlaylistMutationMutation__
 *
 * To run a mutation, you first call `useRemoveFromPlaylistMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromPlaylistMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromPlaylistMutationMutation, { data, loading, error }] = useRemoveFromPlaylistMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFromPlaylistMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>) {
        return Apollo.useMutation<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>(RemoveFromPlaylistMutationDocument, baseOptions);
      }
export type RemoveFromPlaylistMutationMutationHookResult = ReturnType<typeof useRemoveFromPlaylistMutationMutation>;
export type RemoveFromPlaylistMutationMutationResult = Apollo.MutationResult<RemoveFromPlaylistMutationMutation>;
export type RemoveFromPlaylistMutationMutationOptions = Apollo.BaseMutationOptions<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>;
export const SaveAndUploadSongDocument = gql`
    mutation SaveAndUploadSong($artist: String!, $title: String!, $genre: String!, $album: String, $audioFile: Upload, $imageFile: Upload, $imageUrl: String, $audioUrl: String) {
  saveAndUploadSong(
    songData: {artist: $artist, title: $title, genre: $genre, album: $album, imageUrl: $imageUrl, audioUrl: $audioUrl, audioFile: $audioFile, imageFile: $imageFile}
  ) {
    ...SongFragment
  }
}
    ${SongFragmentFragmentDoc}`;
export type SaveAndUploadSongMutationFn = Apollo.MutationFunction<SaveAndUploadSongMutation, SaveAndUploadSongMutationVariables>;

/**
 * __useSaveAndUploadSongMutation__
 *
 * To run a mutation, you first call `useSaveAndUploadSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAndUploadSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAndUploadSongMutation, { data, loading, error }] = useSaveAndUploadSongMutation({
 *   variables: {
 *      artist: // value for 'artist'
 *      title: // value for 'title'
 *      genre: // value for 'genre'
 *      album: // value for 'album'
 *      audioFile: // value for 'audioFile'
 *      imageFile: // value for 'imageFile'
 *      imageUrl: // value for 'imageUrl'
 *      audioUrl: // value for 'audioUrl'
 *   },
 * });
 */
export function useSaveAndUploadSongMutation(baseOptions?: Apollo.MutationHookOptions<SaveAndUploadSongMutation, SaveAndUploadSongMutationVariables>) {
        return Apollo.useMutation<SaveAndUploadSongMutation, SaveAndUploadSongMutationVariables>(SaveAndUploadSongDocument, baseOptions);
      }
export type SaveAndUploadSongMutationHookResult = ReturnType<typeof useSaveAndUploadSongMutation>;
export type SaveAndUploadSongMutationResult = Apollo.MutationResult<SaveAndUploadSongMutation>;
export type SaveAndUploadSongMutationOptions = Apollo.BaseMutationOptions<SaveAndUploadSongMutation, SaveAndUploadSongMutationVariables>;
export const SaveAndUploadSongWithBulkPngDocument = gql`
    mutation SaveAndUploadSongWithBulkPng($artist: String!, $title: String!, $genre: String!, $album: String, $audioFile: Upload, $imageFile: Upload, $imageUrl: String, $audioUrl: String) {
  saveAndUploadSongWithBulkPng(
    songData: {artist: $artist, title: $title, genre: $genre, album: $album, imageUrl: $imageUrl, audioUrl: $audioUrl, audioFile: $audioFile, imageFile: $imageFile}
  ) {
    ...SongFragment
  }
}
    ${SongFragmentFragmentDoc}`;
export type SaveAndUploadSongWithBulkPngMutationFn = Apollo.MutationFunction<SaveAndUploadSongWithBulkPngMutation, SaveAndUploadSongWithBulkPngMutationVariables>;

/**
 * __useSaveAndUploadSongWithBulkPngMutation__
 *
 * To run a mutation, you first call `useSaveAndUploadSongWithBulkPngMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAndUploadSongWithBulkPngMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAndUploadSongWithBulkPngMutation, { data, loading, error }] = useSaveAndUploadSongWithBulkPngMutation({
 *   variables: {
 *      artist: // value for 'artist'
 *      title: // value for 'title'
 *      genre: // value for 'genre'
 *      album: // value for 'album'
 *      audioFile: // value for 'audioFile'
 *      imageFile: // value for 'imageFile'
 *      imageUrl: // value for 'imageUrl'
 *      audioUrl: // value for 'audioUrl'
 *   },
 * });
 */
export function useSaveAndUploadSongWithBulkPngMutation(baseOptions?: Apollo.MutationHookOptions<SaveAndUploadSongWithBulkPngMutation, SaveAndUploadSongWithBulkPngMutationVariables>) {
        return Apollo.useMutation<SaveAndUploadSongWithBulkPngMutation, SaveAndUploadSongWithBulkPngMutationVariables>(SaveAndUploadSongWithBulkPngDocument, baseOptions);
      }
export type SaveAndUploadSongWithBulkPngMutationHookResult = ReturnType<typeof useSaveAndUploadSongWithBulkPngMutation>;
export type SaveAndUploadSongWithBulkPngMutationResult = Apollo.MutationResult<SaveAndUploadSongWithBulkPngMutation>;
export type SaveAndUploadSongWithBulkPngMutationOptions = Apollo.BaseMutationOptions<SaveAndUploadSongWithBulkPngMutation, SaveAndUploadSongWithBulkPngMutationVariables>;
export const SearchSongsDocument = gql`
    query SearchSongs($query: String!, $skip: Int, $limit: Int) {
  searchSongs(query: $query, skip: $skip, limit: $limit) {
    totalCount
    songs {
      ...SongFragment
    }
  }
}
    ${SongFragmentFragmentDoc}`;

/**
 * __useSearchSongsQuery__
 *
 * To run a query within a React component, call `useSearchSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSongsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchSongsQuery(baseOptions: Apollo.QueryHookOptions<SearchSongsQuery, SearchSongsQueryVariables>) {
        return Apollo.useQuery<SearchSongsQuery, SearchSongsQueryVariables>(SearchSongsDocument, baseOptions);
      }
export function useSearchSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSongsQuery, SearchSongsQueryVariables>) {
          return Apollo.useLazyQuery<SearchSongsQuery, SearchSongsQueryVariables>(SearchSongsDocument, baseOptions);
        }
export type SearchSongsQueryHookResult = ReturnType<typeof useSearchSongsQuery>;
export type SearchSongsLazyQueryHookResult = ReturnType<typeof useSearchSongsLazyQuery>;
export type SearchSongsQueryResult = Apollo.QueryResult<SearchSongsQuery, SearchSongsQueryVariables>;
export const UpdateSongDocument = gql`
    mutation UpdateSong($id: String!, $artist: String, $title: String, $genre: String, $album: String, $imageUrl: String, $audioUrl: String, $promoted: Boolean) {
  updateSong(
    id: $id
    updateInput: {artist: $artist, title: $title, genre: $genre, album: $album, promoted: $promoted, imageUrl: $imageUrl, audioUrl: $audioUrl}
  ) {
    ...SongFragment
  }
}
    ${SongFragmentFragmentDoc}`;
export type UpdateSongMutationFn = Apollo.MutationFunction<UpdateSongMutation, UpdateSongMutationVariables>;

/**
 * __useUpdateSongMutation__
 *
 * To run a mutation, you first call `useUpdateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSongMutation, { data, loading, error }] = useUpdateSongMutation({
 *   variables: {
 *      id: // value for 'id'
 *      artist: // value for 'artist'
 *      title: // value for 'title'
 *      genre: // value for 'genre'
 *      album: // value for 'album'
 *      imageUrl: // value for 'imageUrl'
 *      audioUrl: // value for 'audioUrl'
 *      promoted: // value for 'promoted'
 *   },
 * });
 */
export function useUpdateSongMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSongMutation, UpdateSongMutationVariables>) {
        return Apollo.useMutation<UpdateSongMutation, UpdateSongMutationVariables>(UpdateSongDocument, baseOptions);
      }
export type UpdateSongMutationHookResult = ReturnType<typeof useUpdateSongMutation>;
export type UpdateSongMutationResult = Apollo.MutationResult<UpdateSongMutation>;
export type UpdateSongMutationOptions = Apollo.BaseMutationOptions<UpdateSongMutation, UpdateSongMutationVariables>;
export const UploadSongDocument = gql`
    mutation UploadSong($artist: String!, $title: String!, $genre: String!, $album: String, $imageUrl: String!, $audioUrl: String!) {
  uploadSong(
    songData: {artist: $artist, title: $title, genre: $genre, album: $album, imageUrl: $imageUrl, audioUrl: $audioUrl}
  ) {
    ...SongFragment
  }
}
    ${SongFragmentFragmentDoc}`;
export type UploadSongMutationFn = Apollo.MutationFunction<UploadSongMutation, UploadSongMutationVariables>;

/**
 * __useUploadSongMutation__
 *
 * To run a mutation, you first call `useUploadSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadSongMutation, { data, loading, error }] = useUploadSongMutation({
 *   variables: {
 *      artist: // value for 'artist'
 *      title: // value for 'title'
 *      genre: // value for 'genre'
 *      album: // value for 'album'
 *      imageUrl: // value for 'imageUrl'
 *      audioUrl: // value for 'audioUrl'
 *   },
 * });
 */
export function useUploadSongMutation(baseOptions?: Apollo.MutationHookOptions<UploadSongMutation, UploadSongMutationVariables>) {
        return Apollo.useMutation<UploadSongMutation, UploadSongMutationVariables>(UploadSongDocument, baseOptions);
      }
export type UploadSongMutationHookResult = ReturnType<typeof useUploadSongMutation>;
export type UploadSongMutationResult = Apollo.MutationResult<UploadSongMutation>;
export type UploadSongMutationOptions = Apollo.BaseMutationOptions<UploadSongMutation, UploadSongMutationVariables>;
export const ChangeThemeMutationDocument = gql`
    mutation ChangeThemeMutation($themeMode: String!) {
  changeTheme(themeMode: $themeMode)
}
    `;
export type ChangeThemeMutationMutationFn = Apollo.MutationFunction<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>;

/**
 * __useChangeThemeMutationMutation__
 *
 * To run a mutation, you first call `useChangeThemeMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeThemeMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeThemeMutationMutation, { data, loading, error }] = useChangeThemeMutationMutation({
 *   variables: {
 *      themeMode: // value for 'themeMode'
 *   },
 * });
 */
export function useChangeThemeMutationMutation(baseOptions?: Apollo.MutationHookOptions<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>) {
        return Apollo.useMutation<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>(ChangeThemeMutationDocument, baseOptions);
      }
export type ChangeThemeMutationMutationHookResult = ReturnType<typeof useChangeThemeMutationMutation>;
export type ChangeThemeMutationMutationResult = Apollo.MutationResult<ChangeThemeMutationMutation>;
export type ChangeThemeMutationMutationOptions = Apollo.BaseMutationOptions<ChangeThemeMutationMutation, ChangeThemeMutationMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginData: {email: $email, password: $password}) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutMutationDocument = gql`
    mutation LogoutMutation {
  logout
}
    `;
export type LogoutMutationMutationFn = Apollo.MutationFunction<LogoutMutationMutation, LogoutMutationMutationVariables>;

/**
 * __useLogoutMutationMutation__
 *
 * To run a mutation, you first call `useLogoutMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutationMutation, { data, loading, error }] = useLogoutMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutationMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutationMutation, LogoutMutationMutationVariables>) {
        return Apollo.useMutation<LogoutMutationMutation, LogoutMutationMutationVariables>(LogoutMutationDocument, baseOptions);
      }
export type LogoutMutationMutationHookResult = ReturnType<typeof useLogoutMutationMutation>;
export type LogoutMutationMutationResult = Apollo.MutationResult<LogoutMutationMutation>;
export type LogoutMutationMutationOptions = Apollo.BaseMutationOptions<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String, $lastName: String) {
  register(
    userData: {email: $email, password: $password, firstname: $firstName, lastname: $lastName}
  ) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($email: String!, $lastName: String!, $firstName: String!) {
  updateUser(
    userInput: {email: $email, firstName: $firstName, lastName: $lastName}
  )
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const AmIAuthorizedDocument = gql`
    query amIAuthorized {
  AmIAuthorized
}
    `;

/**
 * __useAmIAuthorizedQuery__
 *
 * To run a query within a React component, call `useAmIAuthorizedQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmIAuthorizedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmIAuthorizedQuery({
 *   variables: {
 *   },
 * });
 */
export function useAmIAuthorizedQuery(baseOptions?: Apollo.QueryHookOptions<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>) {
        return Apollo.useQuery<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>(AmIAuthorizedDocument, baseOptions);
      }
export function useAmIAuthorizedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>) {
          return Apollo.useLazyQuery<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>(AmIAuthorizedDocument, baseOptions);
        }
export type AmIAuthorizedQueryHookResult = ReturnType<typeof useAmIAuthorizedQuery>;
export type AmIAuthorizedLazyQueryHookResult = ReturnType<typeof useAmIAuthorizedLazyQuery>;
export type AmIAuthorizedQueryResult = Apollo.QueryResult<AmIAuthorizedQuery, AmIAuthorizedQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;