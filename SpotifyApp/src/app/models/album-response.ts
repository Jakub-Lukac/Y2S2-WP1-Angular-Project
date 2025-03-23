export interface AlbumResponse{
    items: Album[]
}

interface Album {
    total_tracks: number,
    name: string,
    release_date: string,
    images: {url: string, height: number, width:string}[];
}