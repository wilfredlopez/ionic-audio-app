import gql from "graphql-tag";
import { Song } from "../appState/State";

export type Maybe<T> = T | null;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

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

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type SongResponse = {
  __typename?: "SongResponse";
  songs: Array<Song>;
  totalCount: Scalars["Float"];
};
