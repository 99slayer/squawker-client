import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';

const bucket = import.meta.env.VITE_BUCKET;
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
		return data.path;
	}
}

export async function clearUpload(path: string) {
	await supabase
		.storage
		.from(bucket)
		.remove([path]);
}

export function getURL(path: string | null | undefined): string {
	if (!path) return '';
	if (path.includes('https://') || path.includes('http://')) return path;

	const { data } = supabase
		.storage
		.from(bucket)
		.getPublicUrl(path);
	return data.publicUrl;
}
