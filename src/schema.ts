// import 'graphql-import-node';

import { makeExecutableSchema } from '@graphql-tools/schema'
import {typeDefs} from './schemas/schema';
import { resolvers } from './resolvers'



export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
