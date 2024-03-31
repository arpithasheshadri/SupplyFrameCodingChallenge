const fetchMock = require('jest-fetch-mock');
const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('./views/login.ejs', 'utf8');
const { document } = new JSDOM(html).window;

const { TextEncoder, TextDecoder } = require('text-encoding');
const { TextEncoderStream, TextDecoderStream } = require('text-encoding/lib/encoding');

const dom = new JSDOM('', { pretendToBeVisual: true });
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.TextEncoderStream = TextEncoderStream;
global.TextDecoderStream = TextDecoderStream;

global.fetch = fetchMock;

const loginScript = fs.readFileSync('./login.js', 'utf8');
eval(loginScript);

describe('Login Form', () => {
  beforeEach(() => {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error').innerHTML = '';
    fetch.resetMocks();
  });

  test('Submitting valid credentials should redirect to home page', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'valid_token' }));

    document.getElementById('email').value = 'test@example.com';
    document.getElementById('password').value = 'password';

    document.getElementById('loginForm').dispatchEvent(new Event('submit'));

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetch).toHaveBeenCalledWith('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'test@example.com', currentPassword: 'password' })
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'valid_token');
    expect(window.location.href).toBe('/');
  });

  test('Submitting invalid credentials should display error message', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });

    document.getElementById('email').value = 'test@example.com';
    document.getElementById('password').value = 'invalid_password';

    document.getElementById('loginForm').dispatchEvent(new Event('submit'));

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(fetch).toHaveBeenCalledWith('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'test@example.com', currentPassword: 'invalid_password' })
    });

    expect(document.getElementById('error').textContent).toBe('Invalid credentials');
  });
});
