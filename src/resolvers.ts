
// import { ApolloServer, gql } from 'apollo-server';
// import {jwt} from  'jsonwebtoken'
// import { account } from './account'
import { UsersController } from './controllers/users.controller'
import { FitnessClassController } from './controllers/fitness.controller'
const usersController = new UsersController();
const fitnessClassController = new FitnessClassController();

export const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
    getList: (parent, args, context, info) => {
      return fitnessClassController.getList(args, context);
    },
    getUserList: (parent, args, context, info) => {
      return usersController.getUserByType(args, context);
    }
    
  },
  Mutation: {
    addUser: (parent, args, context, info) => {
      return usersController.addUser(args, context);
    },
    login: (parent, args, context, info) => {
      return usersController.login(args, context);
    },
    addClass: (parent, args, context, info) => {
      return fitnessClassController.addClass(args, context);
    },
    updateClass: (parent, args, context, info) => {
      return fitnessClassController.updateClass(args, context);
    },
    deleteClass:(parent, args, context, info) => {
      return fitnessClassController.deleteClass(args, context);
    }
    
  }
};
