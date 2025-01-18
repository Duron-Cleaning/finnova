import OpenAI from 'openai';

class DalleService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY // Asegúrate de configurar esta variable de entorno
        });
    }

    async generateImage(prompt, size = '1024x1024') {
        try {
            const response = await this.openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: size,
            });

            return response.data[0].url;
        } catch (error) {
            console.error('Error generando imagen:', error);
            throw error;
        }
    }
}

export default new DalleService();
