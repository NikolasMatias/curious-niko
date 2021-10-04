import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import './Curioso.scss';
import Titulo from '../components/Titulo/Titulo';
import Menu from '../components/Menu/Menu';
import Button from '../components/Formulario/Button';
import QuestionsService from '../services/api/curiouscat/v2/QuestionsService'
import {useForm} from 'react-hook-form';
import * as FaIcons from "react-icons/fa";
import pergutnasProgramadas from './PerguntasProgramadas';
import Profile from "../models/Profile";
import SentQuestion from "../models/SentQuestion";
import GroupQuestion from "../models/GroupQuestion";

function separar(base : any, max : number) {
    let res : any = [];

    for (let i : number = 0; i < base.length; i = i+(max-1)) {
        res.push(base.slice(i,(i+max)));
    }
    res[res.length-1].push(base[0]);
    return res;
}

function Curioso() {
    const [perfil, setPerfil] = useState<Profile|null>(null);
    const [sentQuestions, setSentQuestions] = useState<SentQuestion[]>([]);
    const [groupQuestions, setGroupQuestions] = useState<GroupQuestion[]>(pergutnasProgramadas);

    const pesquisaPerfil = useForm();
    const questoesForm = useForm();

    window.getPerfil = () => {
        return perfil
    }

    const updateSentQuestions = (dados : any) => {
        if (Array.isArray(dados))
            setSentQuestions([...dados, ...sentQuestions] as any);
        else
            setSentQuestions([dados, ...sentQuestions] as any);
    };

    const updateAllSentQuestions = (dados : any) => {
        if (Array.isArray(dados))
            setSentQuestions([...dados] as any);
        else
            setSentQuestions([dados] as any);
    };

    const curiousPerfil = async data => {
        return new Promise(resolve => {
            QuestionsService.getList({username: data.perfil}).then((profile) => {
                setPerfil(profile)
                resolve({sucess: true})
            }).catch((errors) => {
                setPerfil(null)
                resolve({sucess: false})
            });
        });
    };

    const sendQuestion = async data => {
        return new Promise(resolve => {
            QuestionsService.setQuestion({to: perfil?.username, anon: true, question: data.question}).then(({dados, status}) => {
                updateSentQuestions({
                    success: dados.success || false,
                    dados: dados,
                    perfil: perfil,
                    envio_pergunta: {to: perfil?.username, anon: true, question: data.question}
                })
                resolve(true)
            }).catch((errors) => {
                console.log(errors);
                resolve({success: true});
            });
        });
    };

    const reSendQuestion = async (data : any, key : any) => {
        return new Promise(async resolve => {
            let {dados, status} : {dados : any, status : any} = await QuestionsService.setQuestion(data.envio_pergunta);

            sentQuestions[key]['success'] = dados.success || false;
            sentQuestions[key].dados = dados;

            updateAllSentQuestions(sentQuestions);
            resolve({success: true});
        });
    };

    const sendGroupQuestions = async (data : GroupQuestion, index : number) => {
        return new Promise(resolve => {
            let groupOfQuestions = separar(data.questions, 10);
            let sentLocalQuestions = [];

            groupOfQuestions.forEach((questions, indexQuetions) => {
                setTimeout(() => {
                    questions.forEach((item : any, indexLista) => {
                        QuestionsService.setQuestion({to: perfil?.username, anon: true, question: item.question, authorization_boolean: (indexQuetions <= 1)})
                            .then((resultado : {dados: any, status: any}) => {
                                sentLocalQuestions = [{
                                    success: resultado?.dados?.success || false,
                                    dados: resultado.dados,
                                    perfil: perfil,
                                    envio_pergunta: {to: perfil?.username, anon: true, question: item.question}
                                }, ...sentLocalQuestions];

                                updateSentQuestions(sentLocalQuestions);
                            }).catch((error) => {
                            console.log(error);
                        });
                    });

                    setTimeout(() => {
                        if (groupOfQuestions.length === (indexQuetions+1)) {
                            resolve({success: true});
                        }
                    }, 2000);
                }, (32500*(indexQuetions) + (indexQuetions === 0 ? 0 : 30000)));
            });
        });
    };

    const sendFakeGroupQuestions = async (data : GroupQuestion, index : number) => {
        return new Promise((resolve : any) => {
            let groupOfQuestions = separar(data.questions, 10);
            let sentLocalQuestions = [];

            groupOfQuestions.forEach((questions, indexQuetions) => {
                setTimeout(() => {
                    questions.forEach((item : any, indexLista) => {
                        sentLocalQuestions = [{
                            success: true,
                            dados: {success: true},
                            perfil: perfil,
                            envio_pergunta: {to: perfil?.username, anon: true, question: item.question}
                        }, ...sentLocalQuestions] as any;

                        updateSentQuestions(sentLocalQuestions);
                    });

                    if (groupOfQuestions.length === (indexQuetions+1)) {
                        resolve({success: true});
                    }
                }, 1000);
            });
        });
    };

    const verErro = async data => {
        return new Promise(resolve => {
            console.log(data);
        });
    };

    const validarInputPerfil = () => {

    };


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Curious Niko - Curioso</title>
                <link rel="curious-niko" href="http://curious-niko.com/curioso" />
            </Helmet>
            <Menu />
            <Titulo tipo="subtitulo">Selecionar Perfil</Titulo>
            <div className="formulario formulario_perfil">
                <form onSubmit={pesquisaPerfil.handleSubmit(curiousPerfil)}>
                    <input type="text" placeholder="Pesquisar Perfil" name="perfil" className={perfil === null ? 'form-input-text' : (perfil?.username ? 'form-input-text validado' : 'form-input-text invalido')} ref={pesquisaPerfil.register}/>
                    <Button type="button" classNames="form-submit" usesForm={pesquisaPerfil} onClick={pesquisaPerfil.handleSubmit(curiousPerfil)} esconder={true}><FaIcons.FaArrowLeft/></Button>
                </form>
            </div>
            <div className={perfil === null ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Faça Perguntas</Titulo>
                <div className="formulario formulario_questoes">
                    <form onSubmit={questoesForm.handleSubmit(sendQuestion)}>
                        <textarea name="question" className="form-textarea" placeholder="Mande uma pergunta para a pessoa" ref={questoesForm.register}></textarea>
                        <Button type="button" classNames="form-submit-1" onClick={questoesForm.handleSubmit(sendQuestion)} esconder={true}><FaIcons.FaArrowLeft /></Button>
                    </form>
                </div>
            </div>
            <div className={perfil === null ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Grupo de Perguntas</Titulo>
                <nav className="nav-lista-perguntas-processadas">
                    <ul className="lista-perguntas-processadas">
                        {groupQuestions.map((item : any, index: number) => {
                            return (
                                <li key={index} className="elemento-pergunta-processadas">
                                    <div className="processado-1">
                                        <p><b>Grupo Nome:</b> {item.group_name}</p>
                                    </div>
                                    <div className="processado-2">
                                        <Button type="button" onClick={() => sendGroupQuestions(item, index)} classNames="form-submit-2" esconder={false}>Enviar Perguntas</Button>
                                        <Button type="button" onClick={() => sendFakeGroupQuestions(item, index)} classNames="form-submit-2" esconder={false}>Enviar Fake Perguntas</Button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className={sentQuestions.length === 0 ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Perguntas Processadas {'(Numero: '+sentQuestions.length+')'}</Titulo>
                <nav className="nav-lista-perguntas-processadas">
                    <ul className="lista-perguntas-processadas">
                        {sentQuestions.map((item : any, index) => {
                            return (
                                <li key={index} className={item.success ? 'elemento-pergunta-processadas' : 'elemento-pergunta-processadas falha'}>
                                    <div className="processado-1">
                                        <p><b>Pergunta:</b> {item.envio_pergunta.question}</p>
                                        <p><b>Para:</b> {item.perfil.username}</p>
                                    </div>
                                    <div className="processado-2">
                                        <p className="status_envio">{item.success ? 'Enviado com Sucesso' : 'Problema ao enviar'}</p>
                                        {!item.success ? <Button type="button" onClick={() => verErro(item.dados)} esconder={false}>Ver o Erro</Button> : ''}
                                        {!item.success ? <Button type="button" onClick={() => reSendQuestion(item, index)} esconder={false}>Reenviar</Button> : ''}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Curioso;
