import { Comparavel } from "../interfaces/comparavel.js";
import { Modelo } from "../interfaces/modelo.js";
import { Imprimivel } from "../utils/imprimivel.js";

export class Negociacao implements Modelo<Negociacao> /*implements Imprimivel, Comparavel<Negociacao> 
Comentado pois vamos estender via interface Modelo*/ {

    constructor(
        private _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number
    ) {}

    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    public paraTexto(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `;
    }

    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
         && this.data.getMonth() === negociacao.data.getMonth()
         && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}