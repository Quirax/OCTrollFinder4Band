export const timestamp = () => new Date().getTime();

export const bandNo = () => location.pathname.split('/')[2];
