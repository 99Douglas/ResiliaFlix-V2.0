class ModelPaginaInicial {
    constructor() {
        this._titulo = "";
        this._descricao = "";
        this._nota = "";
        this._ano = "";
        this._diretor = "";
    }

    requisicao (filme) {
        let pedido = new XMLHttpRequest();

        pedido.open("GET", `http://www.omdbapi.com/?apikey=9eb34366&t=${filme}`, false);

        pedido.addEventListener("load", () => {
            if(pedido.status == 200 && pedido.readyState == 4) {
                let filme = JSON.parse(pedido.responseText)

                this._titulo = filme.Title;
                this._descricao = filme.Plot;
                this._nota = filme.Rated;
                this._ano = filme.Year;
                this._diretor = filme.Director;
            }
        });

        pedido.send();

        console.log(this);
    }

    get titulo() {
        return this._titulo;
    }

    get descricao() {
        return this._descricao;
    }
    
    get nota() {
        return this._nota;
    }

    get ano() {
        return this._ano;
    }

    get diretor() {
        return this._diretor;
    }
}