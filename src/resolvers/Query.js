const Query = {
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
    getPost(parent, args, { db }, info){
        let index_post = Math.floor(Math.random() * ( posts.length))
        return db.posts[index_post]
    },
    getPosts(parent, args, { db }, info){
        return db.posts
    },
    getUsuario(parent, args, { db }, info){
        return db.usuarios[0]
    },
    getUsuarios(parent, args, { db }, info){
        return db.usuarios
    },
    getComentarios(parent, args, { db }, info){
        return db.comentarios
    },
    getComentario(parent, args, { db }, info){
        return db.comentarios[1]
    }
}

export { Query as default }