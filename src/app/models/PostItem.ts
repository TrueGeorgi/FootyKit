
export interface PostItem {
    id: string;
    name: string;
    img: string;
    likedBy: string[];
    dislikedBy: string[];
    creator: string | null | undefined;
    comments: string [];
}