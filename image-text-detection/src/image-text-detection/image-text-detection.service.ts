import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ImageTextDetectionService {
  constructor(private readonly httpService: HttpService) {}

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

    // List of restricted or bad words
    const restrictedLabels = [
      'cigarette',
      'smoke',
      'vape',
      'drug',
      'alcohol',
      'marijuana',
      'cannabis',
      'weapon',
      'gun',
      'knife',
      'blood',
      'nude',
      'gambling',
      'casino',
      'toxins',
      'explosives',
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

      return {
        safeSearch,
        labels,
        restrictedContent: detectedRestrictedWords.length > 0,
        restrictedWords: detectedRestrictedWords,
        message:
          detectedRestrictedWords.length > 0
            ? 'Restricted content detected in the image.'
            : 'No restricted content found in the image.',
      };
    } catch (error) {
      console.error('Error detecting image content:', error);
      return {
        safeSearch: null,
        labels: [],
        restrictedContent: false,
        message: 'Failed to detect image content.',
      };
    }
  }
}
