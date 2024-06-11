//constantes
const form = document.getElementById('form-atividade');
//== objetos p/ manipular as imagens
const imgAprovado = '<img src="/imagens/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="/imagens/reprovado.png" alt="Emoji decepcionado" />';
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
//----------------------
const atividades = [], notas = [];
//exibe mensagem pop-up p/ entrar nota media minima p/ passar
let notaMinima = parseFloat(prompt('Digite a nota mínima:', '1'));
//validacao p/ caso nao seja inserido um numero
if (Number.isNaN(notaMinima)) notaMinima = 7;
console.log('Nota minima: ' + notaMinima);
// variaveis
let linhas = '';

//== funcoes
function adicionaLinha() {
    //constantes
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    // valida se tabela nao contem as informacoes a serem inseridas: controle de duplicidade
    if (atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    }else{
        //== nao existe ainda: insere
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        //variavel p/ adicao de linhas
        let linha = '<tr>';
        //linha da atividade + nota
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        //adc linha com regra: nota media deve ser >= 7 p/ ser aprovado
        linha += `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`;
        //linha += `<td>${inputNotaAtividade.value >= 7 ? 'Aprovado' : 'Reprovado'}</td>`;
        linha += '</tr>';
        // passa linha recem criada p/ variavel global
        linhas += linha;
        //exibicao debug
        console.log(atividades, notas);
        console.log(`Atividade ${inputNomeAtividade.value} - nota ${inputNotaAtividade.value}`);
    }
    //reseta campos insercao
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaMediaFinal(){
    //calcula media
    const mediaFinal = calculaMediaFinal();
    //adiciona medias
    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    //variavel p/ somar
    let somaDasNotas = 0;
    //loop
    for(let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i];
    }
    //def retorno : calculo das medias
    console.log('Media: ' + somaDasNotas / notas.length0);
    return somaDasNotas / notas.length;
}

function atualizaTabela(){
    //constante corpo da tabela
    const corpoTabela = document.querySelector('tbody');
    // injeta html na tabela
    corpoTabela.innerHTML = linhas;
}

//adiciona controle de evento
form.addEventListener('submit', function(e){
    //paralisa execucao padrao do evento
    e.preventDefault();
    //adicina linha + atualiza tabelas
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
})