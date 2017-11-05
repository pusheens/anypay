import * as firebase from 'firebase-admin'

export default async function uploadPhoto(photo: any): Promise<any>{
    // Upload photo to firebase
    const [pic] = await firebase
    .storage()
    .bucket('anypay-e40b4.appspot.com')
    .upload(photo.path)

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