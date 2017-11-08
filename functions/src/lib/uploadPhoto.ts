import { resolve } from 'path'
import * as firebase from 'firebase-admin'

export default async function uploadPhoto(path: string) {
    // Upload photo to firebase
    const [ photo ] = await firebase
      .storage()
      .bucket('anypay-e40b4.appspot.com')
      .upload(path)

    // Make photo available with out being signed in
    await photo.makePublic()

    // Get photo metadata
    const [metadata]: Array<any> = await photo.getMetadata()

    // Return mediaLink
    return { photo, link: metadata.mediaLink }
}