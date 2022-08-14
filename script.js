                window.onload=function() { //Função para carregar o palco

                    var palco =  document.getElementById('palco'); /*Captura o elemento html pelo id palco
                    e atribui a variárvel palco*/
                    var ctx = palco.getContext("2d"); //Definição do contexto do palco em 2D
                    document.addEventListener("keydown", keyPush); /*Fica escutando o pressionar de tecla e
                    dispara a função keyPush() */
                    setInterval(game,100); //Velocidade de atualização de display

                    const vel = 1;   //Quantidade de casas que a cabeça da cobra avança.

                    var vx = vy = 0; // velocidade x e y inicial
                    var px = 15; // Posição X inicial da cabeça
                    var py = 15; // Posição Y inicial da cabeça
                    var tp = 30; // Tamanho de cada peça (zoom)
                    var qp = 20; // Quantidade de peças 
                    var ax=ay=15; // Posição inicial do alimento (apple)

                    var trilha =[]; //trilha (Array)
                    //calda=1; //Calda da cobra
                
                    function game() {
                        px += vx; //Recebe a posição atual da coord. x mais a velocidade atual.
                        py += vy; //Recebe a posição atual da coord. y mais a velocidade atual.
                        
                        if (px <0) { //Se a posição atual menor que 0...
                            px= qp-1; //Posição atual recebe quantidade de posição -1
                        }

                        if (px > qp-1){
                            px = 0;
                        }
                        if (py < 0) {
                            py = qp-1;
                        }
                        if (py > qp-1){
                            py = 0;
                        }

                        ctx.fillStyle = "black"; //Definindo o estilo de preenchimento (cor) do contexto.
                        ctx.fillRect(0,0,palco.width,palco.height); //

                        ctx.fillStyle= "red"; // Definindo o estilo de preenchimento (cor) do alimento.
                        ctx.fillRect(ax*tp,ay*tp,tp,tp); /* Definindo a posição inicial e o tamanho da 
                        cor a ser pintado */

                        ctx.fillStyle= "blue";
                        for (var i = 0; i < trilha.length; i++) {
                            ctx.fillRect(trilha[i].x*tp, trilha[i].y*tp, tp, tp);
                            if (trilha[i].x == px && trilha[i].y == py){ /*se coordenadas da trilha
                                igual as coordenadas da posição da cabeça da cobra, então...*/
                                vx = vy=0; //coordanada visual x e y recebem 0, e...
                                calda =4; //calda da cobra recebe 4
                                zero();                                
                        
                            }
                        }
                        trilha.push({x:px,y:py}) // Adicionando novo intem ao final da Array
                        while (trilha.length > calda) {
                            trilha.shift(); //Remove o primeiro intem do Array
                        }
                        if (ax==px && ay==py){ /*se coordenada x do alimento = coordenada x da cabeça
                            da cobra E a coordeanda y do alimento = a coordenada y da cabeça da cobra
                            - Colisão */                        
                            calda++; //calda recebe mais incremento
                                                      
                            ax = Math.floor(Math.random()*qp); /*A coordenada x do alimento recebe
                            valor aleatório Vezes de posições existentes*/
                            ay = Math.floor(Math.random()*qp); /*A coordenada y do alimento recebe
                            valor aleatório Vezes de posições existentes*/

                            pontuacao(); //Chamando a função de pontuação.
                            
                        }
                    }

                    function pontuacao(){ // Função de pontuação.
                        
                        npontos = calda - 4; // a variavel "nponto" recebe o tamanho da calda -4
                        var pontos = document.querySelector("#pontos");/* a var pontos recebe o elemento                                                    
                        #pontos selecionado no html*/ 
                            pontos.textContent = npontos; /*O elemento pontos recebe novo valor
                        da variáve npontos */
                    }

                    function zero(){
                        pontos.textContent = 0;
                    }

                    function keyPush(event){

                        switch (event.keyCode){
                            case 37: //seta para esquerda
                                vx = -vel;
                                vy = 0;
                                break;
                            case 38: //seta para cima
                                vx = 0;
                                vy = -vel;
                                break;
                            case 39: //seta para direita
                                vx = vel;
                                vy = 0;
                                break;
                            case 40: //seta para baixo
                                vx = 0;
                                vy = vel;
                            default:
                                break;                            
                                        
                        }
                    }            
                }