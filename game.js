                                //VARIAVEIS GLOBAIS     
// array do jogador
var jogador = [];
// array do computador
var computador = [];
//Array de audio
var audio = [];
//tempo que jogador terá para escolher a jogada
var tempo;
//escolha do jogador
var jogadorEscolha;
//escolha do computador
var computadorEscolha;
//Pontos necessario para ganhar, tanto do jogador, quanto do computador
var ptsJogador = 0;
var ptsComputador = 0;
// numero de rodadas vencidas do computador e jogador
var rodadas_Jogador = 0;
var rodadas_Computador = 0;
// numeros s que aparecerão no placar
var rodadas_J;
var rodadas_C;
//mostrar no placar a pontuação do computador
var pontosJogador;
//mostrar no Placar a pontuação do computador
var pontosComputador;
//minimo de pontos para vencer
var minPontos;
//quantidade de rodadas
var max_Rodadas;
//rodada que esta acontecendo as jogadas
var rodadaAtual = 1; 
// variaveis para calcular a diferença de pontos, caso seja uma diferença grande, a vitória é antecipada
var diferenca_jogador;
var diferenca_computador;
// modo escolhido pelo jogador
var classico = false;
var customizado = false;
var torneio = false;
// tela de inicio do jogo
var jogoInicia;
// botão do menu
var btnMenu;
var vencedor;
// janela modal do modo torneio
var modal;

//função que define a pontuação e o numero de rodadas necessarias para vencer, escolhida pelo Jogador
function partida(p, r){
    //menu principal
    var menu = document.querySelector("div.menu");
    //quando o jogo iniciar o menu some
    menu.style.display = "none";
    //tela de gameplay
    jogoInicia = document.querySelector("div.jogo");
    //pontos que será mostrado no placar
    pontosJogador = document.getElementById("ptJ");
    pontosComputador = document.getElementById("ptC");
    //se jogador escolheu o modo torneio o jogo se inicia diferente com uma janela modal
    if(p == 2){
        torneio = true;
        document.querySelector("body").style.backgroundColor = "rgb(64, 65, 66)";
        //pegar a janela modal
        modal = document.getElementById("torneio");
        //quando o jogador escolher o modo torneio, abrir janela modal
        modal.style.display = 'block';
        audio[3] = document.getElementById("audio3");
        audio[3].play();
        audio[3].setAttribute('loop', 'loop');
    }
    // se não, ele escolheu modo classico ou o modo personalizado
    else{
        // e tela do jogo aparece
        jogoInicia.style.display = "block";
        document.querySelector("body").style.backgroundColor = "rgb(64, 65, 66)";
        if((p == 3) && (r == undefined || r == 1)){
            // o jogador escolheu o modo classico
            classico = true;
            var rodadas = [];
            // esconda os numeros de rodadas vencidas ja que no modo classico é rodada unica
            rodadas[0] = document.getElementById("rodadas-J").style.display = "none";
            rodadas[1] = document.getElementById("rodadas-C").style.display = "none";
            // desativar a opção de voltar ao menu enquanto o modo classico não termina
            btnMenu = document.getElementById("btn-menu");
            btnMenu.disabled = true;
            btnMenu.style.opacity = "0.5";
            // o numero de pontos para vencer é 3
            minPontos = p;
            // e rodada unica
            max_Rodadas = r;     
        }
        //se o numero de pontos for diferente de 3 e o numero de rodadas for diferente de 1
        else{
            document.querySelector("body").style.backgroundColor = "rgb(64, 65, 66)";
            //modo personalizado verdadeiro
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
        // apos escolher o modo inicie
    iniciar();
    }
}

//função que inicia a Jogada
function iniciar(){    
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
}

//função que reseta os valores, antes de iniciar uma nova Jogada
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
    vencedor = document.getElementById("vencedor");
    //se o jogador estiver jogando o modo classico
    if(classico == true){
        modoClassico();
    }
    //se o jogador estiver jogando o modo customizado
    else if(customizado == true){
        modoPersonalizado();
    }

    else if(torneio == true){
        modoTorneio();
    }
}

// modo Classico
function modoClassico(){
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
               audio[4].play();}
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

// adversário definido
var adversario;
//qual batalha o jogador esta
var batalha = 0;
// Array de Oponentes
var Oponentes = ['Mike', 'Derrick', 'James', 'Mary', 'Maria', 'Ryan', 'Jessica', 'Sam', "Josh", 'Chris', 'Ashley'
, 'Jade', 'Katie', 'Rebeca', 'Daniel', 'Alex', 'Matt', 'Emily', 'Jimmy', 'Gary', 'Beatriz', 'Zoe', 'Pedro', 'Angel',
'Edge', 'Christie', 'Eddy', 'Bob', 'Claire', 'Emma', 'Wener', 'Kane', 'Jay', 'Damon', 'Junior', 'Frank', 'Robert',
'Vanessa', 'Scarlett', 'Nicole', 'Nick'];
//array de cores do hud do oponente
var hudOponente = ['green', 'blue', 'pink', 'purple', 'gray', 'red', 'darkyellow', 'black', "darkblue", 'darkgreen'
, 'orange', 'yellow', 'darkred', 'darkgray', 'brown', 'midnightblue', 'violet', 'yellowgreen', 'burlywood', 'darkcyan'
, 'indigo', 'olive', 'seagreen'];

// MODO TORNEIO
function modoTorneio(){
    // mostrara em qual batalha o jogador está
    var b = document.querySelector("strong").style.color = "white";
    var batalhaAtual = document.querySelector(".bt");
    //div que mostrará o nome do oponente
    var nomeOponente = document.getElementById("oponente");
    // cor do hud dos oponentes
    var hudCor = document.querySelector(".computador-div");
    // mostra a tela do jogo
    jogoInicia.style.display = "block";
    // quando o jogador clicar no botão a modal fecha
    modal.style.display = 'none';
    rodadas_J = document.getElementById("rodadas-J");
    rodadas_C = document.getElementById("rodadas-C");
    //função para definir o ooponente do jogador
    function definirOponente(){
        //escolher o primeiro oponente do jogador, que estão apenas dentro do array
        Oponente = Math.floor(Math.random() * Oponentes.length);
        Cor = Math.floor(Math.random() * hudOponente.length);
        // mostrar o nome do oponente
        nomeOponente.innerHTML = `${Oponentes[Oponente]}`;
        //mostrar a cor do hud do oponente
        hudCor.style.backgroundColor = `${hudOponente[Cor]}`;
        //zerar o placar para a nova batalha
        rodadas_J.innerHTML = "0";
        rodadas_C.innerHTML = "0";
        pontosJogador.innerHTML = "0";
        pontosComputador.innerHTML = "0";
        //zerar a pontuação do jogador
        ptsJogador = 0;
        //zerar pontuação do computador
        ptsComputador = 0;
    }
    //função que verifica o tipo de vitória e inicia uma nova batalha caso o jogador ganhe
    function vitoria(){
        // se for rodada unica
        if(max_Rodadas < 2 || max_Rodadas == undefined){
            // se o jogador venceu sem deixar o computador pontuar
            if(ptsComputador == 0){
                // audio de vitória
                audio[6] = document.getElementById("audio6");
                audio[6].play();
                vencedor.innerHTML = "Vitória Perfeita do Jogador!";
                nomeOponente.innerHTML = "Proxima Batalha:";
                //quando o audio de vitória terminar
                audio[6].onended = function(){          
                    //audio de vitória perfeita
                    audio[4] = document.getElementById("audio4");
                    audio[4].play();
                    //quando o audio acabar
                    audio[4].onended = function(){
                    //proxima batalha
                    batalha ++;
                    batalhaAtual.innerHTML ++;
                    vencedor.innerHTML = "";
                    definirOponente();
                    novaJogada();}
                }
            }
            // se for mais de uma rodada
            else{
                // audio de vitória
                audio[6] = document.getElementById("audio6");
                audio[6].play();
                vencedor.innerHTML = "Vitória do Jogador!";
                nomeOponente.innerHTML = "Proxima Batalha:";
                //quando o audio acabar
                audio[6].onended = function(){
                //proxima batalha
                batalha ++;
                batalhaAtual.innerHTML ++;
                vencedor.innerHTML = "";
                definirOponente();
                novaJogada();}
                }
            }
        //se nao for rodada unica
        else{
            // e o jogador ganhou sem perder nenhuma rodada
            if(rodadas_Computador == 0){
                // audio de vitória
                audio[6] = document.getElementById("audio6");
                audio[6].play();
                vencedor.innerHTML = "Vitória Perfeita do Jogador!";
                nomeOponente.innerHTML = "Proxima Batalha:";
                //quando o audio de vitória terminar
                audio[6].onended = function(){          
                    //audio de vitória perfeita
                    audio[4] = document.getElementById("audio4");
                    audio[4].play();
                    //quando o audio acabar
                    audio[4].onended = function(){
                        //proxima batalha
                        batalha ++;
                        batalhaAtual.innerHTML ++;
                        vencedor.innerHTML = "";
                        definirOponente();
                        novaJogada();
                    }
                }
            }
            // se não, vitória simples
            else{
                // audio de vitória
                audio[6] = document.getElementById("audio6");
                audio[6].play();
                vencedor.innerHTML = "Vitória do Jogador!";
                nomeOponente.innerHTML = "Proxima Batalha:";
                //quando o audio acabar
                audio[6].onended = function(){
                //proxima batalha
                batalha ++;
                batalhaAtual.innerHTML ++;
                vencedor.innerHTML = "";
                definirOponente();
                novaJogada();}
            }
        }
    }
    //caso o jogador perca
    function derrota(){
        //audio de perdedor
        audio[5] = document.getElementById("audio5");
        audio[5].play();
        vencedor.innerHTML = `${Oponentes[Oponente]} Venceu`;
    }
    // se a batalha for igual a zero, significa que o jogador ainda não começou o torneio
    if(batalha == 0){
        // somar mais 1 na variavel de batalha, para começar o torneio
        batalha += 7;
        //esconder o numero de rodadas ganhas, porque as primeira batalhas são rodadas unicas
        rodadas_J.style.display = "none";
        rodadas_C.style.display = "none";
        audio[3].pause();
        audio[3].currentTime = 0;
        //determinar o oponente do jogador
        definirOponente();
        //iniciar torneio
        iniciar();
    }  
    // se o torneio iniciou
    else{
        // batalha 1 ate a 3 
        if(batalha >= 1 && batalha <= 6){
            minPontos = 3;
        }
        //batalha 7 chefe Final
        else if(batalha == 7){
            minPontos = 5;
            max_Rodadas = 2;
        }
    //se o numero de rodadas for menor ou igual a 1 ou indefinido, é rodada unica 
    if(max_Rodadas <= 1 || max_Rodadas == undefined){
        if(ptsJogador == minPontos){
            // remover o oponente atual do array de Oponentes para que ele não seja repetido novamente
            Oponentes.splice(Oponente, 1);
            vitoria();
        }
        // se o computador vencer
        else if(ptsComputador == minPontos){
            derrota();
        }
        // se ninguem venceu ainda, nova jogada
        else{
            novaJogada();
        }
    }
    // Batalha final
    else if(batalha == 7){
        //mostrar o numero de rodadas na batalha final
        rodadas_J.style.display = "block";
        rodadas_C.style.display = "block";
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
            //mostrar os pontos de rodadas vencida no placar do Jogador
            rodadas_C.innerHTML ++;
            //somar 1 ponto de rodadas vencida
            rodadas_Computador ++;
            //zerar o placar para a nova rodada
            pontosJogador.innerHTML = "0";
            pontosComputador.innerHTML = "0";
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
        para vencer a rodada OU estão com o mesmo numero de rodadas vencidas */
        if((jogadorEscolha == computadorEscolha) || (ptsJogador < minPontos && ptsComputador < minPontos)){
            novaJogada();
        }
        //se jogador fez a quantidade de pontos para vencer a rodada
        else if(ptsJogador == minPontos){
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
            // se o jogador fez o ultimo ponto
            if(rodadas_Jogador > rodadas_Computador){
                // audio que tocara quando o jogador vencer o torneio
                audio[7] = document.getElementById("audio7");
                audio[7].play();
                // se o jogador venceu a ultima batalha, consagra-se o CAMPEÃo de JOKENPO
                vencedor.innerHTML = "Parabens você é o CAMPEÃO de JOKENPO!";
                setInterval(congratulations, 150);
                // efeito basico de mudança da cor da fonte
                function congratulations(){
                    var cores = ['white', 'yellow'];
                    var color = Math.floor(Math.random() * cores.length);
                    vencedor.style.color = `${cores[color]}`;
                }
            }
            // se houver empate no numero de rodadas
            else if(rodadas_Jogador == rodadas_Computador){
                //inicie uma rodada extra
                novaJogada();
            }
        }
        //se o fez o ultimo ponto
        else if(ptsComputador == minPontos){
            //mostrar os pontos de rodadas vencida no placar do Jogador
            rodadas_C.innerHTML ++;
            //somar 1 ponto de rodadas vencida
            rodadas_Computador ++;
            //zerar o placar para a nova rodada
            pontosJogador.innerHTML = "0";
            pontosComputador.innerHTML = "0";
            //zerar a pontuação do jogador
            ptsJogador = 0;
            //zerar pontuação do computador
            ptsComputador = 0;
            // se ele tiver mais vitórias do que o jogador
            if(rodadas_Computador > rodadas_Jogador){
                //audio de perdedor
                audio[5] = document.getElementById("audio5");
                audio[5].play();
                vencedor.innerHTML = `${Oponentes[Oponente]} é o(a) CAMPEÃO(a) de JOKENPO`;
            }
            // se houver empate no numero de rodadas
            else if(rodadas_Jogador == rodadas_Computador){
                //inicie uma rodada extra
                novaJogada();
            }
        }
    }
}

}

}
// MODO PERSONALIZADO
function modoPersonalizado(){
    // mostrar no placar as rodadas vencidas por cada um
    rodadas_J = document.getElementById("rodadas-J");
    rodadas_C = document.getElementById("rodadas-C");
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
                jogador();
            }
            // se o computador venceu mais rodadas que o jogador
            else if(rodadas_Computador > rodadas_Jogador){
                computador();
            }
            // se eles estiverem empatados
            else if(rodadas_Jogador == rodadas_Computador){
                novaJogada();
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
                jogador();
            }
            // se o computador venceu mais rodadas que o Jogador
            else if(rodadas_Computador > rodadas_Jogador){
               computador();
            }
            // se eles estiverem empatados
            else if(rodadas_Jogador == rodadas_Computador){
                novaJogada();
            }
        }
    }
    // Vitória Jogador
    function jogador(){
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
        else{
            // audio de vitória
            audio[6] = document.getElementById("audio6");
            audio[6].play();
            vencedor.innerHTML = "O Jogador venceu!";
        }
    }
    // Vitória computador
    function computador(){
        vencedor.innerHTML = "O Computador venceu!";
        //audio de derrota
        audio[5] = document.getElementById("audio5");
        audio[5].play();
    }
}




