

export interface PostItemPostDTO {
    name: string;
    img: string;
    creator: string | null | undefined;
    likedBy: string[];
    dislikedBy: string [];
}