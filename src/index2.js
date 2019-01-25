import { GraphQLServer } from 'graphql-yoga'
// La libreria que vamos a usar es graphql-yoga

//Escencialmente necesitamos tres elementos para trabajar con graphql
/**
 * Una de ellas son las declaraciones de las funciones y la otra las creaciones de las funciones
 * es como un directorio de funciones, un especie de diccionario donde un una parte tenemos las 
 * definiciones y en otra parte el significado o lo que hacen estas definiciones
 * 
 * entonces el primer elemento es una template string que contiene las definiciones
 * nuestra segunda parte es la parte un (objeto) donde decimos que van a hacer lo que definamos en la template
 * la tercera parte en un objeto del tipo GraphQLServer que toma como parametro las dos constantes creadas anteriormente
 * finalmente lo que tenemos que hacer es ejecutar el servidor
 */

const usuarios = [
    {
        id: '12918721',
        age: 23,
        name: 'Angel Manuel Góez Giraldo'
    },
    {
        id: '12918722',
        age: 3,
        name: 'Emanuel Góez Giraldo'
    },
    {
        id: '12918723',
        age: 23,
        name: 'Adriana Maria Góez'
    }
]

const posts = [
    {
        id:'12345',
        title:'This is my first POST',
        body:'In this review we are going to remember GraphQL Basics 1',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918721'
    },
    {
        id:'12346',
        title:'This is my second POST',
        body:'In this review we are going to remember GraphQL Basics 2',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918721'
    },
    {
        id:'12347',
        title:'This is my third POST',
        body:'In this review we are going to remember GraphQL Basics 3',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918721'
    }
]

const typeDefs = `
    type Query {
        greeting: String!
        farewell: String!
    }
`
const resolvers = {
    Query: {
        greeting(){
            return 'HOlA DESDE GRAPH-QL'
        }
    }
   
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start(() => {
    console.log('El servidor está arriba')
})