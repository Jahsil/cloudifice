import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default defineNuxtPlugin((_nuxtApp) => {
  const { showToast } = useToast();

  const { $axiosTest } = useNuxtApp();
  window.Pusher = Pusher;
  const token = ref('');

  const auth_token = useCookie('auth_token', {
    secure: false, // Ensures it only works on HTTPS
    httpOnly: false, // Since we need JavaScript access
    sameSite: 'lax',
  });
  token.value = decodeURIComponent(auth_token.value);
  console.log('🚀 ~ defineNuxtPlugin ~ token.value:', auth_token.value);

  const config = useRuntimeConfig();

  const echo = new Echo({
    broadcaster: 'reverb',
    key: config.public.REVERB_APP_KEY,
    wsHost: config.public.REVERB_HOST,
    wsPort: config.public.REVERB_PORT ?? 80,
    wssPort: config.public.REVERB_PORT ?? 443,
    forceTLS: (config.public.REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    // wsPath: "/reverb",
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          $axiosTest
            .post(
              '/api/broadcasting/auth',
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                // headers: {
                //   Authorization: `Bearer ${token.value}`,
                // },
              },
            )
            .then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    },
  });

  window.Echo = echo;
  let isConnected = false;

  let timeout = setTimeout(() => {
    if (!isConnected) {
      console.warn('Failed to connect to WebSocket server within 5 seconds.');
      showToast('WebSocket disconnected', 'error', 5000);
    }
  }, 5000);

  clearTimeout(timeout);

  echo.connector.pusher.connection.bind('connected', () => {
    isConnected = true;

    console.log('Connected to WebSocket server');
    showToast('WebSocket connection successful', 'success', 5000);
  });

  echo.connector.pusher.connection.bind('error', (err) => {
    console.error('WebSocket error:', err);
    showToast('WebSocket error', 'error', 5000);
  });
  echo.connector.pusher.connection.bind('unavailable', () => {
    console.error('WebSocket unavailable. Could not connect.');
    showToast('WebSocket unavailable. Could not connect.', 'error', 5000);
  });

  echo.connector.pusher.connection.bind('state_change', (states) => {
    console.log(
      'Connection state changed from',
      states.previous,
      'to',
      states.current,
    );
    // showToast(
    //   `Web socket connection state changed from ${states.previous} to ${states.current}`,
    //   'info',
    //   5000,
    // );
  });

  // echo.private(`chat.1`).listen('MessageSent', (event) => {
  //   console.log('New message received:', event);
  // });

  return {
    provide: { echo },
  };
});
