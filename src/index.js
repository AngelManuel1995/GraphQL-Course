import { GraphQLServer, PubSub } from 'graphql-yoga'
import db                        from './db'
import Query                     from './resolvers/Query' 
import Mutation                  from './resolvers/Mutation' 
import Subscription              from './resolvers/Subscription'
import Usuario                   from './resolvers/Usuario' 
import Post                      from './resolvers/Post' 
import Comentario                from './resolvers/Comentario' 
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

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql', 
    resolvers:{
        Query,
        Mutation,
        Subscription,
        Usuario,
        Post,
        Comentario
    },
    context:{
        db,
        pubsub
    }
})

server.start(() => {
    console.log('Servidor está arriba')
})
