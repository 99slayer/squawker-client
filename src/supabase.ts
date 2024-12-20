import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';

const bucket = 'test';
const supaurl = import.meta.env.VITE_SUPA_URL;
const key = import.meta.env.VITE_SUPA_PUBLIC_KEY;
const supabase = createClient(supaurl, key);

export async function supaLogin() {
	await supabase.auth.signInAnonymously();
}

export async function supaLogout() {
	await supabase.auth.signOut();
}

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
		return null;
	} else {
		return getURL(data.path);
	}
}

export async function clearUpload(url: string) {
	const path: string = getPath(url);
	await supabase
		.storage
		.from(bucket)
		.remove([path]);
}

function getURL(path: string) {
	const { data } = supabase
		.storage
		.from(bucket)
		.getPublicUrl(path);
	return data.publicUrl ?? null;
}

function getPath(url: string) {
	const separator: string = supaurl + '/storage/v1/object/public/test/';
	const path: string[] = url.split(separator);
	return path[1];
}
