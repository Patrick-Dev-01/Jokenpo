// array do jogador
var jogador = [];
// array do computador
var computador = [];

function game(e){   
    //pegar todas as imagens da escolha do Jogador
    jogador[1] = document.getElementById('pedra-j');
    jogador[2] = document.getElementById('papel-j');
    jogador[3] = document.getElementById('tesoura-j');

    //pegar todas as imagens da escolha do Computador
    computador[1] = document.getElementById('pedra-c');
    computador[2] = document.getElementById('papel-c');
    computador[3] = document.getElementById('tesoura-c');

    //armazenar a escolha do jogador na varivel
    var jogadorEscolha = e;
    //chamar a função que irá verificar quem somou ponto ou se houve Empate
    escolha(jogadorEscolha);
}
// 1 Pedra
// 2 Papel
// 3 Tesoura
function escolha(jogadorEscolha){
    //Pegar os pontos do Jogador
    var pontosJogador = document.getElementById("ptJ");
    //Pegar os pontos do Computador
    var pontosComputador = document.getElementById("ptC");
    //Faz o computador escolher aleatoriamente, um numero entre 1 e 3
    computadorEscolha = Math.floor(Math.random() * 3 + 1);

    // se o jogador escolheu Pedra
    if(jogadorEscolha == 1){      
        //Caso a escolha da jogada anterior foi papel ou tesoura, ele removerá o destaque
        jogador[2].classList.add("jogador");
        jogador[3].classList.add("jogador");  
        //Destacar a escolha do jogador
        jogador[1].classList.remove("jogador");
        jogador[1].classList.add("escolhaJogador");
        
        // e se o computador escolheu Tesoura
        if(computadorEscolha == 3){
            // o jogador soma 1 Ponto
            pontosJogador.innerHTML ++;
            //Destacar a escolha do computador
            computador[3].classList.remove("computador");
            computador[3].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou papel, ele removerá o destaque
            computador[1].classList.add("computador");
            computador[2].classList.add("computador");
        }

        // E se o computador escolheu Papel
        else if (computadorEscolha == 2){
            //o computador soma 1 ponto
            pontosComputador.innerHTML ++;
            //destacar escolha do computador
            computador[2].classList.remove("computador");
            computador[2].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou Tesoura, ele removerá o destaque
            computador[1].classList.add("computador");
            computador[3].classList.add("computador");
        }

        // se o Computador tambem escolheu Pedra
        else{
                    //EMPATE
            //destacar escolha do computador
            computador[1].classList.remove("computador");
            computador[1].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi papel ou tesoura, ele removerá o destaque
            computador[2].classList.add("computador");
            computador[3].classList.add("computador");
        }
    }

    //Se o Jogador escolheu Papel
    if(jogadorEscolha == 2){
        //Caso a escolha da jogada anterior foi Pedra ou tesoura, ele removerá o destaque
        jogador[1].classList.add("jogador");
        jogador[3].classList.add("jogador");  
        //Destacar a escolha do jogador
        jogador[2].classList.remove("jogador");
        jogador[2].classList.add("escolhaJogador");

        // e se o Computador escolheu Pedra
        if(computadorEscolha == 1){
            // o jogador soma 1 Ponto
            pontosJogador.innerHTML ++;
            //Destacar a escolha do computador
            computador[1].classList.remove("computador");
            computador[1].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi papel ou Tesoura, ele removerá o destaque
            computador[2].classList.add("computador");
            computador[3].classList.add("computador");
        }

        // e se o Computador escolheu Tesoura 
        else if(computadorEscolha == 3){
            //o computador soma 1 ponto
            pontosComputador.innerHTML ++;
            //destacar escolha do computador
            computador[3].classList.remove("computador");
            computador[3].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou Papel, ele removerá o destaque
            computador[1].classList.add("computador");
            computador[2].classList.add("computador");
        }

        // se o Computador Tambem escolheu Papel
        else{
                    //EMPATE
            //destacar escolha do computador
            computador[2].classList.remove("computador");
            computador[2].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou tesoura, ele removerá o destaque
            computador[1].classList.add("computador");
            computador[3].classList.add("computador");
        }
    }

    // se o Jogador escolheu Tesoura
    if(jogadorEscolha == 3){
        //Caso a escolha da jogada anterior foi pedra ou papel, ele removerá o destaque
        jogador[1].classList.add("jogador");
        jogador[2].classList.add("jogador");  
        //Destacar a escolha do jogador
        jogador[3].classList.remove("jogador");
        jogador[3].classList.add("escolhaJogador");

        // e se o Computador escolheu Papel
        if(computadorEscolha == 2){
            // o jogador soma 1 Ponto
            pontosJogador.innerHTML ++;
            //Destacar a escolha do computador
            computador[2].classList.remove("computador");
            computador[2].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi papel ou Tesoura, ele removerá o destaque
            computador[1].classList.add("computador");
            computador[3].classList.add("computador");
        }
        // e se o Computador escolheu Pedra
        else if(computadorEscolha == 1){
            //o computador soma 1 ponto
            pontosComputador.innerHTML ++;
            //destacar escolha do computador
            computador[1].classList.remove("computador");
            computador[1].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou Papel, ele removerá o destaque
            computador[2].classList.add("computador");
            computador[3].classList.add("computador");
        }

        // se o computador tabem escolheu Tesoura
        else{
               //EMPATE
            //destacar escolha do computador
            computador[3].classList.remove("computador");
            computador[3].classList.add("escolhaComputador");
            //Caso a escolha do computador anterior foi pedra ou tesoura, ele removerá o destaque
            computador[1].classList.add("computador");
            computador[2].classList.add("computador");
        }
    }
}

