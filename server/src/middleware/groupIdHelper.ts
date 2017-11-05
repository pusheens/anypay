import * as firebase from 'firebase-admin'

export default class groupIdHelper {

  static async getGroupId(): Promise<string> {
    // Get groupId from firebase
    return await firebase
    .database()
    .ref('groupId')
    .once('value')
    .then(ref => ref.val())
  }
  
  static async setGroupId(newGroupId: string) {
    // Set firebase groupId to newGroupId
    await firebase
    .database()
    .ref('groupId')
    .set(newGroupId)
  }
}


