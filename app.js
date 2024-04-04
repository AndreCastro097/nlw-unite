
let participantes = [
    {
        nome: "André Castro",
        email: "andrecastro8282@gmail.com",
        dataInscricao: new Date(2024, 3, 2, 11, 49),
        dataCheckin: new Date(2024, 3, 2, 12, 5)
    },
    {
        nome: "João Silva",
        email: "joaosilva@example.com",
        dataInscricao: new Date(2024, 3, 2, 11, 55),
        dataCheckin: new Date(2024, 2, 2, 12, 10)
    },
    {
        nome: "Maria Oliveira",
        email: "maria.oliveira@example.com",
        dataInscricao: new Date(2024, 1, 2, 12, 3),
        dataCheckin: null
    },
    {
        nome: "Pedro Santos",
        email: "pedro.santos@example.com",
        dataInscricao: new Date(2024, 2, 2, 12, 10),
        dataCheckin: new Date(2024, 1, 2, 12, 20)
    },
    {
        nome: "Ana Costa",
        email: "ana.costa@example.com",
        dataInscricao: new Date(2024, 0, 2, 12, 20),
        dataCheckin: new Date(2024, 0, 2, 12, 25)
    },
    {
        nome: "José Oliveira",
        email: "jose.oliveira@example.com",
        dataInscricao: new Date(2024, 3, 2, 12, 25),
        dataCheckin: new Date(2024, 3, 2, 12, 30)
    },
    {
        nome: "Carla Mendes",
        email: "carla.mendes@example.com",
        dataInscricao: new Date(2024, 1, 2, 12, 30),
        dataCheckin: new Date(2024, 3, 2, 12, 35)
    },
    {
        nome: "Rafaela Alves",
        email: "rafaela.alves@example.com",
        dataInscricao: new Date(2024, 2, 2, 12, 35),
        dataCheckin: new Date(2024, 3, 2, 12, 40)
    },
    {
        nome: "Luís Fernandes",
        email: "luis.fernandes@example.com",
        dataInscricao: new Date(2024, 3, 2, 12, 40),
        dataCheckin: null
    },
    {
        nome: "Mariana Sousa",
        email: "mariana.sousa@example.com",
        dataInscricao: new Date(2024, 0, 2, 12, 45),
        dataCheckin: new Date(2024, 3, 2, 12, 50)
    }
];

const criarNovoParticipante = (participante) =>{
    const dataInscricaoAtualizada = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckinAtualizada = dayjs(Date.now()).to(participante.dataCheckin)

    if(participante.dataCheckin == null){
        dataCheckinAtualizada = `
            <button
                data-email="${participante.email}" 
                onclick="fazerCheckin(event)">
                Confirmar check-in
            </button>    
        `
    } // vou criar um atributo (data) e o nome q eu quiser(email) e atribuir um valor, vou passar o email do participante


    return `
       <tr>
         <td><strong>${participante.nome}</strong>
         <br>
          <small>${participante.email}</small>
          </td>
         <td>${dataInscricaoAtualizada}</td>
         <td>${dataCheckinAtualizada}</td>
       </tr> 
    `
}

const atualizaLista = (listaParticipante) =>{

    let output = ""
    for(let participante of listaParticipante){
        output += criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output
}

atualizaLista(participantes)

// Parte 2

const adicionarParticipante = (event)=>{
    event.preventDefault()

    const dadosDoForm = new FormData(event.target) // estou coletando os valores do meu form atraves do new Formdata() tem varias funcoes pra fazer // meu alvo vai ser justamente meu formulario
    

    const participante = { 
        nome: dadosDoForm.get('nome'), // pegando meu valor atravez do name com get
        email: dadosDoForm.get('email'), // pegando meu valor atravez do name com get
        dataInscricao: new Date(), // pra pegar a data de agora
        dataCheckin: null // porque eu ainda nao aconteceu, nao existe
    }

     // verificar se o participante ja existe
     const participanteExiste = participantes.find((p)=> p.email === participante.email // como é retorno imediato n precisa do return e chaves
    )

    if(participanteExiste){
        alert("Email já cadastrado!")
        return
    }

    participantes = [participante, ...participantes] // basicamente criei um array novo e coloquei meu obj como novos participantes e o spreed com os antigos participantes
    atualizaLista(participantes) // executando a lista

    // limpar o campo do form
    event.target.querySelector('[name="nome"]').value = " "; // event é o submit e target é o formulario
    event.target.querySelector('[name="email"]').value = " ";
}

const fazerCheckin = (event) =>{
    // confirma se relamente quer o checkin
    const ConfirmarCheckin = "Deseja realmente fazer check-in ?"

    if (confirm(ConfirmarCheckin) === false) {
        return // nao vai executar nada pra baixo c for true
    }
    console.log(event.target.dataset.email);
    // encontrar o participante dentro da lista
    const participante = participantes.find((p)=>{
        return p.email == event.target.dataset.email // o email q ta na lista é igual ao email que eu passei no meu form atrasves do data
    })
    // atualizar o check-in do participante
      participante.dataCheckin = new Date()  
    // atualizar a list de participantes
    atualizaLista(participantes)
}