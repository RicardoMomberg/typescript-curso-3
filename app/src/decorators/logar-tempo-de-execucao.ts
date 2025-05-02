export function logarTempoDeExecucao(emSegundos: boolean = false) {
    // Este é o decorator em si, que retorna uma função que modifica o método decorado
    return function(
        target: any,              // O alvo (a classe no qual o método está sendo decorado)
        propertyKey: string,      // O nome do método decorado
        descriptor: PropertyDescriptor // O descriptor do método decorado (permite sobrescrevê-lo)
    ) {
        // Guardamos a referência ao método original antes de sobrescrevê-lo
        const metodoOriginal = descriptor.value;

        // Substituímos o método original por uma nova função
        descriptor.value = function(...args: any[]) {
            let divisor = 1;
            let unidade = 'milisegundos';
            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            /**
             * O rest operator `...args` permite capturar todos os argumentos
             * passados para o método decorado como um array.
             * 
             * Exemplo:
             * Se o método decorado for chamado como: `adiciona(1, 2, 3)`,
             * então `args` será: [1, 2, 3]
             * 
             * Usamos `Array<any>` porque não sabemos quantos argumentos
             * nem os tipos deles — isso torna o decorator genérico e reutilizável.
             */

            const t1 = performance.now(); // Marca o início da execução

            // Chamamos o método original, preservando o contexto `this` e os argumentos
            const retorno = metodoOriginal.apply(this, args);
            /**
             * Usamos `apply(this, args)` ao invés de `metodoOriginal()` diretamente
             * porque queremos manter o `this` correto (instância da classe)
             * e passar todos os argumentos corretamente.
             */

            const t2 = performance.now(); // Marca o fim da execução

            // Exibe o tempo total de execução do método no console
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/divisor} ${unidade}`);
            retorno; // Retorna o resultado original do método
        };

        return descriptor; // Retorna o descriptor modificado com a nova função
    }
}
