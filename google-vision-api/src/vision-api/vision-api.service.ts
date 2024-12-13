import { Injectable } from '@nestjs/common';
import * as vision from '@google-cloud/vision';
import * as dotenv from 'dotenv';
import { isValidLabel } from 'src/utils/label.utils';
dotenv.config();

@Injectable()
export class VisionService {
  private client: vision.v1.ImageAnnotatorClient;

  constructor() {
    const googleCredentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    };

    // Initialize the Google Vision API client
    this.client = new vision.v1.ImageAnnotatorClient({
      credentials: googleCredentials,
    });
  }

  async detectText(imagePath: string): Promise<string[]> {
    try {
      const [result] = await this.client.textDetection(imagePath);
      const detections = result.textAnnotations || [];
      return detections.map((text) => text.description);
    } catch (error) {
      console.error('Error during text detection:', error);
      throw new Error('Failed to detect text.');
    }
  }

  //   async detectLabels(imagePath: string): Promise<string[]> {
  //     try {
  //       const [result] = await this.client.labelDetection(imagePath);
  //       const labels = result.labelAnnotations || [];
  //       return labels.map((label) => label.description);
  //     } catch (error) {
  //       console.log(/er/, error);

  //       console.error('Error during label detection:', error);
  //       throw new Error('Failed to detect labels.');
  //     }
  //   }
  async detectLabels(imagePath: string): Promise<string[]> {
    try {
      // Perform label detection on the image
      const [result] = await this.client.labelDetection(imagePath);
      const labels = result.labelAnnotations || [];

      // Map the labels and filter out invalid ones using isValidLabel function
      const validLabels = labels.map((label) => label.description);
      // .filter((label) => isValidLabel(label)); // Only keep valid labels

      return validLabels; // Return only valid labels
    } catch (error) {
      console.error('Error during label detection:', error);
      throw new Error('Failed to detect labels.');
    }
  }

  async detectObjects(imagePath: string): Promise<string[]> {
    try {
      const [result] = await this.client.objectLocalization(imagePath);
      const objects = result.localizedObjectAnnotations || [];
      return objects.map((object) => object.name);
    } catch (error) {
      console.error('Error during object localization:', error);
      throw new Error('Failed to detect objects.');
    }
  }

  // Function to detect safe search categories in the image
  async detectSafeSearch(imagePath: string): Promise<string[]> {
    const [result] = await this.client.safeSearchDetection(imagePath);

    const safeSearch = result.safeSearchAnnotation;

    const detectedLabels: string[] = [];

    if (safeSearch.adult === 'LIKELY' || safeSearch.adult === 'VERY_LIKELY') {
      detectedLabels.push('explicit');
    }
    if (
      safeSearch.violence === 'LIKELY' ||
      safeSearch.violence === 'VERY_LIKELY'
    ) {
      detectedLabels.push('violence');
    }
    if (safeSearch.racy === 'LIKELY' || safeSearch.racy === 'VERY_LIKELY') {
      detectedLabels.push('racy');
    }
    if (safeSearch.spoof === 'LIKELY' || safeSearch.spoof === 'VERY_LIKELY') {
      detectedLabels.push('spoof');
    }

    return detectedLabels;
  }

  // Custom function to check if any invalid label is detected
  isValidLabel(label: string): boolean {
    const invalidLabels = [
      'adult',
      'nudity',
      'pornography',
      'violence',
      'gore',
      'racy',
      'drugs',
      'alcohol',
      'weapons',
      'hate',
      'racism',
      'offensive',
      'explicit',
    ];
    return invalidLabels.includes(label.toLowerCase());
  }

  // Function to check the image for invalid labels
  async checkImageForInvalidLabels(imagePath: string): Promise<boolean> {
    const detectedLabels = await this.detectSafeSearch(imagePath);

    if (detectedLabels.length > 0) {
      for (const label of detectedLabels) {
        if (this.isValidLabel(label)) {
          return true; // Invalid label detected
        }
      }
    }

    return false; // No invalid labels detected
  }
}
