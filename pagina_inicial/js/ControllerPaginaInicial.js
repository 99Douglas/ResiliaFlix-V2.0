class ControllerPaginaInicial {

    constructor() {
        [...document.querySelectorAll('.cards-filmes')].forEach(function(card) {
            card.addEventListener("click", () => {
                let filme = card.id;
    
                let controller = new ControllerPaginaInicial();
                controller.procuraEMostraFilme(filme);
            })
        })
    }

    procuraEMostraFilme (filme) {

        let model = new ModelPaginaInicial()
        model.requisicao(filme);

        let view = new ViewPaginaInicial()
        view.mostraFilme(model);
    }
}

let controlar = new ControllerPaginaInicial()