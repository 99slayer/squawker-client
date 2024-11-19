import App from '../App.tsx';
import LoginModal from './modal-components/LoginModal.tsx';
import PostModal from './modal-components/PostModal.tsx';
import SignupModal from './modal-components/SignupModal.tsx';
import ConnectPage from './page-components/page-connect/ConnectPage.tsx';
import Followers from './page-components/page-connect/Followers.tsx';
import Following from './page-components/page-connect/Following.tsx';
import UserCard from './page-components/page-connect/UserCard.tsx';
import UserConnectionsPage from './page-components/page-connect/UserConnections.tsx';
import HomePage from './page-components/page-home/HomePage.tsx';
import LoginPage from './page-components/page-login/LoginPage.tsx';
import MainPage from './page-components/page-main/MainTemplate.tsx';
import Sidebar from './page-components/page-main/Sidebar.tsx';
import CommentPage from './page-components/page-post/CommentPage.tsx';
import PostPage from './page-components/page-post/PostPage.tsx';
import PostPageTemplate from './page-components/page-post/PostPageTemplate.tsx';
import ReplyUI from './page-components/page-post/ReplyUI.tsx';
import ProfilePage from './page-components/page-profile/ProfilePage.tsx';
import ProfilePosts from './page-components/page-profile/ProfilePosts.tsx';
import ProfileReplies from './page-components/page-profile/ProfileReplies.tsx';
import SettingsAccount from './page-components/page-settings/SettingsAccount.tsx';
import SettingsPage from './page-components/page-settings/SettingsPage.tsx';
import SettingsSecurity from './page-components/page-settings/SettingsSecurity.tsx';
import CommentDisplayGroup from './common-components/CommentDisplayGroup.tsx';
import Post from './common-components/Post.tsx';
import Back from './common-components/Back.tsx';
import InvalidRoutePage from './page-components/page-invalid/InvalidRoutePage.tsx';
import Spinner from './common-components/Spinner.tsx';
import Err from './common-components/Err.tsx';
import Empty from './common-components/Empty.tsx';
import ValidationErrors from './common-components/ValidationErrors.tsx';

const Component = {
	App,
	LoginModal,
	PostModal,
	SignupModal,
	ConnectPage,
	Followers,
	Following,
	UserCard,
	UserConnectionsPage,
	HomePage,
	LoginPage,
	MainPage,
	Sidebar,
	CommentPage,
	PostPage,
	PostPageTemplate,
	ReplyUI,
	ProfilePage,
	ProfilePosts,
	ProfileReplies,
	SettingsAccount,
	SettingsPage,
	SettingsSecurity,
	CommentDisplayGroup,
	Post,
	Back,
	InvalidRoutePage,
	Spinner,
	Err,
	Empty,
	ValidationErrors
};

export default Component;
