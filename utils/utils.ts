import fs from 'fs';
import path from 'path';

// Function to delete the image file(s) if it exists
export function deleteImageIfExists(directoryPath: string, extension: string): void {
    try {
        // Read the directory and get all file names
        const files = fs.readdirSync(directoryPath);

        // Filter out files that end with the specified extension
        const imageFiles = files.filter(file => file.endsWith(extension));

        // Loop through each image file and delete it
        imageFiles.forEach(file => {
            const imagePath = path.join(directoryPath, file);
            try {
                fs.unlinkSync(imagePath);  // Delete the file
                console.log(`Deleted image at: ${imagePath}`);
            } catch (err) {
                console.error(`Error deleting image at ${imagePath}: ${err.message}`);
            }
        });

        if (imageFiles.length === 0) {
            console.log(`No images found at ${directoryPath} with extension ${extension}`);
        }
    } catch (err) {
        console.error(`Error reading directory at ${directoryPath}: ${err.message}`);
    }
}
