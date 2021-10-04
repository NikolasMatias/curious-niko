import Profile from "./Profile";

export default interface Post {
    id: number,
    comment: string,
    reply: string,
    media: null|any,
    likes: number,
    senderData: Profile,

    seconds_elapsed: number,
    timestamp: number
}