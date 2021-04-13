// // Require google from googleapis package.
// const { google } = require('googleapis')

// // Require oAuth2 from our google instance.
// const { OAuth2 } = google.auth

// // Create a new instance of oAuth and set our Client ID & Client Secret.
// const oAuth2Client = new OAuth2(
//   '556707753061-t2dgqkrlp744fcgno2pt350v8ajf7vv0.apps.googleusercontent.com',
//   'wqxQ7ODlefLmRdQuu-cbj263'
// )

// // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
// oAuth2Client.setCredentials({
//   refresh_token: '1//04wHRrfF6hFbRCgYIARAAGAQSNwF-L9IrIDN5MmVcMlyX6H64WaPzklRaSWgAtNn7iAa57dgXr0HqZoHb2efx8geeef5d4a2nbeM',
// })

// // Create a new calender instance.
// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
  
import React from 'react';
import { render } from 'react-dom';
import Sample from './Sample';

render(<Sample />, document.getElementById('react-root'));