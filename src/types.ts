import React from 'react';

export interface Options {
	payload?: boolean;
	body?: string | FormData;
	ids?: {
		userId?: string;
		postId?: string;
		commentId?: string;
		likeId?: string;
	};
	username?: string;
}

export interface UserInterface {
	_id: string;
	username: string;
	nickname: string;
	join_date: string;
	profile_text?: string;
	profile_header?: string;
	pfp?: string;
	following: string[];
	followers: string[];
	isFollowing?: boolean;
	post_count: number;
	comment_count: number;
	like_count: number;
}

export interface PostInterface {
	_id: string;
	post_type: 'Post' | 'Comment';
	post_data: {
		post_id: string;
		timestamp: string;
		repost: boolean;
		user: {
			id: string,
			username: string,
			nickname: string,
			pfp: string
		}
	},
	post: {
		text: string;
		user: {
			id: string;
			username: string;
			nickname: string;
			pfp?: string;
		};
		post_image?: string;
	}
	quoted_post?: PostInterface;
	root_post?: PostInterface;
	parent_post?: PostInterface;
	comments?: object[];
	reposts?: object[];
	likes?: object[];
	comment_count?: number;
	direct_comment_count: number;
	repost_count?: number;
	like_count?: number;
	liked: boolean;
}

export type RequestEvent = FormEvent | ButtonClickEvent | null;
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export type ConnectCardData = {
	_id: string;
	username: string;
	nickname: string;
	pfp?: string;
	profileText?: string;
	isFollowing: boolean;
}

export interface AppContextInterface {
	appLogout: (e: RequestEvent) => Promise<void>;
	appUsername: string;
	setAppUsername: (username: string) => void;
	appNickname: string;
	setAppNickname: (nickname: string) => void;
	appPfp: string | null;
	setAppPfp: (pfp: string) => void;
}

export interface MainContextInterface {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
	postRef: React.RefObject<HTMLDialogElement>;
	setPostId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ReturnDataInterface {
	username?: string;
	nickname?: string;
	pfp?: string;
	_id?: string;
	header?: string;
	errors?: Record<string, string[]>;
}
