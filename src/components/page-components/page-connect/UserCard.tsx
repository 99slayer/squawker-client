import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface, ConnectCardData } from '../../../types';

function UserCard({ data }: { data: ConnectCardData }) {
	const { appUsername } = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const [following, setFollowing] = useState<boolean>(false);

	useEffect(() => {
		if (!data) return;
		setFollowing(data.isFollowing);
	}, [data]);

	return (
		<article
			className="p-2 flex gap-2 border-2 border-black cursor-pointer"
			onClick={(e) => {
				e.stopPropagation();
				navigate('/main/profile', {
					state: {
						username: data.username
					}
				});
			}}
		>
			<span className="size-8 rounded-full bg-gray-700"></span>
			<div className="flex-1 flex flex-col items-stretch gap-2">
				<div className="flex items-center">
					<div>
						<h3>{data.nickname}</h3>
						<p>{`@${data.username}`}</p>
					</div>
					{data.username !== appUsername ?
						<button
							className="ml-auto p-1 border-2 border-black"
							type='button'
							onClick={async (e) => {
								e.stopPropagation();

								if (following) {
									const res = await user.unfollow(null, data.username);
									if (res.ok) setFollowing(false);
								} else {
									const res = await user.follow(null, data.username);
									if (res.ok) setFollowing(true);
								}
							}}
						>
							{following ? 'Unfollow' : 'Follow'}
						</button>
						:
						<></>
					}
				</div>
			</div>
		</article>
	);
}

export default UserCard;
