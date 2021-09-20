var iconPaths = [
    '/badges/1.png',
    '/badges/2.png',
    '/badges/3.png',
    '/badges/4.png'
];


module.exports.getBadgeIcon = (points) => {
    if (points <= 1000)
        return iconPaths[0];
    else if (points <= 2000)
        return iconPaths[1];
    else if (points <= 3000)
        return iconPaths[2];
    else
        return iconPaths[3];

};