const resposta = document.querySelector('#resposta');
const lista = document.querySelector('#lista-jogos');
const modelo = document.querySelector('#modelo-jogo');

const apiKey = 'cv_JLg3wuo7E3ipMl2pCYv-ooK6qHpiU1AQ02I2hjzxWI9BnNwtP22qpdiFbOs7GPR8';

const apiUrl = 'https://api-ds.codeverse.dev.br/api/jogos';

async function buscarJogos() {
    resposta.textContent = 'Carregando jogos...';

    try {
        const retorno = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'x-api-key': apiKey },
        });

        if (!retorno.ok) {
            throw new Error('Não foi possível carregar os jogos.');
        }

        const resultado = await retorno.json();

        lista.innerHTML = '';

        for (const jogo of resultado.data) {
            const card = modelo.content.cloneNode(true);

            card.querySelector('.nome').textContent = jogo.title;
            card.querySelector('.genero').textContent = jogo.genero;
            card.querySelector('.plataforma').textContent = jogo.plataforma;
            card.querySelector('.ano_lancamento').textContent = jogo.ano_lancamento;
            card.querySelector('.desenvolvedora').textContent = jogo.desenvolvedora;

            const imagem = card.querySelector('.imagem-jogo');
            const semImagem = card.querySelector('.sem-imagem');

            if (jogo.imageUrl) {
                imagem.src = jogo.imageUrl;
                imagem.alt = jogo.title;

                semImagem.remove();

                imagem.onerror = () => {
                    imagem.remove();
                    semImagem.textContent = 'Imagem indisponível';
                };
            } else {
                imagem.remove();
            }

            lista.appendChild(card);
        }

        resposta.textContent = '';
    } catch (error) {
        console.error(error);
        resposta.textContent = 'Não foi possível carregar os jogos. Tente novamente!';
    }
}

buscarJogos();