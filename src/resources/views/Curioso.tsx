import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import './Curioso.scss';
import Titulo from '../components/Titulo/Titulo';
import Menu from '../components/Menu/Menu';
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
    var [listaPerguntasEnviadas, setListaPerguntasEnviadas] = useState([]);
    var [grupoPerguntas, setGrupoPerguntas] = useState(pergutnasProgramadas);


    //const { register, handleSubmit, errors} = useForm();
    const pesquisaPerfil = useForm();
    const questoesForm = useForm();

    const atualizarListaPerguntasEnviadas = (dados : any) => {
        setListaPerguntasEnviadas([...dados, ...listaPerguntasEnviadas] as any);
    };

    const curiousPerfil = async data => {
        let {dados, status} = await QuestionsService.getList({username: data.perfil});

        if (typeof dados.id != 'undefined') {
            setPerfil(dados);
            setValidacaoPerfil(1);
        } else {
            setValidacaoPerfil(-1);
        }
    };

    const sendQuestion = async data => {
        let {dados, status} : {dados : any, status : any} = await QuestionsService.setQuestion({to: perfil.username, anon: true, question: data.questao});

        if (typeof dados.success != 'undefined' && dados.success) {
            atualizarListaPerguntasEnviadas({
                success: dados.success,
                dados: dados,
                perfil: perfil,
                envio_pergunta: {to: perfil.username, anon: true, question: data.questao}
            });
        } else {
            atualizarListaPerguntasEnviadas({
                success: false,
                dados: dados,
                perfil: perfil,
                envio_pergunta: {to: perfil.username, anon: true, question: data.questao}
            });
        }

        console.log(dados);
    };

    const sendGroupQuestions = async data => {
        let ListaPerguntas = separar(data.perguntas, 10);
        let listaPerguntasEnviadasLocais = listaPerguntasEnviadas;

        ListaPerguntas.forEach((listaPergunta, indexListaPergunta) => {
            setTimeout(() => {
                listaPergunta.forEach((item : any, index) => {
                    QuestionsService.setQuestion({to: perfil.username, anon: true, question: item.questao})
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
            }, (32500*(indexListaPergunta) + (indexListaPergunta === 0 ? 0 : 30000)));
        });
    };

    const sendFakeGroupQuestions = async data => {
        let ListaPerguntas = separar(data.perguntas, 10);
        let listaPerguntasEnviadasLocais = listaPerguntasEnviadas;

        ListaPerguntas.forEach((listaPergunta, indexListaPergunta) => {
            setTimeout(() => {
                listaPergunta.forEach((item : any, index) => {
                    listaPerguntasEnviadasLocais = [{
                        success: true,
                        dados: {success: true},
                        perfil: perfil,
                        envio_pergunta: {to: perfil.username, anon: true, question: item.questao}
                    }, ...listaPerguntasEnviadasLocais] as any;

                    atualizarListaPerguntasEnviadas(listaPerguntasEnviadasLocais);
                });

                console.log('pasei por aqui fora');
            }, 1000);
        });
    };

    const verErro = async data => {
        console.log(data);
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
                    <button type="submit" className="form-submit" onSubmit={pesquisaPerfil.handleSubmit(curiousPerfil)}><FaIcons.FaArrowLeft /></button>
                </form>
            </div>
            <div className={validacaoPerfil != 1 ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Faça Perguntas</Titulo>
                <div className="formulario formulario_questoes">
                    <form onSubmit={questoesForm.handleSubmit(sendQuestion)}>
                        <textarea name="questao" className="form-textarea" placeholder="Mande uma pergunta para a pessoa" ref={questoesForm.register}></textarea>
                        <button type="submit" className="form-submit-1" onSubmit={questoesForm.handleSubmit(sendQuestion)}><FaIcons.FaArrowLeft /></button>
                    </form>
                </div>
            </div>
            <div className={validacaoPerfil != 1 ? 'esconder' : ''}>
                <Titulo tipo="subtitulo">Grupo de Perguntas</Titulo>
                <nav className="nav-lista-perguntas-processadas">
                    <ul className="lista-perguntas-processadas">
                        {grupoPerguntas.map((item : any, index) => {
                            return (
                                <li key={index} className="elemento-pergunta-processadas">
                                    <div className="processado-1">
                                        <p><b>Grupo Nome:</b> {item.nome_grupo}</p>
                                    </div>
                                    <div className="processado-2">
                                        <button type="button" onClick={() => sendGroupQuestions(item)}>Enviar Perguntas</button>
                                        <button type="button" onClick={() => sendFakeGroupQuestions(item)}>Enviar Fake Perguntas</button>
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
                                        {!item.success ? <button type="button" onClick={() => verErro(item.dados)}>Ver o Erro</button> : ''}
                                        {!item.success ? <button type="button">Reenviar</button> : ''}
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
