// A helper method used to read a Node.js readable stream into a Buffer
export async function streamToBuffer(
  readableStream: NodeJS.ReadableStream
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    readableStream.on('data', (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });

    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    readableStream.on('error', reject);
  });
}
