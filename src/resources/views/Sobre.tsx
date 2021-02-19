import React from 'react';
import '../../App.scss';
import {Helmet} from 'react-helmet';
import Titulo from '../components/Titulo/Titulo';
import Descricao from '../components/Descricao/Descricao';
import Menu from '../components/Menu/Menu';

function Sobre() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Curious Niko - Sobre</title>
                <link rel="curious-niko" href="http://curious-niko.com/sobre" />
            </Helmet>
            <Menu />
            <div>
                <Titulo tipo="classico">Sobre</Titulo>
                <Descricao>
                    <p>O projeto Curious Niko tem como objetivo criar uma plataforma onde você consegue enviar uma ou mais perguntas, feitas a mão ou usando apis de apoio para criação de perguntas, para uma pessoa selecionada em alguma plataforma que disponibiliza enviar perguntas anônimas ou com autenticação.</p>

                    <p>Para esse projeto foi escolhido a plataforma Curious Cat, que infelizmente não disponibiliza documentação para a api, logo tivemos de descobrir na tentativa e erro as rotas e os parâmetros que poderíamos enviar.</p>

                    <p>Esse projeto foi criado devido aos pedidos de alguns amigos do desenvolvedor de quererem que ele mande perguntas para eles em suas plataformas de perguntas anônimas. Desse modo, com a ajuda desse sistema, o desenvolvedor poderá desfrutar do envio de várias perguntas a uma pessoa só sem ficar se preocupando em ter que enviar uma por uma, ou em alguns casos sem ter que se preocupar em qual pergunta está enviando (no caso das APIs).</p>

                    <p>No sistema teremos um processo de validação do interlocutor. Onde o sistema irá entrar na base de dados selecionada e irá verificar se o usuário realmente existe. Caso ele exista, o sistema irá prosseguir autorizando que algum tipo de pergunta seja criada.</p>

                    <Titulo tipo="titulo-ul">As perguntas poderão ser enviadas de 3 formas diferentes</Titulo>

                    <nav>
                        <ul>
                            <li><p>Perguntas Individuais</p></li>
                            <li><p>Grupo de Perguntas feitas manualmente ou pré-criadas pelo sistema</p></li>
                            <li><p>Grupos de Perguntas de APIs</p></li>
                        </ul>
                    </nav>

                    <p>As <b>perguntas individuais</b> são as mais simples e normalmente vão seguir o padrão de envio já existente no Curious Cat. Tendo a possibilidade de escolher se a pergunta é anônima ou não, e tendo um campo de texto para poder escrever a pergunta livremente.</p>

                    <p>O próximo meio envolve a criação de <b>Grupos de Perguntas</b>. Por padrão, o sistema já terá alguns exemplos de grupos de perguntas que poderão ser enviados. Mas caso o usuário queira eles podem criar um grupo próprio e redigir as próprias perguntas.</p>

                    <p>Essas perguntas só ficarão disponíveis enquanto o usuário estiver na página. Pois o objetivo do projeto é trabalhar apenas com front-end ou APIs prontas. Logo a possibilidade de armazenar grupos de perguntas não existe.</p>

                    <p>No caso de <b>perguntas automáticas</b> sendo enviadas de uma API. O projeto irá disponibilizar um filtro para poder escolher quais categorias de perguntas o usuário irá querer enviar, e qualquer outro tipo de informação que a API disponibiliza para poder gerar as perguntas.</p>

                    <p>Logo após preencher o filtro, o usuário só precisará apertar em um botão para que o sistema busque as perguntas e envie para o usuário solicitado.</p>

                    <p>A quantidade de perguntas enviadas em grupos é virtualmente ilimitada e cabe apenas ao usuário poder escolher quantas eles vão enviar.</p>

                    <p>Para que a pessoa saiba quais perguntas foram enviadas e o status do envio, o sistema irá disponibilizar essas informações visualmente mostrando o sucesso do envio para cada caso. Assim a pessoa poderá analisar caso a caso e saber se precisa reenviar alguma pergunta.</p>

                    <p>Futuramente, o sistema também terá uma funcionalidade em que reenvia todas as perguntas que resultaram em algum status de erro. O sistema Curious Cat tem a tendência a não aceitar muitos envios de uma vez. Logo em alguns casos isso poderá ser um problema, então nos casos de erro a pessoa simplesmente poderá reenviar tudo de uma vez.</p>

                    <p>Sendo assim, espero que aproveite o sistema e use conforme vocês queiram, ele provavelmente terá várias aplicações então aproveitem.</p>
                </Descricao>
            </div>
        </>
    );
}

export default Sobre;
