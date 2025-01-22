import dataUriParser from 'datauri/parser.js'
import path from 'path'

const getUri = (file) => {
    try {
        const parser = new dataUriParser();
        const extName = path.extname(file.originalname).toString();
        
        // Handle PDFs specifically
        if (file.mimetype === 'application/pdf') {
            // Ensure proper MIME type is set for PDFs
            return {
                content: `data:application/pdf;base64,${file.buffer.toString('base64')}`
            };
        }
        
        // Handle other file types as before
        return parser.format(extName, file.buffer);
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error for better error handling
    }   
}

export default getUri;