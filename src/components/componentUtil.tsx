import { v4 as uuid } from 'uuid';
import { ConnectCardData, PostInterface } from '../types';
import Component from './Component';

export function createValidationErrors(arr: string[]): JSX.Element[] {
	console.log(arr);
	const elements: JSX.Element[] = [];
	arr.map((x) => {
		elements.push(<li key={uuid()}>{x}</li>);
	});
	return elements;
}

export function createPostList(
	arr: PostInterface[],
	postType: 'Post' | 'CommentGroup'
): JSX.Element[] {
	const commentElements: JSX.Element[] = [];

	if (postType === 'Post') {
		arr.map((x) => {
			commentElements.push(
				<li key={x._id}><Component.Post data={x} /></li>
			);
		});
	} else {
		arr.map((x) => {
			commentElements.push(
				<li key={x._id}>
					<div>
						<Component.CommentDisplayGroup commentGroup={x} />
					</div>
				</li>
			);
		});
	}

	return commentElements;
}

export function createUserCards(arr: ConnectCardData[]): JSX.Element[] {
	const cards: JSX.Element[] = [];
	arr.map((x) => {
		console.log(x);
		cards.push(
			<li key={x._id}>
				<Component.UserCard data={x} />
			</li>
		);
	});

	return cards;
}
