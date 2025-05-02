import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspect } from "../decorators/inspect.js";

export abstract class View<T> {

    protected elemento: HTMLElement;
    // Comentado pois utilizamos o decorator escape
    // private escapar = false;

    constructor(seletor: string /*, escapar?: boolean*/ /* Comentado pois utilizamos o decorator escape*/) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);
        }
        // Comentado pois utilizamos o decorator escape
        // if (escapar) {
        //     this.escapar = escapar;
        // }
    }

    /**
     * Decorators são aplicados nesta ordem:
     * 
     * 1. Primeiro @logarTempoDeExecucao(true) é aplicado e modifica o método `update`
     * 2. Depois @inspect() é aplicado sobre o método já decorado acima
     * 
     * Portanto, ao executar o método:
     * - Primeiro roda o código do `inspect` (log de parâmetros e retorno)
     * - Dentro dele, roda o `logarTempoDeExecucao` que mede o tempo
     */
    // @inspect() //desta forma "inspect()" espera receber parâmetro do decorator, como inspect não recebe podemos substituir pela função direta "inspect"
    
    // @logarTempoDeExecucao(true) //true significa que vai ser em segundos
    // @inspect
    public update(model: T): void {
        //Comentado, pois vamos utilizar decorator logarTempoDeExecucao
        // t1 para iniciar a medição da performance 
        // const t1 = performance.now();


        let template = this.template(model);
        // Comentado pois utilizamos o decorator escape
        // if (this.escapar) {
        //     template = template
        //         .replace(/<script>[\s\S]*?<\/script>/, '');
        // }
        this.elemento.innerHTML = template;


         //Comentado, pois vamos utilizar decorator logarTempoDeExecucao
         // t2 para finalizar a medição da performance
         //  const t2 = performance.now();
         // Para medir a diferença entre tempo final e inicial 
         // (tempo/1000 para converter de ms para s)
         //  console.log(`Tempo de execução do método update: ${(t2 - t1)/1000} segundos`);
    }

    protected abstract template(model: T): string;
}