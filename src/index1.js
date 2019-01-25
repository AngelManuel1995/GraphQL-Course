import { GraphQLServer } from 'graphql-yoga'
// La libreria que vamos a usar es graphql-yoga

//Escencialmente necesitamos tres elementos para trabajar con graphql
/**
 * Una de ellas son las declaraciones de las funciones y la otra las creaciones de las funciones
 * es como un directorio de funciones, un especie de diccionario donde un una parte tenemos las 
 * definiciones y en otra parte el significado o lo que hacen estas definiciones
 * 
 * entonces el primer elemento es una template que contiene las definiciones
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
        greeting( nombre: String! ): String!
        farewell( nombre: String! ): String!
        warning: String!
        me: Usuario!
        post:[Post!]!
        posts:[Post!]!,
        me_1: Engineering!
    }

    type Usuario {
        id: ID!
        age: Int!
        name: String!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        date: String!
        autor: Usuario!
    }

    type Engineering {
        id: ID!
        name: String!
        age: Int!
        cc: String!
        marital_status: String!
        profesion: String!
    }
`

const resolvers = {
    Query: {
        greeting( parent, args, ctx, info ){
            return `Hola ${ args.nombre } cómo estás?`
        }, 
        farewell( parent, args, ctx, info ){
            return `Adios ${ args.nombre } que estes super!`
        },
        warning(){
            return `Take care !!!`
        },
        posts(){
            return posts
        },
        me(){
            return usuarios[0]
        },
        post(){
            return posts
        },
        me_1(){
            return {
                id:1212,
                name:'Angel Manuel Góez Giraldo',
                age:23,
                cc:1036658046,
                marital_status:'Single',
                profesion:'Computer sciensts'
            }
        }
    },
    Post:{
        autor(parent, args, ctx, info){
            return usuarios.find( (usuario) => {
                return parent.autor === usuario.id
            })
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers})


server.start(() => {
    console.log('El servidor está arriba')
})
