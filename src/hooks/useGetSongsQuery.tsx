
// import gql from 'graphql-tag';
// import * as ApolloReactHooks from '@apollo/react-hooks';
// import { Maybe, Scalars, SongFragmentFragment, SongFragmentFragmentDoc, SongResponse } from './_QueryTypes'
// export type GetAllSongsQuery = (
//     { __typename?: 'Query' }
//     & {
//         getAllSongs: (
//             { __typename?: 'SongResponse' }
//             & Pick<SongResponse, 'totalCount'>
//             & {
//                 songs: Array<{ __typename?: 'Song' }
//                     & SongFragmentFragment
//                 >
//             }
//         )
//     }
// );


// export type GetAllSongsQueryVariables = {
//     skip?: Maybe<Scalars['Int']>,
//     limit?: Maybe<Scalars['Int']>
// };


// export const GetAllSongsDocument = gql`
//     query GetAllSongs($skip: Int, $limit: Int) {
//   getAllSongs(skip: $skip, limit: $limit) {
//     totalCount
//     songs {
//       ...SongFragment
//     }
//   }
// }
//     ${SongFragmentFragmentDoc}`;


// export function useGetAllSongsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllSongsQuery, GetAllSongsQueryVariables>) {
//     return ApolloReactHooks.useQuery<GetAllSongsQuery, GetAllSongsQueryVariables>(GetAllSongsDocument, baseOptions);
// }



// export function useGetAllSongsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllSongsQuery, GetAllSongsQueryVariables>) {
//     return ApolloReactHooks.useLazyQuery<GetAllSongsQuery, GetAllSongsQueryVariables>(GetAllSongsDocument, baseOptions);
// }
export { }