import { Translate } from '@google-cloud/translate/build/src/v2';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class GoogleTranslateService {
  private translate: Translate;
  private googleCred = {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
  };

  constructor() {
    this.translate = new Translate({
      credentials: this.googleCred,
      projectId: this.googleCred?.project_id,
    });
  }

  async translateText(text: string, language: string): Promise<string> {
    try {
      if (text) {
        const [response] = await this.translate.translate(text, language);
        return response;
      }
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong while translating the text!..',
      );
    }
  }
}
