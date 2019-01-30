import uuidv4 from 'uuid/v4'

const Mutation = {
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
}

export { Mutation as default}