export interface TrackResponse{
    items: Track[]
}

interface Track {
    duration_ms:number,
    name:string,
    track_number:number
}