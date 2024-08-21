import React from 'react';

export interface Args {
	body?: string | FormData;
	ids?: string | string[];
}

export interface Options {
	payload?: 'json' | 'multi',
	file?: string,
	ids?: string | string[]
}

export type RequestEvent = FormEvent | ButtonClickEvent;

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;
