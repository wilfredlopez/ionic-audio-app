import gql from "graphql-tag";

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

export type SongFragmentFragment = (
  & { __typename?: "Song" }
  & Pick<
    Song,
    | "name"
    | "imageUrl"
    | "audioUrl"
    | "id"
    | "artist"
    | "title"
    | "genre"
    | "album"
    | "createdAt"
    | "updatedAt"
    | "viewCount"
    | "promoted"
    | "artistList"
  >
);

export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Song = {
  __typename?: "Song";
  id: Scalars["ID"];
  artist: Scalars["String"];
  title: Scalars["String"];
  genre: Scalars["String"];
  album?: Maybe<Scalars["String"]>;
  viewCount?: Maybe<Scalars["Int"]>;
  promoted?: Maybe<Scalars["Boolean"]>;
  imageUrl: Scalars["String"];
  audioUrl: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  artistList: Array<Scalars["String"]>;
  name: Scalars["String"];
};

export type SongResponse = {
  __typename?: "SongResponse";
  songs: Array<Song>;
  totalCount: Scalars["Float"];
};
