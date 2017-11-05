import * as firebase from 'firebase-admin'
import { resolve } from 'path'

export default async function uploadPhoto(photo: any): Promise<any>{
    // Upload photo to firebase
    const [ pic ] = await firebase
      .storage()
      .bucket('anypay-e40b4.appspot.com')
      .upload(photo.path)
      // .upload(resolve(__dirname, '../../image.jpg'))

    // Make photo available with out being signed in
    await pic.makePublic()

    // Get photo metadata
    const [metadata]: Array<any> = await pic.getMetadata()

    // Return mediaLink
    return {
      pic, 
      mediaLink: metadata.mediaLink
    }
}