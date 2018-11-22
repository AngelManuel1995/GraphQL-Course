import { GraphQLServer }  from 'graphql-yoga'

//Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        greeting: String!
        city: String!
        profesion: String!
    }
`
// Resolver
const resolvers = {
    Query: {
        hello(){
            return 'Hello World GraphQL'
        },
        greeting() {
            return 'Hello Anguel Manuel Góez Giraldo'
        },
        city(){
            return 'Medellín'
        },
        profesion(){
            return 'Computer Sciensts'
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