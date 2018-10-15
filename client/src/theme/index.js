import moment from 'moment';

export const theme = {
    white: '#fff',
    linkWater: '#DCE4F7',
    threshold: '#9AA1B3',
    critical: '#FF723F',
    ok: '#93E388',
    warning: '#FF86CA',
    default: '#495060'
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

export * from './assets';
