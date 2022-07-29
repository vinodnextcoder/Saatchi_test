import { ApolloServer, gql, AuthenticationError } from 'apollo-server';
import { ApolloError } from 'apollo-server-errors';
import { accounts } from "./account";
import { fitness } from "./fitness"


import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { schema } from './schema'
const jwt = require('jsonwebtoken');
let jwtSecretKey = process.env.JWT_SECRET_KEY;



// Function for verifying JWT
const verifyJwt = (jwtToken, secret) => {
  return new Promise((resolve, reject) => {
      jwt.verify(jwtToken, secret, function(err, decoded) {
          if (err) {
              reject(err);
          } else {
              resolve(decoded);
          }
      });
  });
};

// Context object declaration
const contextObject = async ({ req }) => {
  if (req.body.query.match("login") || req.body.query.match("addUser") || req.body.query.match("Hello")) return {};
  if(req && req.headers && req.headers.authorization ===undefined){
    throw new ApolloError('Token not found.', '403');
  }
  const values = req.headers.authorization.split(' ');
  let verified = null;

  try {
      verified = await verifyJwt(values[1], jwtSecretKey);
  }
  catch (err) {
    throw new ApolloError('Authentication failed.', '403');
  }
  return {
      id: verified.id,
      permissions: verified.permissions,
      email:verified.email,
      roles:verified.roles
  };
}

// This function will create a new server Apollo Server instance
export const createApolloServer = async (options = { port: 4000 }) => {
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: contextObject
  });

  const serverInfo = await server.listen(options);
  if (process.env.NODE_ENV !== 'test') {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${options.port}${server.graphqlPath}`,
    );
  }

  // serverInfo is an object containing the server instance and the url the server is listening on
  return serverInfo;
};
