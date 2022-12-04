import AWS from 'aws-sdk'
import { lookup } from 'mime-types'

import * as dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

export type SignedUrlParams = {
    uploadUrl: string
}

const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
})

export const getSignedUrl = (key: string, path: string): SignedUrlParams => {
    const fileType: string = lookup(key) as string
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: path,
        Expires: 2 * 60,
        ContentType: fileType,
    }
    const uploadUrl: string = S3.getSignedUrl('putObject', params)
    return {
        uploadUrl,
    }
}