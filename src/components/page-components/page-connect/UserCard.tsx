import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface, ConnectCardData } from '../../../types';
import { getURL } from '../../../supabase';

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
			className="p-2 flex items-center gap-2 rounded-lg bg-gray-onyx cursor-pointer"
			onClick={(e) => {
				e.stopPropagation();
				navigate('/squawker-client/main/profile', {
					state: {
						username: data.username
					}
				});
			}}
		>
			<div className='flex rounded-full'>
				{data.pfp ?
					<img
						className='size-[50px] p-1 rounded-full object-cover'
						src={getURL(data.pfp)}
					/>
					:
					<span
						className='material-symbols-outlined filled text-[50px] rounded-full'
					>
						account_circle
					</span>
				}
			</div>
			<div className="flex-1 flex flex-col items-stretch gap-2">
				<div className="flex items-center">
					<div className='max-[470px]:w-[140px]'>
						<h3
							className='overflow-hidden text-nowrap text-ellipsis'
						>
							{data.nickname}
						</h3>
						<p
							className='overflow-hidden text-nowrap text-ellipsis'
						>
							{`@${data.username}`}
						</p>
					</div>
					{data.username !== appUsername ?
						<button
							className="w-[100px] ml-auto rounded-full hover:text-white bg-black-eerie-black"
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
