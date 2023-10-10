export const getImageFromBase64 = (image) => {
    const decodedData = atob(image);
    const uint8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; i++) {
        uint8Array[i] = decodedData.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    return url;
}