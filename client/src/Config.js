let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'restart.sensidev.com') {
    backendHost = 'https://restart.sensidev.com/ws';
} else {
    backendHost = 'http://localhost:8000';
}

export const API_ROOT = `${backendHost}`;