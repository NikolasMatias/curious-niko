import Profile from "./Profile";

export default interface SentQuestion {
    success: boolean|null|undefined,
    dados: any,
    perfil: Profile|null|undefined,
    envio_pergunta: {
        to: string|null|undefined,
        anon: boolean,
        question: string
    }
}