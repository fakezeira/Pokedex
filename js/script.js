const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

//form
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status === 200) {
        const data = await apiResponse.json() //passando para json
        return data
    }
    else {
        pokemonName.innerHTML = 'Não existe'
        pokemonNumber.innerHTML = ''
        pokemonImage.src = ''
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    input.value = '' //para limpar o campo pós executar a função
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); // fazer com que o evento padrão do formulário não acontece (recarregar a página)
    renderPokemon(input.value.toLowerCase())
})

//tratando os botões de prev e next
btnPrev.addEventListener('click', () => {
    let idPokemon = Number(pokemonNumber.textContent)
    
    if (idPokemon > 1) {
        idPokemon--
        renderPokemon(idPokemon)
    }
    else {
        renderPokemon('1')
    }
})

btnNext.addEventListener('click', () => {
    let idPokemon = Number(pokemonNumber.textContent)

    if (idPokemon < 649) {
        idPokemon++
        renderPokemon(idPokemon)
    }
    else {
        renderPokemon('649')
    }
})

renderPokemon('1') // Sempre que a página carregar pela primeira vez, dará inicio com o primeiro pokemon já setado
