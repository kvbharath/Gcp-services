import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid'; // For unique filenames
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class ImageService {
  constructor(private readonly httpService: HttpService) {}

  // Method to call Google Cloud Vision API for Safe Search detection
  async detectSafeSearch(base64Image: string): Promise<any> {
    const apiKey = ''; // Replace with your actual API key
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestPayload = {
      requests: [
        {
          image: { content: base64Image }, // Pass Base64 directly
          features: [
            {
              type: 'SAFE_SEARCH_DETECTION',
            },
          ],
        },
      ],
    };

    try {
      // Send POST request to Google Vision API
      const response = await this.httpService
        .post(url, requestPayload)
        .toPromise();

      const safeSearch = response.data.responses[0]?.safeSearchAnnotation;

      if (!safeSearch) {
        return { valid: false, message: 'Unable to detect content.' };
      }

      // Check if the image contains inappropriate content
      if (
        safeSearch.adult === 'LIKELY' ||
        safeSearch.adult === 'VERY_LIKELY' ||
        safeSearch.violence === 'LIKELY' ||
        safeSearch.violence === 'VERY_LIKELY' ||
        safeSearch.racy === 'LIKELY' ||
        safeSearch.racy === 'VERY_LIKELY'
      ) {
        return {
          valid: false,
          message: 'Invalid content detected in the image.',
        };
      }

      // Image is safe, store it locally
      const imageUrl = await this.uploadImageLocally(base64Image);
      return {
        valid: true,
        message: 'Content is safe.',
        imageUrl, // Return the URL of the locally uploaded image
      };
    } catch (error) {
      console.error('Error detecting image content:', error);
      return {
        valid: false,
        message: 'Failed to detect image content.',
      };
    }
  }

  // Method to upload image locally
  private async uploadImageLocally(base64Image: string): Promise<string> {
    const buffer = Buffer.from(base64Image, 'base64');
    const fileName = `${uuidv4()}.jpg`; // Generate a unique filename
    const uploadDirectory = path.join(__dirname, '..', 'uploads'); // Set upload directory

    try {
      // Ensure upload directory exists
      await fs.mkdir(uploadDirectory, { recursive: true });

      // Save the image file locally
      const filePath = path.join(uploadDirectory, fileName);
      await fs.writeFile(filePath, buffer);

      // Return the local URL of the file (you can use it as the relative path)
      return filePath;
    } catch (error) {
      console.error('Error saving image locally:', error);
      throw new Error('Failed to save the image locally.');
    }
  }
}
