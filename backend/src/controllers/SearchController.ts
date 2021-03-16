import {
  Request,
  Response,
  // NextFunction
} from 'express';
import {
  SearchIndexClient,
  SearchClient,
  AzureKeyCredential,
} from '@azure/search-documents';

// typescript examples
// https://docs.microsoft.com/en-us/azure/search/samples-javascript
// https://docs.microsoft.com/en-us/azure/search/samples-javascript

// Getting endpoint and apiKey from .env file + index name from azure
const endpoint = process.env.SEARCH_API_ENDPOINT || '';
const apiKey = process.env.SEARCH_API_KEY || '';
const indexName = 'katalogbuku-index';

// POST /search
export const postSearch = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    // jika env tidak terbaca
    if (!endpoint || !apiKey) {
      res.status(500);
      res.json({
        success: false,
        msg:
          'Make sure to set valid values for endpoint and apiKey with proper authorization.',
      });
      return;
    }

    const { text } = req.body;
    const indexClient = new SearchIndexClient(
      endpoint,
      new AzureKeyCredential(apiKey)
    );

    // get already made index
    const index = await indexClient.getIndex(indexName);
    console.log(`Index Name: ${index.name}`);
    console.log(`Index CORS Options: ${index.corsOptions}`);

    // Creating a search client to upload documents and issue queries
    const searchClient = indexClient.getSearchClient(indexName);

    // queries to cognitive search
    const searchResults = [];
    const results = await sendQueries(text, searchClient);

    for await (const result of results) {
      searchResults.push(result.document);
    }

    res.status(200);
    res.json({ success: true, searchResults });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  }
};

async function sendQueries(text: string, searchClient: SearchClient<unknown>) {
  const searchResults = await searchClient.search(text, {
    includeTotalCount: true,
    // select: ['HotelId', 'HotelName', 'Rating'],
  });

  // for await (const result of searchResults.results) {
  //   console.log(`${JSON.stringify(result.document)}`);
  // }

  return searchResults.results;
}
