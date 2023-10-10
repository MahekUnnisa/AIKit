import axios from 'axios';

export const getImageHash = async (prompt, id) => {
    const rapidApiKey = import.meta.env.VITE_RAPID_API_IMAGE_KEY
    const imageApiBaseUrl = import.meta.env.VITE_RAPID_API_IMAGE_BASE_URL

    const headers = {
        'X-RapidAPI-Key': rapidApiKey,
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'arimagesynthesizer.p.rapidapi.com'
    };

    const data = {
        prompt: prompt,
        id: id,
    };

    const options = {
        method: 'POST',
        url: `${imageApiBaseUrl}generate`,
        headers: headers,
        data: data,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}