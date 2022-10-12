import { AxiosResponse } from 'axios';

import { $apiFile } from '.';

export async function uploadImage(data: FormData): Promise<AxiosResponse<string[]>> {
    return await $apiFile.post('/upload/image', data);
}