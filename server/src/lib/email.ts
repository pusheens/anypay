import * as SendGrid from 'sendgrid'
import { v4 as uuid } from 'uuid'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const sg = SendGrid(require('../../key-sendgrid.json').key);

const template = readFileSync(resolve(__dirname, '../templates/email.html')).toString()

export default class {
  static async sendConfirmation(email: string) {
    const code = uuid()

    await sg.API(sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: [{ email }],
            subject: 'Confirm your anypay account'
          }
        ],
        from: { email: 'anypay@pusheens.github.io' },
        content: [
          {
            type: 'text/html',
            value: template.replace(
              /LINK/g,
              `http://localhost:3000/confirm?code=${code}`
            )
          }
        ]
      }
    }))

    return code
  }
}