export default window.location.href.indexOf('localhost') > -1
  ? 'http://localhost:8080'
  : 'https://us-central1-anypay-e40b4.cloudfunctions.net/app'