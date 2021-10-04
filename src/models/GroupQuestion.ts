import Question from "./Question";

export default interface GroupQuestion {
    group_name: string,
    questions: Question[]
}