import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormEvent, ReturnDataInterface } from '../types';
import { post } from '../api/api';

function useCreatePost() {
	const navigate = useNavigate();
	const textRef = useRef<HTMLTextAreaElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const [validationErrors, setErrors] = useState<Record<string, string[]> | null>(null);

	const handleCreatePost = useCallback(
		async (e: FormEvent, postId: string | null) => {
			let success = false;
			if (textRef.current!.value || fileRef.current!.value) {
				const res: Response = await post.createPost(e, postId);
				const data: ReturnDataInterface = await res.json();

				if (data.errors) setErrors(data.errors);
				if (res.ok) {
					success = true;
					navigate(
						`/main/status/post/${data._id}`,
						{
							state: {
								id: data._id,
								post_type: 'Post'
							}
						}
					);
					setErrors(null);
				}
			}
			return success;
		}, [navigate]
	);

	const setValidationErrors = useCallback(
		(value: Record<string, string[]> | null) => {
			setErrors(value);
		}, []
	);

	return {
		handleCreatePost,
		textRef,
		fileRef,
		validationErrors,
		setValidationErrors
	};
}

export default useCreatePost;
