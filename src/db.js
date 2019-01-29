let usuarios = [
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

let posts = [
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
        autor:'12918722'
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
        id:'12348',
        title:'This is my forth POST',
        body:'In this review we are going to remember GraphQL Basics 3',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918722'
    },
    {
        id:'12349',
        title:'This is my fifth POST',
        body:'In this review we are going to remember GraphQL Basics 3',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918721'
    },
    {
        id:'12310',
        title:'This is my sixth POST',
        body:'In this review we are going to remember GraphQL Basics 3',
        date: new Date().toDateString(),
        publish:false,
        autor:'12918723'
    }
]

let comentarios = [
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
        post:'12345'
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
        post:'12310'
    },
]

const db = {
    usuarios,
    posts,
    comentarios
}

export {db as default}