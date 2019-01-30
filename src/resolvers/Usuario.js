const Usuario = {
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

export { Usuario as default }