import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {

    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView' /*, true*/ /*Comentado pois utilizamos o decorator escape*/);
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        // Comentado pois vamos utilizar decorator domInject no lugar de repetitivas vezes querySelector
        // this.inputData = <HTMLInputElement>document.querySelector('#data');
        // this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {
        //Comentado, pois vamos utilizar decorator logarTempoDeExecucao
        // const t1 = performance.now();
        /*
            Zé, você já viu isso?
        */
        const negociacao = Negociacao.criaDe(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        );
     
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas');
            return ;
        }

        this.negociacoes.adiciona(negociacao);
        //console.log(negociacao)

        // console.log comentado pois aplicamos ele em negociacao.ts no método paraTexto
        // console.log(`
        //     Data: ${negociacao.data},
        //     Quantidade: ${negociacao.quantidade},
        //     Valor: ${negociacao.valor}
        // `);

        // console.log comentado pois aplicamos ele em negociacoes.ts no método paraTexto
        // console.log(JSON.stringify(this.negociacoes, null, 2));
        
        // Comentados os 2 console.log pois utilizamso aqui a função imprimir que criamos em imprimir.ts
        // console.log(negociacao.paraTexto());
        // console.log(this.negociacoes.paraTexto());
        
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
        //Comentado, pois vamos utilizar decorator logarTempoDeExecucao
        // const t2 = performance.now();
        // console.log(`Tempo de execução do método adiciona: ${(t2 - t1)/1000} segundos`)
    }

    public importarDados(): void {
        //alert('oi');

        // Comentado o fetch pois substituimos por um service: 
        // fetch('http://localhost:8080/dados')
        //     .then(res => res.json())

        //     // Comentado pois substituimos o tipo any pela interface NegociacoesDoDia
        //     //.then((dados: any[]) => {

        //     .then((dados: NegociacoesDoDia[]) => {
        //         return dados.map(dadoDeHoje => {
        //             return new Negociacao(
        //                 new Date(), 
        //                 dadoDeHoje.vezes, 
        //                 dadoDeHoje.montante
        //             )
        //         })
        //     })

        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
                });
            })
            .then(negociacoesDeHoje => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
    } 

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
