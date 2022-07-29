import dotenv from 'dotenv';
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
import { successMessage, errorMessage, updateRecord, getRecord, getListData } from '../utils'
/**
 * self created npm package checkRequiredMissingParam
 */
const { checkRequiredMissingParam } = require('param-validator-node');
import { accounts } from '../account'
import * as bcrypt from 'bcrypt';
import { userInfo } from 'os';
const jwt = require('jsonwebtoken');



export class UsersController {
  constructor() { }

  async uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  /**
   * 
   * @param args add user to fitness app
   * @param context 
   * @returns 
   */
  async addUser(args: any, context: any) {
    /**
     * param valiation
     */
    const checkRequiredParam = ['email', 'name', 'password', 'roles', 'phone', 'permissions'];
    const paramCheck = checkRequiredMissingParam(args, checkRequiredParam);
    if (paramCheck) {
      return errorMessage(paramCheck, null)

    }

    args.id = await this.uid()
    let encryptedPassword = await bcrypt.hash(args.password, 10);
    args.password = encryptedPassword;
    accounts.push(args)
    return successMessage('User created', null)
  }
  /**
   * 
   * @param args check login 
   * and generate token
   * @param context 
   * @returns 
   */
  async login(args: any, context: any) {
    const checkRequiredParam = ['email', 'password'];
    const paramCheck = checkRequiredMissingParam(args, checkRequiredParam);
    if (paramCheck) {
      return errorMessage(paramCheck, null)
    }
    let token = null;
    const { id, name, email, permissions, roles, password } = accounts.find(
      account => account.email === args.email
    );

    let comparePass = await bcrypt.compare(args.password, password);

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (accounts && comparePass) {
      token = jwt.sign(
        { id, permissions, roles, name, email },
        jwtSecretKey,
        {
          expiresIn: "20d"
        }
      );
      return successMessage("Success", { token })
    }
    return errorMessage(paramCheck, null)
  }

  async getUserByType(args: any, context: any) {
    const checkRequiredParam = ['type'];
    const paramCheck = checkRequiredMissingParam(args, checkRequiredParam);
    if (paramCheck) {
      return errorMessage(paramCheck, null)
    }
    let userList=[]
  for (const i of accounts) {
    if(i.roles[0] ==args.type){
    
      userList.push(i)
      
    }
  }

  return {
    status:{
      code:1000,
      header:'Success',
      description:"data fetch"
    },
    data:userList
  }

  }
}


