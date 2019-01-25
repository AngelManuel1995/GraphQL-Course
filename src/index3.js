import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
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
        name: 'Angel Manuel Góez Giraldo',
        email:'angelmanuel.goez@gmail.com'
    },
    {
        id: '12918722',
        age: 3,
        name: 'Emanuel Góez Giraldo',
        email:'emanuel.goez@gmail.com'
    },
    {
        id: '12918723',
        age: 23,
        name: 'Adriana Maria Góez',
        email:'adriana.goez@gmail.com'
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
    },
    {
        id:'12347',
        title:'This is my forth POST',
        body:'In this review we are going to remember GraphQL Basics 3',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918721'
    },
    {
        id:'12347',
        title:'This is my fifth POST',
        body:'In this review we are going to remember GraphQL Basics 3',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918721'
    },
    {
        id:'12347',
        title:'This is my sixth POST',
        body:'In this review we are going to remember GraphQL Basics 3',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918721'
    }
]

const comentarios = [
    {
        id:'104',
        text:'Primer comentario',
        autor:'12918721',
        post:'12345'
    },
    {
        id:'102',
        text:'Segundo comentario',
        autor:'12918721',
        post:'12346'
    },
    {
        id:'105',
        text:'Tercer comentario',
        autor:'12918721',
        post:'12346'
    },
    {
        id:'106',
        text:'Cuarto comentario',
        autor:'12918723',
        post:'12346'
    },
    {
        id:'107',
        text:'Quinto comentario',
        autor:'12918722',
        post:'12347'
    },
]

const typeDefs = `
    type Query {
        greeting(nombre:String): String!
        farewell(nombre:String): String!
        getPost: Post!
        getPosts: [Post!]!
        getUsuario:Usuario!
        getUsuarios:[Usuario!]!
        getComentarios:[Comentario!]!
        getComentario:Comentario!
    }
    
    type Mutation {
        crearUsuario( data: CrearUsuarioInput ):Usuario!
        crearPost( data: CrearPostInput ):Post!
        crearComentario( data: CrearComentarioInput ):Comentario!
    }

    input CrearUsuarioInput {
        age: Int!,
        name:String!,
        email:String!,
    }

    input CrearPostInput {
        title:String!,
        body:String!,
        publish:Boolean!,
        autor:ID!,
    }

    input CrearComentarioInput {
        text:String!,
        autor:ID!,
        post:ID!,
    }

    type Post {
        id: ID!,
        title: String!,
        body:  String!,
        date:  String!,
        publish: Boolean!,
        autor: Usuario!,
        comentarios:[Comentario!]!
    }

    type Usuario {
        id: ID!,
        age: Int!,
        name: String!,
        email: String!,
        posts:[Post!]!,
        comentarios:[Comentario!]!
    }

    type Comentario{
        id:ID!,
        text:String!,
        autor:Usuario!,
        post:Post!
    }
`

const resolvers = {
    Query: {
        greeting(parent, args, ctx, info){
            if(args.nombre){
                return `HOLA ${args.nombre} DESDE GRAPH-QL 3`
            }
            return 'HOLA DESDE GRAPH-QL 3'
        },
        farewell(parent, args, ctx, info){
            if(args.nombre){
                return `ADIOS ${args.nombre} DESDE GRAPH-QL 3`
            }
            return 'ADIOS DESDE GRAPH-QL 3'
        },
        getPost(){
            let index_post = Math.floor(Math.random() * ( posts.length))
            return posts[index_post]
        },
        getPosts(){
            return posts
        },
        getUsuario(){
            return usuarios[0]
        },
        getUsuarios(){
            return usuarios
        },
        getComentarios(){
            return comentarios
        },
        getComentario(){
            return comentarios[1]
        },
    },

    Mutation: {
        crearUsuario( parent, args, ctx, info ){
            const correoRegistrado = usuarios.some( (usuario) => {
                return usuario.email === args.data.email
            })

            if(correoRegistrado){
                throw new Error('El correo ya está registrado')
            }

            const usuario = {
                id: uuidv4(),
                ...args.data
            }

            usuarios.push(usuario)

            return usuario

        },
        crearPost( parent, args, ctx, info ){
            const existeUsuario = usuarios.some((usuario) => {
                return usuario.id === args.data.autor
            })
            
            if(!existeUsuario){
                throw new Error('El usuario no existe')
            }

            const post = {
                id: uuidv4(),
                date: new Date().toDateString(),
                ...args.data
            }

            posts.push(post)

            return post
        },
        crearComentario( parent, args, ctx, info ){
            const existeUsuario = usuarios.some( (usuario) => {
                return usuario.id === args.data.autor
            })

            const existePost = posts.some( (post) => {
                return post.id === args.data.post && post.publish
            })

            if(!existeUsuario ||  !existePost){
                throw new Error('Error al crear el comentario')
            }

            const comentario = {
                id: uuidv4(),
                ...args.data
            }

            comentarios.push(comentario)

            return comentario
        }
    },

    Post: {
        autor(parent, args, ctx, info){
            return usuarios.find((usuario) => {
                return parent.autor === usuario.id
            })
        },
        comentarios(parent, args, ctx, info){
            return comentarios.filter((comentario) => {
                return parent.id === comentario.post
            })
        }
    },

    Comentario:{
        autor(parent, args, ctx, info){
            return usuarios.find((usuario) => {
                return usuario.id === parent.autor
            })
        },
        post(parent, args, ctx, info){
            return posts.find((post) => {
                return parent.post === post.id
            })
        }
    },

    Usuario:{
        comentarios(parent, args, ctx, info){
            return comentarios.filter((comentario)=> {
                return parent.id === comentario.autor
            })
        },
        posts(parent, args, ctx, info){
            return posts.filter( (post) => {
                return parent.id === post.autor
            })
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start(() => {
    console.log('Servidor 3 está arriba')
})