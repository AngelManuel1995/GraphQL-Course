import { GraphQLServer }  from 'graphql-yoga'

//Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
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
`
// Resolver
const resolvers = {
    Query: {
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
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is UP')
})