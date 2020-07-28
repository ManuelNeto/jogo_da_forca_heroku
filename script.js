/* */
let categoryName = document.querySelector("#category");
/* */
let wrongletters = document.querySelector(".wrongletters");
/* */
let dashes = document.querySelector(".dashes"); //Renomear
/* */
let eyes = Array.from(document.querySelectorAll(".eyes"));
/* Array com as partes do corpo */
let bodyParts = Array.from(document.querySelectorAll("#person div"));
/* palavra corrente */
let currentWord;
/* Lista das letras erradas */
let wronglettersArray = []; //Explicar
/* Lista com as letras da palavra corrente */
let correctletters = []; //Explicar
/* index da parte do corpo corrente */
let bodyCounter; //Explicar

bodyParts = bodyParts.slice(2, bodyParts.length); //Ver um outro local para colocar isso.

/*
Cria as categorias em objetos
Darei um exemplo e o aluno completa como achar melhor
*/
let categories = {
    frutas: ["banana", "maça", "laranja", "mamao", "uva", "melancia", "melao"],
    profissões: ["engenheiro", "advogado", "medico", "professor", "pescador"],
    animais: ["papagaio", "galo", "cachorro", "gato", "galinha", "cavalo", "porco"],
    cores: ["amarelo", "azul", "laranja", "roxo", "vermelho", "marrom"]
}

/*
Gera um numero aleatorio de acordo com o valor max passado
O aluno irá implementar 
Importante para treinar o Math
*/
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

/*
Transforma as chaves do objeto em array
O aluno irá implementar 
Importante para treinar as propriedades dos objetos
*/
function getCatagoryArray(categoriesArray) {
    return Object.keys(categories);
}

/*
Seleciona uma categoria de forma aleatoria
O aluno irá implementar 
Importante para treinar o index Array
*/
function getRandomCategory() {
    let categoriesArray = getCatagoryArray();
    let categoryIndex  = getRandomNumber(categoriesArray.length);
    let randomCategory  = categoriesArray[categoryIndex];
    return randomCategory;
}

/*
Exibe a categoria na UI 
*/
function setCategoryName() {
    categoryName.innerHTML = getRandomCategory();
}

/*
Importante para o aluno 
Define a palavra que será adivinhada
*/
function setCurrentWord() {
    let wordsArray = categories[categoryName.innerHTML];
    let wordsIndex  = getRandomNumber(wordsArray.length);
    currentWord = wordsArray[wordsIndex];
    correctletters = currentWord.split(''); // Lista de verificação
    hideWord();
}

/*
Oculta a palavra substituindo as letras por -
O aluno irá implementar a logica para ocultar a palavra
Importante para o aluno trabalhar com for em strings
*/
function hideWord() {
    console.log(currentWord); //Apagar
    let hideWord = "";
    for (const iterator of currentWord) { //Substituir isso por um for normal
        hideWord += "-"
    }
    setMessage(hideWord);
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função game
O aluno nao implementará
*/
function getCharCode(e){
    game(e.key);    // Ver uma forma de melhorar esse argumento
    return e.key    // Não precisa disso
}

/*
Atualiza a palavra escondida
Importante para o aluno trabalhar com for em string e condicionais --> aluno implementa
Renomear nome do método
*/
function updateDashes(letter){
    let word = ""; //Renomear
    for (let i = 0; i < currentWord.length; i++) {
        if(currentWord[i] === letter){
            word += letter;
        } else if(dashes.innerHTML[i] != "-"){
            word += dashes.innerHTML[i];
        } else{
            word += "-";
        }        
    }
    setMessage(word);
}

/*
Desenha a parte do corpo corrente
O Aluno não irá implementar
*/
function drawBodyParts(){
    bodyParts[bodyCounter].classList.remove("hide");
    bodyCounter++; //Ver uma forma disso ficar indiderente ao aluno
}

/*
Verifica se a letra digitada contem na palavra
O aluno irá implementar as condições do jogo
O aluno ira trabalhar com Arrays ao atualizar a lista de letras erradas
*/
function game(letter){
    if(correctletters.includes(letter)){
        updateDashes(letter);
    } else {
        wronglettersArray.push(letter);
        wrongletters.innerHTML = "Letras erradas: " + wronglettersArray;
        if(bodyParts.length > bodyCounter){
            drawBodyParts();
        }
    }
    checkEndGame();
}

/*
Verifica se o jogo será encerrado(jogador ganhou ou perdeu) ou se irá continuar.
O aluno devera implementar as condições e definir as mensagens
*/
function checkEndGame(){
    //win
    if(!dashes.innerHTML.includes('-')) {
        setMessage("Você venceu!");
        window.removeEventListener("keypress", getCharCode); //Ver alguma forma de reusar
    //bodyparts pode ser uma constante
    //gameover
    }else if(wronglettersArray.length > bodyParts.length){
        drawEyes();
        setMessage("Você perdeu!");
        window.removeEventListener("keypress", getCharCode);
    }
}

/*
Atualiza a mensagem exibida na UI
O Aluno não irá implementar
*/
function setMessage(message){
    dashes.innerHTML = message;
}

/* 
Desenha os olhos sempre que o joador perde o jogo
O Aluno não irá implementar
*/
function drawEyes(){
    eyes.forEach((eye => {
        eye.style.opacity = 1;
        eye.style.zIndex = 10;
    }));
}

//Reinicia o desenho do boneco.
//O aluno não deve implementar
function initPerson(){
    eyes.forEach((eye => {
        eye.style.opacity = 0.3; //Declarar como constante
    }));
    bodyParts.forEach(bodyPart => {
        bodyPart.classList.add("hide");
    });
}

//O aluno não deve implementar isso
function init(){
    /*Index para a as partes do corpo que serão desenhadas*/
    bodyCounter = 0; //Para que serve?
    /*Inicianlizando o array que contem as letras que não pertencem a palavra escolhida*/
    wronglettersArray = [];
    /*Exibe a mensagem*/
    wrongletters.innerHTML = "Letras erradas: "; 
    /*Desenhar o boneco em plano de fundo*/
    initPerson(); 
    /*Selecionar aleatoriamente a categoria*/
    setCategoryName();
    /*Selecionar aleatoriamente uma palavra da categoria previamente escolhida*/
    setCurrentWord();
    /* Evento para capiturar o click no teclado*/
    window.addEventListener("keypress", getCharCode);
}

window.addEventListener("load", init);
