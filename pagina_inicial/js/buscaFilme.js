class ModelPesquisa
    {
 
        constructor() {
            this._titulo = "";
            this._descricao = "";
            this._nota = "";
            this._ano = "";
            this._diretor = "";
            this._poster = "";
        }

        buscaFilme(filme, callback)
        {
            let request = new XMLHttpRequest();
            
            request.addEventListener( "load", () =>{ 
                try
                {
                    if ( request.status == 200 )
                    {                
                        let dados = this._processaResponse( request.responseText );
                        this._atualiza( dados );
                    }else{
                        throw new Error("Filme não encontrado!")
                    }
                }catch(error){
                    alert(error.message)
                    window.location.href = "../paginas_aux/404.html"
                }
                callback()
            })

            request.open( "GET", "http://www.omdbapi.com/?t=" + filme + "&apikey=e43443b7", false);

            request.send();
        }

        _processaResponse( responseString )
        {
            let response = JSON.parse( responseString );
            return response
        }

        _atualiza( dados )
        {
            if (dados.Response = "False") {
                
                window.location.href = "../paginas_aux/404.html"

            }

            this._titulo = dados.Title;
            this._descricao = dados.Plot;
            this._nota = dados.Rated;
            this._ano = dados.Year;
            this._diretor = dados.Director;
            this._poster = dados.Poster;      
        }

        getTitulo()
        {
            return this._titulo;
        }
        getDescricao()
        {
            return this._descricao;
        }
        getNota()
        {
            return this._nota;
        }
        getAno()
        {
            return this._ano;
        }
        getDiretor()
        {
            return this._diretor;
        }
        getPoster()
        {
            return this._poster;
        }
    }

    class ViewPesquisa
    {
        mostraFilme(model) {
            let title = document.getElementById('title');
            let description = document.getElementById('description');
            let rating = document.getElementById('rating');
            let year = document.getElementById('year');
            let director = document.getElementById('director');
            let poster = document.getElementById('poster')

            title.textContent = model.getTitulo();
            description.textContent = model.getDescricao();
            rating.textContent = model.getNota();
            year.textContent = model.getAno();
            director.textContent = model.getDiretor();
            poster.src = model.getPoster();
        }
    }

    class ControllerPesquisa
    {
       
        adicionaFilme(filme)
        {
            let model = new ModelPesquisa();
            model.buscaFilme(filme, ()=>{
                let view = new ViewPesquisa();
                view.mostraFilme(model);
            });
        }
    }
    
    let botao = document.getElementById("botaoBusca")
            
    let input = document.getElementById("buscaFilme")
    
    botao.addEventListener("click",()=>{ 

        event.preventDefault()
            
        let filme = input.value

        let controller = new ControllerPesquisa()

        controller.adicionaFilme(filme)
    })

    let controller = new ControllerPesquisa();