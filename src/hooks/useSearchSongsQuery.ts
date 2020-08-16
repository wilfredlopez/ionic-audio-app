import {
  Maybe,
  Scalars,
  SongFragmentFragment,
  SongFragmentFragmentDoc,
  SongResponse,
} from "./QueryTypes";
import gql from "graphql-tag";

import * as ApolloReactHooks from "@apollo/react-hooks";

export type SearchSongsQuery = (
  & { __typename?: "Query" }
  & {
    searchSongs: (
      & { __typename?: "SongResponse" }
      & Pick<SongResponse, "totalCount">
      & {
        songs: Array<
          & { __typename?: "Song" }
          & SongFragmentFragment
        >;
      }
    );
  }
);

export type SearchSongsQueryVariables = {
  query: Scalars["String"];
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

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

export function useSearchSongsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SearchSongsQuery,
    SearchSongsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<SearchSongsQuery, SearchSongsQueryVariables>(
    SearchSongsDocument,
    baseOptions,
  );
}

export function useSearchSongsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SearchSongsQuery,
    SearchSongsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    SearchSongsQuery,
    SearchSongsQueryVariables
  >(SearchSongsDocument, baseOptions);
}
