const Post = {
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
}

export { Post as default }