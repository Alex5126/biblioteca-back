export function loadSettings(){
    process.env.SEED = 'librarytoken';
    process.env.CADUCIDAD_TOKEN_ADM = '' + (1000 * 60 * 60 * 24);
}