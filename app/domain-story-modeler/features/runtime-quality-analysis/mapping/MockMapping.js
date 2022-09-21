export const MockMapping = {
    BOUNDED_CONTEXTS: [
        'arthouse-cinema/reservation',
        'arthouse-cinema/payment',
        'arthouse-cinema/movies'
    ],
    AVAILABLE_SERVICES: [
        'movies',
        'rooms',
        'personell',
        'payment',
        'reservation'
    ],
    AVAILABLE_SERVICE_ENDPOINTS: [
        'api/arthouse-cinema/movies',
        'api/arthouse-cinema/rooms',
        'api/arthouse-cinema/personell',
        'api/arthouse-cinema/payment',
        'api/arthouse-cinema/reservation'
    ],
    ALLOWED_HTTP_METHODS: [
        {
            MOVIES: ['POST', 'GET', 'DELETE']
        },
        {
            ROOMS: ['GET']
        },
        {
            PERSONELL: ['GET', 'UPDATE', 'DELETE']
        }, 
        {
            PAYMENT: ['POST']
        }
    ]
}