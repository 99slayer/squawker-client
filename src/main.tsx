import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import LoginPage from './components/page-components/page-login/LoginPage.tsx';
import MainPage from './components/page-components/page-main/MainTemplate.tsx';
import HomePage from './components/page-components/page-home/HomePage.tsx';
import ProfilePage from './components/page-components/page-profile/ProfilePage.tsx';
import ConnectPage from './components/page-components/page-connect/ConnectPage.tsx';
import SettingsPage from './components/page-components/page-settings/SettingsPage.tsx';
import ProfilePosts from './components/page-components/page-profile/ProfilePosts.tsx';
import ProfileReplies from './components/page-components/page-profile/ProfileReplies.tsx';
import ProfileLikes from './components/page-components/page-profile/ProfileLikes.tsx';
import Followers from './components/page-components/page-connect/Followers.tsx';
import Following from './components/page-components/page-connect/Following.tsx';
import FindUsers from './components/page-components/page-connect/FindUsers.tsx';
import './styles/index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <LoginPage />,
			},
			{
				path: 'main',
				element: <MainPage />,
				children: [
					{
						index: true,
						element: <HomePage />,
					},
					{
						path: 'profile',
						element: <ProfilePage />,
						children: [
							{
								index: true,
								element: <ProfilePosts />,
							},
							{
								path: 'replies',
								element: <ProfileReplies />,
							},
							{
								path: 'likes',
								element: <ProfileLikes />,
							}
						],
					},
					{
						path: 'connect',
						element: <ConnectPage />,
						children: [
							{
								index: true,
								element: <Followers />
							},
							{
								path: 'following',
								element: <Following />
							},
							{
								path: 'findusers',
								element: <FindUsers />
							}
						]
					},
					{
						path: 'settings',
						element: <SettingsPage />,
					}
				]
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
