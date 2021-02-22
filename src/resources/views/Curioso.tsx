import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import './Curioso.scss';
import Titulo from '../components/Titulo/Titulo';
import Menu from '../components/Menu/Menu';
import Button from '../components/Formulario/Button';
import QuestionsService from '../../api/curiouscat/v2/QuestionsService'
import {useForm} from 'react-hook-form';
import * as FaIcons from "react-icons/fa";
import pergutnasProgramadas from './PerguntasProgramadas';

function separar(base : any, max : number) {
    let res : any = [];

    for (let i : number = 0; i < base.length; i = i+(max-1)) {
        res.push(base.slice(i,(i+max)));
    }
    res[res.length-1].push(base[0]);
    return res;
}

function Curioso() {
    var [perfil, setPerfil] = useState({username: ''});
    var [validacaoPerfil, setValidacaoPerfil] = useState(0);
    var [listaPerguntasEnviadas, setListaPerguntasEnviadas] : Array<any>= useState([]);
    var [grupoPerguntas, setGrupoPerguntas] = useState(pergutnasProgramadas);

    const pesquisaPerfil = useForm();
    const questoesForm = useForm();

    const atualizarListaPerguntasEnviadas = (dados : any) => {
        if (Array.isArray(dados))
            setListaPerguntasEnviadas([...dados, ...listaPerguntasEnviadas] as any);
        else
            setListaPerguntasEnviadas([dados, ...listaPerguntasEnviadas] as any);
    };

    const atualizarListaPerguntasCompleta = (dados : any) => {
        if (Array.isArray(dados))
            setListaPerguntasEnviadas([...dados] as any);
        else
            setListaPerguntasEnviadas([dados] as any);
    };

    const curiousPerfil = async data => {
        return new Promise(resolve => {
            consoe.log(process.env);
            QuestionsService.getList({username: data.perfil}).then(({dados, status}) => {
                if (typeof dados.id != 'undefined') {
                    setPerfil(dados);
                    setValidacaoPerfil(1);
                    resolve({sucess: true});
                } else {
                    setValidacaoPerfil(-1);
                    resolve({sucess: true});
                }
            }).catch((errors) => {
                console.log(errors);
                resolve({sucess: true});
            });
        });
    };

    const sendQuestion = async data => {
        return new Promise(resolve => {
            QuestionsService.setQuestion({to: perfil.username, anon: true, question: data.questao}).then(({dados, status}) => {
                if (typeof dados.success != 'undefined' && dados.success) {
                    atualizarListaPerguntasEnviadas({
                        success: dados.success,
                        dados: dados,
                        perfil: perfil,
                        envio_pergunta: {to: perfil.username, anon: true, question: data.questao}
                    });
                    resolve({success: true});
                } else {
                    atualizarListaPerguntasEnviadas({
                        success: false,
                        dados: dados,
                        perfil: perfil,
                        envio_pergunta: {to: perfil.username, anon: true, question: data.questao}
                    });
                    resolve({success: true});
                }
            }).catch((errors) => {
                console.log(errors);
                resolve({success: true});
            });
        });
    };

    const reSendQuestion = async (data : any, key : any) => {
        return new Promise(async resolve => {
            let {dados, status} : {dados : any, status : any} = await QuestionsService.setQuestion(data.envio_pergunta);

            if (typeof dados.success != 'undefined' && dados.success) {
                listaPerguntasEnviadas[key]['success'] = dados.success as any ;
                listaPerguntasEnviadas[key].dados = dados as any ;

                atualizarListaPerguntasCompleta(listaPerguntasEnviadas);
                resolve({success: true});
            } else {
                listaPerguntasEnviadas[key].success = false as boolean;
                listaPerguntasEnviadas[key].dados = dados as any;

                atualizarListaPerguntasCompleta(listaPerguntasEnviadas);
                resolve({success: true});
            }
        });
    };

    const sendGroupQuestions = async (data : any, index : any) => {
        return new Promise(resolve => {
            let ListaPerguntas = separar(data.perguntas, 10);
            let listaPerguntasEnviadasLocais = [];

            ListaPerguntas.forEach((listaPergunta, indexListaPergunta) => {
                setTimeout(() => {
                    listaPergunta.forEach((item : any, indexLista) => {
                        QuestionsService.setQuestion({to: perfil.username, anon: true, question: item.questao, authorization_boolean: (indexListaPergunta <= 1)})
                            .then((resultado : {dados: any, status: any}) => {
                                if (typeof resultado.dados.success != 'undefined' && resultado.dados.success) {
                                    listaPerguntasEnviadasLocais = [{
                                        success: resultado.dados.success,
                                        dados: resultado.dados,
                                        perfil: perfil,
                                        envio_pergunta: {to: perfil.username, anon: true, question: item.questao}
                                    }, ...listaPerguntasEnviadasLocais] as any;
                                } else {
                                    listaPerguntasEnviadasLocais = [{
                                        success: false,
                                        dados: resultado.dados,
                                        perfil: perfil,
                                        envio_pergunta: {to: perfil.username, anon: true, question: item.questao}
                                    }, ...listaPerguntasEnviadasLocais] as any;
                                }

                                atualizarListaPerguntasEnviadas(listaPerguntasEnviadasLocais);
                            }).catch((error) => {
                            console.log(error);
                        });
                    });

                    setTimeout(() => {
                        if (ListaPerguntas.length === (indexListaPergunta+1)) {
                            resolve({success: true});
                        }
                    }, 2000);
                }, (32500*(indexListaPergunta) + (indexListaPergunta === 0 ? 0 : 30000)));
            });
        });
    };

    const sendFakeGroupQuestions = async (data : any, index : any) => {
        return new Promise((resolve : any) => {
            let ListaPerguntas = separar(data.perguntas, 10);
            let listaPerguntasEnviadasLocais = [];

            ListaPerguntas.forEach((listaPergunta, indexListaPergunta) => {
                setTimeout(() => {
                    listaPergunta.forEach((item : any, indexLista) => {
                        listaPerguntasEnviadasLocais = [{
                            success: true,
                            dados: {success: true},
                            perfil: perfil,
                            envio_pergunta: {to: perfil.username, anon: true, question: item.questao}
                        }, ...listaPerguntasEnviadasLocais] as any;

                        atualizarListaPerguntasEnviadas(listaPerguntasEnviadasLocais);
                    });

                    if (ListaPerguntas.length === (indexListaPergunta+1)) {
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
                    <input type="text" placeholder="Pesquisar Perfil" name="perfil" className={validacaoPerfil === 0 ? 'form-input-text' : (validacaoPerfil === 1 ? 'form-input-text validado' : 'form-input-text invalido')} ref={pesquisaPerfil.register}/>
                    <Button type="button" classNames="form-submit" usesForm={pesquisaPerfil} onClick={pesquisaPerfil.handleSubmit(curiousPerfil)} esconder={true}><FaIcons.FaArrowLeft/></Button>
                </form>
            </div>
            <div className={validacaoPerfil != 1 ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Faça Perguntas</Titulo>
                <div className="formulario formulario_questoes">
                    <form onSubmit={questoesForm.handleSubmit(sendQuestion)}>
                        <textarea name="questao" className="form-textarea" placeholder="Mande uma pergunta para a pessoa" ref={questoesForm.register}></textarea>
                        <Button type="button" classNames="form-submit-1" onClick={questoesForm.handleSubmit(sendQuestion)} esconder={true}><FaIcons.FaArrowLeft /></Button>
                    </form>
                </div>
            </div>
            <div className={validacaoPerfil != 1 ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Grupo de Perguntas</Titulo>
                <nav className="nav-lista-perguntas-processadas">
                    <ul className="lista-perguntas-processadas">
                        {grupoPerguntas.map((item : any, index: number) => {
                            return (
                                <li key={index} className="elemento-pergunta-processadas">
                                    <div className="processado-1">
                                        <p><b>Grupo Nome:</b> {item.nome_grupo}</p>
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
            <div className={listaPerguntasEnviadas.length === 0 ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Perguntas Processadas {'(Numero: '+listaPerguntasEnviadas.length+')'}</Titulo>
                <nav className="nav-lista-perguntas-processadas">
                    <ul className="lista-perguntas-processadas">
                        {listaPerguntasEnviadas.map((item : any, index) => {
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
