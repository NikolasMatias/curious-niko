import PostTypes from "./PostTypes";

export default interface Profile {
    id: number|boolean
    username: string|null,
    twitterid: string|boolean,
    facebookid: string|boolean,
    facebooklink: string|boolean,
    avatar: string|null,
    banner: string|null,
    askboxtext: string|null,

    answers: number|null,
    followers: number|null,
    followers_count: number|null,
    following: number|null,
    following_count: number|null,
    follows_you: boolean|null,
    followstatus: boolean|null,
    is_followed_by_me: boolean|null,
    is_following_me: boolean|null,

    lang: string|null,
    last_online: null|any,
    status_emoji: string|null,
    verified: boolean|null,

    posts: PostTypes[]
}