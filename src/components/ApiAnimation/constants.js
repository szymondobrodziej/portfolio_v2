export const ANIMATION_STATES = {
  IDLE: 'idle',
  REQUESTING: 'requesting',
  PROCESSING: 'processing',
  RESPONDING: 'responding',
  ERROR: 'error',
};

export const REQUEST_TYPES = {
  GET: {
    name: 'GET',
    color: '#22c55e',
    duration: 2,
    description: 'Fetch data from server',
    shape: 'circle',
  },
  POST: {
    name: 'POST',
    color: '#3b82f6',
    duration: 2.5,
    description: 'Create new data',
    shape: 'square',
  },
  PUT: {
    name: 'PUT',
    color: '#f59e0b',
    duration: 2.2,
    description: 'Update existing data',
    shape: 'hexagon',
  },
  DELETE: {
    name: 'DELETE',
    color: '#ef4444',
    duration: 1.8,
    description: 'Remove data',
    shape: 'triangle',
  },
};

export const SERVER_STATUSES = {
  ONLINE: {
    name: 'online',
    color: '#22c55e',
    icon: '',
  },
  BUSY: {
    name: 'busy',
    color: '#f59e0b',
    icon: '',
  },
  ERROR: {
    name: 'error',
    color: '#ef4444',
    icon: '',
  },
};

export const PARTICLE_CONFIGS = {
  REQUEST: {
    particleCount: 8,
    size: 6,
    speed: 1,
  },
  RESPONSE: {
    particleCount: 12,
    size: 4,
    speed: 1.2,
  },
};

export const CODE_SNIPPETS = {
  REQUEST: {
    GET: `fetch('/api/data')
  .then(response => response.json())`,
    POST: `fetch('/api/data', {
  method: 'POST',
  body: JSON.stringify(data)
})`,
    PUT: `fetch('/api/data/1', {
  method: 'PUT',
  body: JSON.stringify(data)
})`,
    DELETE: `fetch('/api/data/1', {
  method: 'DELETE'
})`,
  },
  RESPONSE: {
    GET: `{
  "status": "success",
  "data": [...]
}`,
    POST: `{
  "status": "created",
  "id": "new_id"
}`,
    PUT: `{
  "status": "updated",
  "data": {...}
}`,
    DELETE: `{
  "status": "deleted"
}`,
  },
  ERROR: {
    400: `{
  "error": "Bad Request",
  "message": "Invalid data"
}`,
    401: `{
  "error": "Unauthorized",
  "message": "Please login"
}`,
    404: `{
  "error": "Not Found",
  "message": "Resource not found"
}`,
    500: `{
  "error": "Server Error",
  "message": "Internal error"
}`,
  },
};

export const ANIMATION_TIMINGS = {
  REQUEST: 2000,
  PROCESS: 1500,
  RESPONSE: 2000,
  ERROR: 2000,
  RESET: 1000,
};
