import { GraphQLServer }  from 'graphql-yoga'

//Type definitions (schema)
//Tios de datos en GrahpQL
// Int, String, Float, ID, Boolean, [] (arreglo de objetos)
// Con ! indicamos que el valor tiene que ser retornado
const typeDefs = `
    type Query {
        greeting(name:String, position:String):String!
        grades:[Int!]!
        me: User!
        post: Post!
        add(numbers: [Float!]!): Float!
    }
    
    type User {
        id: ID!
        name: String!
        email: String
        age: Int
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
    }

    type Subject {
        id: ID!
        name: String!
        credits: Int!
    }
`
// Resolver
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info){
            if(args.name && args.position){
                return `Hello, ${args.name}! you are my favoriate ${args.position}.`
            }else{
                return 'Hello!'
            }
        },

        add(parent, args, ctx, info){
            if(args.numbers.length === 0){
                return 0
            }
            return args.numbers.reduce((acumulate, current) => {
                return acumulate + current
            })
        },

        grades(){
            return [
                1,2
            ]
        },

        me(){
            return { 
                id:'1036658046',
                name: 'Angel Manuel Góez Giraldo',
                email: 'angel@example.com.co',
                age: 23
            }   
        },

        post() {
            return {
                id: '90901',
                title: 'GraphQl',
                body: 'This is my first graphql custom type'
            }
        },

        
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is UP')
})