import { Injectable, EventEmitter } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from './../../../../environments/environment';
import * as AWS from 'aws-sdk/global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // public filePath: EventEmitter<string> = new EventEmitter();

  uploadFile(file): Promise<any> {
    AWS.config.update({ accessKeyId: environment.ACCESS_ID, secretAccessKey: environment.ACCESS_KEY, region: environment.REGION });

    const contentType = file.type;
    const bucket = new AWS.S3({ params: { Bucket: environment.BUCKET } });

    const params = {
      // Bucket: environment.BUCKET,
      Key: 'philip/' + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    return new Promise((res, rej) => {
      bucket.upload(params, function (err, data) {
        if (err) {
          rej(err);
        }
        res(data.Location);
      });
    })
  }

}
