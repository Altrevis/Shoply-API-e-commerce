// import axios from 'axios';

// const ONE_SIGNAL_URL = 'https://onesignal.com/api/v1/notifications';

// export async function sendNotification({ headings, contents, include_player_ids }) {

//   if (process.env.ONESIGNAL_APP_ID === 'fake_app_id') {
//     console.log('💡 Mode test - Notification simulée :');
//     console.log({ headings, contents, include_player_ids });
//     return { simulated: true };
//   }

//   try {
//     const body = {
//       app_id: process.env.ONESIGNAL_APP_ID,
//       headings,       // { "en": "Title" }
//       contents,       // { "en": "Message text" }
//       include_player_ids, // tableau des IDs OneSignal des utilisateurs à notifier
//     };

//     const response = await axios.post(ONE_SIGNAL_URL, body, {
//       headers: {
//         Authorization: `Basic ${process.env.ONESIGNAL_REST_KEY}`,
//         'Content-Type': 'application/json',
        
//       },
//     });

//     console.log('Notification envoyée:', response.data.id);
//     return response.data;

//   } catch (error) {
//     console.error('Erreur OneSignal:', error.response?.data || error.message);
//     throw error;
//   }
// }

import axios from 'axios';

export async function sendNotification({ headings, contents, include_player_ids }) {
  // Si aucune vraie clé n'est présente, on simule l'envoi de la notification
  if (!process.env.ONESIGNAL_APP_ID || !process.env.ONESIGNAL_REST_KEY) {
    console.log('💡 Notification simulée :', { headings, contents, include_player_ids });
    return { simulated: true };
  }

  // Sinon, envoi réel de la notification
  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', {
      app_id: process.env.ONESIGNAL_APP_ID,
      headings,
      contents,
      include_player_ids,
    }, {
      headers: {
        Authorization: `Basic ${process.env.ONESIGNAL_REST_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err) {
    console.error('Erreur OneSignal :', err.response?.data || err.message);
    throw err;
  }
}
