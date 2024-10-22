import {
	BlobServiceClient,
	ContainerSASPermissions,
	StorageSharedKeyCredential
} from '@azure/storage-blob';
import type { LayoutServerLoad } from './$types';
import { azure_key } from '$env/static/private';

const account = 'levirphotography';
const accountKey = azure_key;
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

export const load = (async () => {
	// generate a SAS token for the blob
	const blobServiceClient = new BlobServiceClient(
		`https://${account}.blob.core.windows.net`,
		sharedKeyCredential
	);
	const containerClient = blobServiceClient.getContainerClient('images');
	const sasURL = await containerClient.generateSasUrl({
		permissions: ContainerSASPermissions.parse('r'),
		expiresOn: new Date(new Date().valueOf() + 86400)
	});
	const [url, token] = sasURL.split('?');

	return { url, token };
}) satisfies LayoutServerLoad;
