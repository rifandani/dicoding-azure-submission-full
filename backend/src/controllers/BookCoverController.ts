import {
  Request,
  Response,
  // NextFunction
} from 'express';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobDownloadResponseModel,
} from '@azure/storage-blob';

import { streamToBuffer } from '../utils/streamToBuffer';

// POST /books/cover
export const postBookCover = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const file = req.file; // multipart/form-data file

    // Enter your storage account name and shared key
    const account = process.env.ACCOUNT_NAME || '';
    const accountKey = process.env.ACCOUNT_KEY || '';

    // Use StorageSharedKeyCredential with storage account name and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey
    );

    // ONLY AVAILABLE IN NODE.JS RUNTIME
    // If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any other feasible implementation of TokenCredential.
    // DefaultAzureCredential will first look for Azure Active Directory (AAD)
    // client secret credentials in the following environment variables:
    //
    // - AZURE_TENANT_ID: The ID of your AAD tenant
    // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
    // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
    //
    // If those environment variables aren't found and your application is deployed
    // to an Azure VM or App Service instance, the managed service identity endpoint
    // will be used as a fallback authentication source.
    // const defaultAzureCredential = new DefaultAzureCredential();

    // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
    // to use client secrets, certificates, or managed identities for authentication.

    // Use AnonymousCredential when url already includes a SAS signature
    // const anonymousCredential = new AnonymousCredential();

    // ------------------- List containers -------------------
    const blobServiceClient = new BlobServiceClient(
      // When using AnonymousCredential, following url should include a valid SAS or support public access
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential
    );

    let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }

    // ------------------- Create a container -------------------
    const containerName = 'image-uploads-container';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // const createContainerResponse = await containerClient.create({
    //   access: 'blob'
    // }); // blob file URL can be accessed publicly
    // console.log(
    //   `Create container ${containerName} successfully`,
    //   createContainerResponse.requestId
    // );

    // ------------------- Create a blob -------------------
    const blobName = file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadData(file.buffer);
    console.log(`Upload ${blobName} success: ${uploadBlobResponse.requestId}`);

    // ------------------- List blobs -------------------
    for await (const blob of containerClient.listBlobsFlat()) {
      // if there is a same name blob
      if (blob.name === file.originalname) {
        res.status(400);
        res.json({
          success: false,
          msg:
            'There is already a file with the same name as that. Make sure your filename is unique.',
        });
        return;
      }
    }

    // ------------------- Get blob content from position 0 to the end -------------------
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    // const downloadBlockBlobResponse: BlobDownloadResponseModel = await blockBlobClient.download(
    //   0
    // );
    // const downloadedBlobBuffer = await streamToBuffer(
    //   downloadBlockBlobResponse.readableStreamBody!
    // );

    // ------------------- Delete container -------------------
    // await containerClient.delete();
    // console.log('deleted container');

    res.status(201);
    res.json({
      success: true,
      coverURL: `https://${account}.blob.core.windows.net/${containerName}/${file.originalname}`,
    });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  }
};

// PUT /books/cover
export const putBookCover = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const file = req.file; // multipart/form-data file

    // Enter your storage account name and shared key
    const account = process.env.ACCOUNT_NAME || '';
    const accountKey = process.env.ACCOUNT_KEY || '';

    // Use StorageSharedKeyCredential with storage account name and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey
    );

    // ------------------- List containers -------------------
    const blobServiceClient = new BlobServiceClient(
      // When using AnonymousCredential, following url should include a valid SAS or support public access
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential
    );

    // ------------------- Container -------------------
    const containerName = 'image-uploads-container';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // ------------------- List blobs -------------------
    for await (const blob of containerClient.listBlobsFlat()) {
      // if there is a same name blob
      if (blob.name === file.originalname) {
        res.status(400);
        res.json({
          success: false,
          msg:
            'There is already a file with the same name as that. Make sure your filename is unique.',
        });
        return;
      }
    }

    res.status(201);
    res.json({ success: true, file, coverURL: '' });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  }
};
