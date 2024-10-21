import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';
const supaUrl = 'https://pqeadumrvefdcegjrcbe.supabase.co';
const bucket = 'test';
const supabase = createClient(
	supaUrl,
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZWFkdW1ydmVmZGNlZ2pyY2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1OTcyNjQsImV4cCI6MjA0NDE3MzI2NH0.mBGU8tphADn3fYt8Bbb5YwDzIzsqPCNlBWv0XMzqYjM'
);

export async function upload(uploadData: {
	type: string | null;
	data: ArrayBuffer | null;
	folder: string | null;
}) {
	const type = uploadData.type;
	const udata = uploadData.data;
	const folder = uploadData.folder;

	if (!type || !udata || !folder) return null;

	const { data, error } = await supabase
		.storage
		.from(bucket)
		.upload(`${folder}/${uuid()}`, udata, {
			cacheControl: '3600',
			contentType: type,
			upsert: false
		});

	if (error) {
		console.log(error);
		return null;
	} else {
		return getURL(data.path);
	}
}

export async function clearUpload(url: string) {
	const path: string = getPath(url);
	const { data, error } = await supabase
		.storage
		.from(bucket)
		.remove([path]);

	if (error) {
		console.log(error);
	}
}

function getURL(path: string) {
	const { data } = supabase
		.storage
		.from(bucket)
		.getPublicUrl(path);

	return data.publicUrl ?? null;
}

function getPath(url: string) {
	const separator: string = supaUrl + '/storage/v1/object/public/test/';
	const path: string[] = url.split(separator);
	return path[1];
}
