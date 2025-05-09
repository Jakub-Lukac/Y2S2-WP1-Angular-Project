export interface TrackResponse{
    items: Track[]
}

export interface Track {
    id: string,
    duration_ms:number,
    name:string,
    track_number:number
}

export interface FavoriteTrack extends Track {
    albumImageUrl: string;
}