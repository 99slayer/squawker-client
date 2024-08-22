import React from 'react';

export interface Options {
	payload?: 'json' | 'multi';
	body?: string | FormData;
	file?: string,
	ids?: string | string[];
	username?: string;
	update?: string;
}

export type RequestEvent = FormEvent | ButtonClickEvent;

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;
