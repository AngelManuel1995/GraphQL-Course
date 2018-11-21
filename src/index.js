import { GraphQLServer }  from 'graphql-yoga'

//Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
    }
`
// Resolver
const resolvers = {
    Query: {
        hello(){
            return 'Hello World GraphQL'
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