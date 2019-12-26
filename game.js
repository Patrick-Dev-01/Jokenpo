                                //VARIAVEIS GLOBAIS     
// array do jogador
var jogador = [];
// array do computador
var computador = [];
//Array de audio
var audio = [];
//tempo que jogador terá para escolher a jogada
var tempo;
//Pontos necessario para ganhar, tanto do jogador, quanto do computador
var ptsJogador = 0;
var ptsComputador = 0;
//escolha do jogador
var jogadorEscolha;
//escolha do computador
var computadorEscolha;
//minimo de pontos para vencer
var minPontos;
//minimo de rodadas para ganhar
var max_Rodadas;
//rodada que esta acontecendo as jogadas
var rodadaAtual = 1; 
// numero de rodadas vencidas do computador e jogador
var rodadas_Jogador = 0;
var rodadas_Computador = 0;
//mostrar no placar a pontuação do computador
var pontosJogador;
//mostrar no Placar a pontuação do computador
var pontosComputador;
// modo escolhido pelo jogador
var classico = false;
var customizado = false;
// botão do menu
var btnMenu;

//função que define a pontuação e o numero de rodadas necessarias para vencer, escolhida pelo Jogador
function partida(p, r){
    //se o numero de pontos for 3 e o numero de rodadas não for definido ou for igual a 1
    if(p == 3 && r == undefined || r == 1){
        var rodadas = [];
        // esconda os numeros de rodadas vencidas ja que no modo classico é rodada unica
        rodadas[0] = document.getElementById("rodada-J").style.display = "none";
        rodadas[1] = document.getElementById("rodada-C").style.display = "none";
        // o jogador escolheu o modo classico
        classico = true;
        // desativar a opção de voltar ao menu enquanto o modo classico não termina
        btnMenu = document.getElementById("btn-menu");
        btnMenu.disabled = true;
        btnMenu.style.opacity = "0.5";
        // o numero de pontos para vencer é 3
        minPontos = p;
        // e rodada unica
        max_Rodadas = r;
    }
    //se o numero de pontos for diferente de 3 e o numero de rodas for diferente de 1
    else{
        //modo personalizado verdairo
        customizado = true;
        //pegar o valor de pontos escolhido pelo jogador
        var customPontos = document.getElementById("pontos");
        //pegar o numero de rodadas escolhida pelo jogador
        var customRodadas = document.getElementById("rodadas");
        //converter - los em um numero inteiro
        max_P = Number(customPontos.value);
        max_R = Number(customRodadas.value);
        // definir o valor minimo de pontos para vencer a rodada na variavel "minPontos"
        minPontos = max_P;
        // definir o numero de rodadas
        max_Rodadas = max_R;
    }
    //inicie o jogo
    iniciar();
}

//função que inicia o jogo
function iniciar(){    
    //menu principal
    var menu = document.querySelector("div.menu");
    //quando o jogo iniciar o menu some
    menu.style.display = "none";
    //inicio do jogo
    var jogoInicia = document.querySelector("div.jogo");
    // e tela do jogo aparece
    jogoInicia.style.display = "block";
    document.querySelector("body").style.backgroundColor = "white";
    //pontos que será mostrado no placar
    pontosJogador = document.getElementById("ptJ");
    pontosComputador = document.getElementById("ptC");

    //pegar todas as imagens da escolha do Jogador
    jogador[1] = document.getElementById('pedra-j');
    jogador[2] = document.getElementById('papel-j');
    jogador[3] = document.getElementById('tesoura-j');
    //pegar todas as imagens da escolha do Computador
    computador[1] = document.getElementById('pedra-c');
    computador[2] = document.getElementById('papel-c');
    computador[3] = document.getElementById('tesoura-c');
    
    //musica de fundo
    audio[0] = document.getElementById("audio1");
    audio[0].play();

    //Tempo que o jogador tem para escolher Pedra, Papel ou Tesoura
    tempo = setTimeout(jogada, 10000); // 10 segundos
    //se o Jogador nao escolheu dentro desse tempo
    if(tempo == 0){
        jogada();
    }
}

//função que reseta os valores, quando uma nova Jogada é iniciada
function novaJogada(){
    jogador[1].classList.remove("esconder");
    jogador[2].classList.remove("esconder");
    jogador[3].classList.remove("esconder");
    //mostre o hud do Jogador
    jogador[1].classList.add("jogador");
    jogador[2].classList.add("jogador");
    jogador[3].classList.add("jogador");

    computador[1].classList.remove("esconder");
    computador[2].classList.remove("esconder");
    computador[3].classList.remove("esconder");
    //mostre o Hud do computador
    computador[1].classList.add("computador");
    computador[2].classList.add("computador"); 
    computador[3].classList.add("computador");
    //apos resetar os valores, inicie novamnete
    iniciar();
}

//função que recebera a jogada do jogador
function jogada(e){
    //armazenar a escolha do jogador na varivel
    jogadorEscolha = e;
    // se jogador não escolheu dentro do tempo de 10 segundos, então a jogada será sorteada
    if(e == undefined){
        jogadorEscolha = Math.floor(Math.random() * 3 + 1);
    }
    //Pare o primeiro audio
    audio[0].pause();
    //reset para zero
    audio[0].currentTime = 0;
    //toque a musica do jogo
    audio[1] = document.getElementById("audio2");
    audio[1].play();
    audio[1].onended = function(){
        //chamar a função que irá verificar quem somou ponto ou se houve Empate
        jokenpo(jogadorEscolha);
    }
}

//função responsivel pela lógica do jogo
function jokenpo(jogadorEscolha){
    //tempo para iniciar uma nova jogada
    var timer;
    //Faz o computador escolher aleatoriamente, um numero entre 1 e 3
    computadorEscolha = Math.floor(Math.random() * 3 + 1);

    // 1 = Pedra
    // 2 = Papel
    // 3 = Tesoura

    // se o jogador escolheu Pedra
    if(jogadorEscolha == 1){      
        //Caso a escolha da jogada anterior foi papel ou tesoura, ele removerá o destaque
        jogador[2].classList.add("esconder");
        jogador[3].classList.add("esconder");
        //Destacar a escolha do jogador
        jogador[1].classList.remove("jogador");
        jogador[1].classList.add("escolhaJogador");
        
        // e se o computador escolheu Tesoura
        if(computadorEscolha == 3){
            // o jogador soma 1 Ponto
            pontosJogador.innerHTML ++;
            ptsJogador ++;
            //Destacar a escolha do computador
            computador[3].classList.remove("computador");
            computador[3].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou papel, ele removerá o destaque
            computador[1].classList.add("esconder");
            computador[2].classList.add("esconder");
        }

        // E se o computador escolheu Papel
        else if (computadorEscolha == 2){
            //o computador soma 1 ponto
            pontosComputador.innerHTML ++;
            ptsComputador ++;
            //destacar escolha do computador
            computador[2].classList.remove("computador");
            computador[2].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou Tesoura, ele removerá o destaque
            computador[1].classList.add("esconder");
            computador[3].classList.add("esconder");
        }

        // se o Computador tambem escolheu Pedra
        else{
                    //EMPATE
            //destacar escolha do computador
            computador[1].classList.remove("computador");
            computador[1].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi papel ou tesoura, ele removerá o destaque
            computador[2].classList.add("esconder");
            computador[3].classList.add("esconder");
        }
        // Travar o tempo de escolha para não executar assincronamente
        clearTimeout(tempo);
        // apos 2 segundos do resultado da jogada, inicie uma nova rodada
        timer = setTimeout(verificaPontuacao, 2000);
    }

    //Se o Jogador escolheu Papel
    if(jogadorEscolha == 2){
        //Caso a escolha da jogada anterior foi Pedra ou tesoura, ele removerá o destaque
        jogador[1].classList.add("esconder");
        jogador[3].classList.add("esconder");
        //Destacar a escolha do jogador
        jogador[2].classList.remove("jogador");
        jogador[2].classList.add("escolhaJogador");

        // e se o Computador escolheu Pedra
        if(computadorEscolha == 1){
            // o jogador soma 1 Ponto
            pontosJogador.innerHTML ++;
            ptsJogador ++;
            //Destacar a escolha do computador
            computador[1].classList.remove("computador");
            computador[1].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi papel ou Tesoura, ele removerá o destaque
            computador[2].classList.add("esconder");
            computador[3].classList.add("esconder");
        }

        // e se o Computador escolheu Tesoura 
        else if(computadorEscolha == 3){
            //o computador soma 1 ponto
            pontosComputador.innerHTML ++;
            ptsComputador ++;
            //destacar escolha do computador
            computador[3].classList.remove("computador");
            computador[3].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou Papel, ele removerá o destaque
            computador[1].classList.add("esconder");
            computador[2].classList.add("esconder");
        }

        // se o Computador Tambem escolheu Papel
        else{
                    //EMPATE
            //destacar escolha do computador
            computador[2].classList.remove("computador");
            computador[2].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou tesoura, ele removerá o destaque
            computador[1].classList.add("esconder");
            computador[3].classList.add("esconder");
        }
        // Travar o tempo de escolha para não executar assincronamente
        clearTimeout(tempo);
        // apos 2 segundos do resultado da jogada, inicie uma nova rodada
        timer = setTimeout(verificaPontuacao, 2000);
    }

    // se o Jogador escolheu Tesoura
    if(jogadorEscolha == 3){
        //Caso a escolha da jogada anterior foi pedra ou papel, ele removerá o destaque
        jogador[1].classList.add("esconder");
        jogador[2].classList.add("esconder");
        //Destacar a escolha do jogador
        jogador[3].classList.remove("jogador");
        jogador[3].classList.add("escolhaJogador");

        // e se o Computador escolheu Papel
        if(computadorEscolha == 2){
            // o jogador soma 1 Ponto
            pontosJogador.innerHTML ++;
            ptsJogador ++;
            //Destacar a escolha do computador
            computador[2].classList.remove("computador");
            computador[2].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi papel ou Tesoura, ele removerá o destaque
            computador[1].classList.add("esconder");
            computador[3].classList.add("esconder");
        }
        // e se o Computador escolheu Pedra
        else if(computadorEscolha == 1){
            //o computador soma 1 ponto
            pontosComputador.innerHTML ++;
            ptsComputador ++;
            //destacar escolha do computador
            computador[1].classList.remove("computador");
            computador[1].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou Papel, ele removerá o destaque
            computador[2].classList.add("esconder");
            computador[3].classList.add("esconder");
        }

        // se o computador tabem escolheu Tesoura
        else{
               //EMPATE
            //destacar escolha do computador
            computador[3].classList.remove("computador");
            computador[3].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou tesoura, ele removerá o destaque
            computador[1].classList.add("esconder");
            computador[2].classList.add("esconder");
        }
        // Travar o tempo de escolha para não executar assincronamente
        clearTimeout(tempo);
        // apos 2 segundos do resultado da jogada, inicie uma nova rodada
        timer = setTimeout(verificaPontuacao, 2000);
    }
}

// função que verifica a pontuação e reinicia as jogadas
function verificaPontuacao(){
    //elemento que mostrará o vencedor da partida
    var vencedor = document.getElementById("vencedor");
    //se o jogador estiver jogando o modo classico
    if(classico == true){
        // e atingiu a pontuação minima definida, o jogo acaba e o jogador vence 
        if(ptsJogador == minPontos){
            // se foi uma vitoria de 3 x 0
            if(ptsComputador == 0){
                // audio de vitória
                audio[6] = document.getElementById("audio6");
                audio[6].play();
                //quando o audio de vitória terminar
                audio[6].onended = function(){
                    //audio de vitória perfeita
                    audio[4] = document.getElementById("audio4");
                    audio[4].play();
                }
                vencedor.innerHTML = "Vitória Perfeita do Jogador!";
            }
            // se não
            else{
                audio[6] = document.getElementById("audio6");
                audio[6].play();
                vencedor.innerHTML = "O Jogador venceu!";
            }                 
            // quando acabar o jogo ele pode voltar ao menu
            btnMenu.disabled = false;
            btnMenu.style.opacity = "1";
        }
        // se o computador atingiu a pontuação minima, ele vence
        else if(ptsComputador == minPontos){
            //audio de perdedor
            audio[5] = document.getElementById("audio5");
            audio[5].play();
            vencedor.innerHTML = "O Computador venceu!";
            // quando acabar o jogo ele pode voltar ao menu
            btnMenu.disabled = false;
            btnMenu.style.opacity = "1";
        }
        //se ainda ninguem atingiu a pontuação minima inicie uma nova jogada
        else{
            novaJogada();
        }
    }
    //se o jogador estiver jogando o modo customizado
    else if(customizado == true){
        // mostrar no placar as rodadas vencidas por cada um
        var rodadas_J = document.getElementById("rodada-J");
        var rodadas_C = document.getElementById("rodada-C");
        //verificar se a rodada atual é menor que o numero de rodadas escolhido 
        if(rodadaAtual < max_Rodadas){
            //se jogador fez a quantidade de pontos para vencer a rodada
            if(ptsJogador == minPontos){
                //proxima rodada
                rodadaAtual ++;
                //mostrar os pontos de rodadas vencida no placar do Jogador
                rodadas_J.innerHTML ++;
                //somar 1 ponto de rodadas vencida
                rodadas_Jogador ++;
                //zerar o placar para a nova rodada
                pontosJogador.innerHTML = "0";
                pontosComputador.innerHTML = "0";
                //zerar a pontuação do jogador
                ptsJogador = 0;
                //zerar pontuação do computador
                ptsComputador = 0;
            }
            //se o computador fez a quantidade de pontos para vencer a rodada
            else if(ptsComputador == minPontos){
                //proxima rodada
                rodadaAtual ++;
                //mostrar os pontos de rodadas vencida no placar do Computador
                rodadas_C.innerHTML ++;
                //somar 1 ponto de rodadas vencida
                rodadas_Computador ++;
                 //zerar o placar para a nova rodada
                pontosComputador.innerHTML = "0";
                pontosJogador.innerHTML = "0";
                //zerar a pontuação do jogador
                ptsJogador = 0;
                //zerar pontuação do computador
                ptsComputador = 0;
            }
            novaJogada();
        }
        //se for a ultima rodada
        else if(rodadaAtual == max_Rodadas){
            /* e nenhum dos dois pontuarem OU o jogador e o computador ainda não fizeram a quantidade minima de pontos
            para vencer a rodada */
            if((jogadorEscolha == computadorEscolha) || (ptsJogador < minPontos && ptsComputador < minPontos)){
                novaJogada();
            }
            //verificar o resultado final após o jogador vencer a ultima rodada
            else if(ptsJogador == minPontos){
                //somar 1 ponto de rodada vencida no placar
                rodadas_J.innerHTML ++;
                //somar 1 ponto de rodada vencida na variavel de pontos do jogador
                rodadas_Jogador ++;
                //zerar o placar para a nova rodada
                pontosJogador.innerHTML = "0";
                pontosComputador.innerHTML = "0";
                // se o jogador venceu mais rodadas que o computador
                if(rodadas_Jogador > rodadas_Computador){
                    vencedor.innerHTML = "O Jogador venceu!";
                    //vitória perfeita do jogador sem perder nenhuma rodada
                    if(rodadas_Computador == 0){
                        // audio de vitória
                        audio[6] = document.getElementById("audio6");
                        audio[6].play();
                        audio[6].onended = function(){
                        //audio de vitória perfeita
                        audio[4] = document.getElementById("audio4");
                        audio[4].play();
                    }
                    vencedor.innerHTML = "Vitória Perfeita do Jogador!";
                    }
                }
                // se o computador venceu mais rodadas que o jogador
                else if(rodadas_Computador > rodadas_Jogador){
                    vencedor.innerHTML = "O Computador venceu!";
                    //audio de derrota
                    audio[5] = document.getElementById("audio5");
                    audio[5].play();
                }
                // Empate
                else if(rodadas_Jogador == rodadas_Computador){
                    vencedor.innerHTML = "Empatou";
                }
            }
            //verificar o resultado final após o Computador vencer a ultima rodada
            else if(ptsComputador == minPontos){
                //somar 1 ponto de rodadas vencida
                rodadas_C.innerHTML ++;
                rodadas_Computador ++;
                //zerar o placar para a nova rodada
                pontosJogador.innerHTML = "0";
                pontosComputador.innerHTML = "0";
                // se o jogador venceu mais rodadas que o computador
                if(rodadas_Jogador > rodadas_Computador){
                    //vitória perfeita do jogador sem perder nenhuma rodada
                    if(rodadas_Computador == 0){
                       // audio de vitória
                       audio[6] = document.getElementById("audio6");
                       audio[6].play();
                       //quando o audio de vitória terminar
                       audio[6].onended = function(){
                           //audio de vitória perfeita
                           audio[4] = document.getElementById("audio4");
                           audio[4].play();
                        }
                        vencedor.innerHTML = "Vitória Perfeita do Jogador!";
                    }
                    // se não
                    else{
                        vencedor.innerHTML = "O Jogador venceu!";
                        // audio de vitória
                        audio[6] = document.getElementById("audio6");
                        audio[6].play();
                    }
                }
                // se o computador venceu mais rodadas que o Jogador
                else if(rodadas_Computador > rodadas_Jogador){
                    vencedor.innerHTML = "O Computador venceu!";
                    //audio de derrota
                    audio[5] = document.getElementById("audio5");
                    audio[5].play();
                }
                // Empate
                else if(rodadas_Jogador == rodadas_Computador){
                    vencedor.innerHTML = "Empatou";
                }
            }
        }
    }
}



