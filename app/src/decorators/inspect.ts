// // Decorator que loga os parâmetros e retorno do método decorado
// export function inspect() {
//     return function(
//         target: any,
//         propertyKey: string,
//         descriptor: PropertyDescriptor
//     ) {
//         // Guardamos o método original
//         const metodoOriginal = descriptor.value;

//         // Substituímos o método por uma nova função decorada
//         descriptor.value = function (...args: any[]) {
//             console.log(`--- Método ${propertyKey}`);
//             console.log(`------ parâmetros: ${JSON.stringify(args)}`);

//             // Chamamos o método original (que já foi decorado por logarTempoDeExecucao)
//             const retorno = metodoOriginal.apply(this, args);

//             console.log(`------ retorno: ${JSON.stringify(retorno)}`);
//             return retorno;
//         }

//         return descriptor; // Retorna o descriptor modificado
//     }
// }



// Exportando diretamente a função que é o meu decorator, sem a função externa como no exemplo acima.
export function inspect(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // Guardamos o método original
        const metodoOriginal = descriptor.value;

        // Substituímos o método por uma nova função decorada
        descriptor.value = function (...args: any[]) {
            console.log(`--- Método ${propertyKey}`);
            console.log(`------ parâmetros: ${JSON.stringify(args)}`);

            // Chamamos o método original (que já foi decorado por logarTempoDeExecucao)
            const retorno = metodoOriginal.apply(this, args);

            console.log(`------ retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        }

        return descriptor; // Retorna o descriptor modificado
    }
