const Comentario = {
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
}

export { Comentario as default}