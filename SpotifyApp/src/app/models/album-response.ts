export interface AlbumResponse{
    items: Album[]
}

export interface Album {
    id:string,
    total_tracks: number,
    name: string,
    release_date: string,
    images: {url: string, height: number, width:string}[];
}