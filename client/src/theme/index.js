import moment from 'moment';

export const theme = {
    white: '#fff',
    gallery: '#eee',
    silverChalice: '#aaa',
    boulder: '#777',
    emperor: '#555',
    // Card colors
    temp: '#fd6d40',
    hum: '#52d728',
    default: '#1d348c'
};

moment.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s',
        s: '%ds',
        ss: '%ds',
        m: '%dm',
        mm: '%dm',
        h: '%dh',
        hh: '%dh',
        d: '%dd',
        dd: '%dd',
        M: '%dm',
        MM: '%dm',
        y: '%dy',
        yy: '%dy'
    }
});
