import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import db from './db'
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
        crearUsuario( parent, args, { db }, info ){
            const correoRegistrado = db.usuarios.some( (usuario) => {
                return usuario.email === args.data.email
            })

            if(correoRegistrado){
                throw new Error('El correo ya está registrado')
            }

            const usuario = {
                id: uuidv4(),
                ...args.data
            }

            db.usuarios.push(usuario)

            return usuario

        },
        eliminarUsuario( parent, args, { db }, info ){

           const indexUsuario = db.usuarios.findIndex(usuario => usuario.id === args.id)
           
           if(indexUsuario === -1){
               throw new Error('No existe usario con ese ID')
           }

           const usarioEliminado = db.usuarios.splice(indexUsuario,1)

           db.posts = db.posts.filter( (post) => {
                const match = post.autor === args.id

                if(match){
                    db.comentarios = db.comentarios.filter((comentario) => comentario.post !== post.id )
                }

                return !match
           })
            
           return usarioEliminado[0]
        },
        crearPost( parent, args, { db }, info ){
            const existeUsuario = db.usuarios.some((usuario) => {
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

            db.posts.push(post)

            return post
        },
        eliminarPost( parent, args, { db }, info ){
            const indexPost = db.posts.findIndex((post) => post.id === args.id)

            if(indexPost === -1){
                throw new Error('No se encuentra ese POST')
            }

            const postEliminado = db.posts.splice(indexPost,1)

            db.comentarios = db.comentarios.filter((comentario) => comentario.post !== args.id )
            
            return postEliminado[0]

        },
        crearComentario( parent, args, { db }, info ){
            const existeUsuario = db.usuarios.some( (usuario) => {
                return usuario.id === args.data.autor
            })

            const existePost = db.posts.some( (post) => {
                return post.id === args.data.post && post.publish
            })

            if(!existeUsuario ||  !existePost){
                throw new Error('Error al crear el comentario')
            }

            const comentario = {
                id: uuidv4(),
                ...args.data
            }

            db.comentarios.push(comentario)

            return comentario
        },
        eliminarComentario( parent, args, { db }, info){
            const indexComentario = db.comentarios.findIndex(comentario => comentario.id === args.id)

            if(indexComentario === -1){
                throw new Error('No se encuetra ese comentario')
            }

            const comentario = db.comentarios.splice(indexComentario, 1)

            return comentario[0]
        }
    },

    Post: {
        autor(parent, args, { db }, info){
            return db.usuarios.find((usuario) => {
                return parent.autor === usuario.id
            })
        },
        comentarios(parent, args, { db }, info){
            return db.comentarios.filter((comentario) => {
                return parent.id === comentario.post
            })
        }
    },

    Comentario:{
        autor(parent, args, { db }, info){
            return db.usuarios.find((usuario) => {
                return usuario.id === parent.autor
            })
        },
        post(parent, args, { db }, info){
            return db.posts.find((post) => {
                return parent.post === post.id
            })
        }
    },

    Usuario:{
        comentarios(parent, args, { db }, info){
            return db.comentarios.filter((comentario)=> {
                return parent.id === comentario.autor
            })
        },
        posts(parent, args, { db }, info){
            return db.posts.filter( (post) => {
                return parent.id === post.autor
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql', 
    resolvers,
    context:{
        db
    }
})

server.start(() => {
    console.log('Servidor 3 está arriba')
})