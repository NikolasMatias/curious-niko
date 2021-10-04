import Profile from "./Profile";

export default interface SentQuestion {
    success: boolean,
    dados: any,
    perfil: Profile,
    envio_pergunta: {
        to: string|null|undefined,
        anon: boolean,
        question: string
    }
}