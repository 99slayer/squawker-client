import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	RouterProvider,
	createBrowserRouter
} from 'react-router-dom';
import './styles/index.css';
import Component from './components/Component.ts';

const router = createBrowserRouter([
	{
		path: '/squawker-client',
		element: <Component.App />,
		children: [
			{
				index: true,
				element: <Component.LoginPage />,
			},
			{
				path: 'main',
				element: <Component.MainPage />,
				children: [
					{
						index: true,
						element: <Component.HomePage />,
					},
					{
						path: 'status',
						element: <Component.PostPageTemplate />,
						children: [
							{
								path: 'post/:id',
								element: <Component.PostPage />,
							},
							{
								path: 'comment/:id',
								element: <Component.CommentPage />
							}
						]
					},
					{
						path: 'profile',
						element: <Component.ProfilePage />,
						children: [
							{
								index: true,
								element: <Component.ProfilePosts />,
							},
							{
								path: 'replies',
								element: <Component.ProfileReplies />,
							},
						],
					},
					{
						path: 'connect',
						element: <Component.ConnectPage />,
					},
					{
						path: 'connections',
						element: <Component.UserConnectionsPage />,
						children: [
							{
								path: 'followers',
								element: <Component.Followers />
							},
							{
								path: 'following',
								element: <Component.Following />
							},
						]
					},
					{
						path: 'settings',
						element: <Component.SettingsPage />,
						children: [
							{
								path: 'account',
								element: <Component.SettingsAccount />
							},
							{
								path: 'security',
								element: <Component.SettingsSecurity />
							}
						]
					}
				]
			},
			{
				path: '*',
				element: <Component.InvalidRoutePage />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
