import { accounts } from "../account";
import { fitness } from "../fitness"
import { successMessage, errorMessage, updateRecord, getRecord, getListData } from '../utils'
const { checkRequiredMissingParam } = require('param-validator-node');


export class FitnessClassController {
  constructor() { }
  async uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  async addClass(args, context) {
    const checkRequiredParam = ['class', 'batchStartTime', 'trainer', 'memeber'];
    const paramCheck = checkRequiredMissingParam(args, checkRequiredParam);
    if (paramCheck) {
      return errorMessage(paramCheck, null);
    }
    console.log(context)
    /***
     * checking for admin roles
     */
    if (context.roles.includes('admin')) {
      args.id = await this.uid()
      fitness.push(args)
      return successMessage('Class Created', null)
    }
    else {
      return errorMessage('You have not admin rights to create class', null);
    }
  }
  /**
   * update records
   */
  async updateClass(args, context) {
    const checkRequiredParam = ['id', 'class', 'batchStartTime', 'trainer', 'memeber'];
    const paramCheck = checkRequiredMissingParam(args, checkRequiredParam);
    if (paramCheck) {
      return errorMessage(paramCheck, null);
    }
    /**
    * record checking in exist member and trainer in 
    * the record
    */
    let record = false;
    console.log(context)
    if (context.roles.includes('admin') ) {
      record = await updateRecord(fitness, args, accounts);
    }
    else{
      return errorMessage('You have not admin rights to create class', null);
    }

    if (record) {
      return errorMessage('Class failed to update record', null);
    }
    return successMessage('Class updated', null)

  }
  /**
   * 
   * @param args get class list and member list and trainer list
   * @param context 
   * @returns 
   */
  async getList(args: any, context: any) {
    let data = await getRecord(fitness, args, accounts);
    return getListData('Class record fetch', data)
  }
  /**
   * 
   * @param args function for deleted records
   * @param context 
   * @returns 
   */
  async deleteClass(args, context) {
    const checkRequiredParam = ['id'];
    const paramCheck = checkRequiredMissingParam(args, checkRequiredParam);
    if (paramCheck) {
      return errorMessage(paramCheck, null);
    }
    /**used splice to remove record */
    for (var i = 0; i < fitness.length; i++) {
   
      if (fitness[i].id == args.id) {
        fitness.splice(i, 1);
      }
    }
    return successMessage('Class deleted', null)
  }
}
