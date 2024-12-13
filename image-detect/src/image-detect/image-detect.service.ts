import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid'; // For unique filenames

@Injectable()
export class ImageService {
  constructor(private readonly httpService: HttpService) {}

  // Detect Safe Search and Labels for an Image
  async detectSafeSearch(base64Image: string): Promise<any> {
    const apiKey = ''; // Replace with your actual API key
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestPayload = {
      requests: [
        {
          image: { content: base64Image },
          features: [
            { type: 'SAFE_SEARCH_DETECTION' },
            { type: 'LABEL_DETECTION', maxResults: 10 },
          ],
        },
      ],
    };

    // List of restricted or harmful content labels
    const restrictedLabels = [
      'substance abuse',
      'violence',
      'sexual content',
      'drugs',
      'self-harm',
      'hate speech',
      'terrorism',
      'fraud',
      'abuse',
      'adult',
      'violence',
      'racy',
      'fear',
      'romance',
      'crime',
      'gore',
    ];

    try {
      // Send POST request to Google Vision API
      const response = await this.httpService
        .post(url, requestPayload)
        .toPromise();

      // Extract SafeSearch annotations and label descriptions
      const safeSearch = response.data.responses[0]?.safeSearchAnnotation;
      const labels = response.data.responses[0]?.labelAnnotations || [];

      // return { safeSearch, labels };
      // Check for restricted labels
      const detectedLabels = labels.map((label) =>
        label.description.toLowerCase(),
      );
      const detectedRestrictedWords = restrictedLabels.filter((word) =>
        detectedLabels.includes(word),
      );

      // If restricted content detected, throw an error
      if (detectedRestrictedWords.length > 0) {
        throw new Error(
          `Restricted content detected: ${detectedRestrictedWords.join(', ')}`,
        );
      }

      // Return the result if no restricted content detected
      return {
        safeSearch,
        labels,
        restrictedContent: false,
        message: 'No restricted content found in the image.',
      };
    } catch (error) {
      // Handle the error and return an appropriate message
      console.error('Error detecting image content:', error);
      return {
        safeSearch: null,
        labels: [],
        restrictedContent: true,
        message: error.message || 'Failed to detect image content.',
      };
    }
  }
}
