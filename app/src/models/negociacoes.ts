import { Comparavel } from '../interfaces/comparavel.js';
import { Modelo } from '../interfaces/modelo.js';
import { Imprimivel } from '../utils/imprimivel.js';
import { Negociacao } from './negociacao.js';

export class Negociacoes implements Modelo<Negociacoes> /*implements Imprimivel, Comparavel<Negociacoes> 
Comentado pois vamos estender via interface Modelo*/ {

    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());  
    }
}
