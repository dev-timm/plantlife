import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import { NotFound } from './components/NotFound';
import AllProfiles from './pages/profiles/AllProfiles';
import { useCurrentUser } from './contexts/CurrentUserContext';
import AdvertisementCreateForm from './pages/advertisements/AdvertisementCreateForm';
import AdvertisementPage from './pages/advertisements/AdvertisementPage';
import AdvertisementEditForm from './pages/advertisements/AdvertisementEditForm';
import AdvertisementsPage from './pages/advertisements/AdvertisementsPage';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage />
            )}
          />
          <Route
            exact
            path="/Feed"
            render={() => (
              <PostsPage filter={`owner__followed__owner__profile=${profile_id}&`} />
            )}
          />
          <Route
            exact
            path="/bookmarks"
            render={() => (
              <PostsPage filter={`bookmarks__owner__profile=${profile_id}&ordering=-bookmarks__created_at&`} />
            )}
          />
          <Route
            exact
            path="/advertisements"
            render={() => (
              <AdvertisementsPage />
            )}
          />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/posts/create' render={() => <PostCreateForm />} />
          <Route exact path='/posts/:id' render={() => <PostPage />} />
          <Route exact path='/posts/:id/edit' render={() => <PostEditForm />} />
          <Route exact path='/advertisements/create' render={() => <AdvertisementCreateForm />} />
          <Route exact path='/advertisements/:id' render={() => <AdvertisementPage />} />
          <Route exact path='/advertisements/:id/edit' render={() => <AdvertisementEditForm />} />
          <Route exact path='/profiles' render={() => <AllProfiles />} />
          <Route exact path='/profiles/:id' render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;