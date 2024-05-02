# PlantLife

With so many social media platforms out there, PlantLife aims to be a home for people who want to celebrate everything plant. Plant enthusiasts can present their newest acquisitions, share useful tips, buy, sell or exchange plants with others - or just geek out on any plant related topics.

[Link to the project](https://plantlife-a6c78053fb92.herokuapp.com/)

![An image of the homepage](src/assets/README/intro-image.png)


## Product Decisions 

### User Needs
As a user I want to...
- ...meet other plant enthusiasts so that I can build new connections with likeminded people
- ...exchange information with other users so that I can learn new things about plants
- ...follow people that post interesting plant content so that my feed filters out any uninteresting topics
- ...buy, sell or give away plants so that I can expand my collection or share my own plants with others

### MVP
PlantLife’s MVP is meant to be a simple version of a social media app that brings together plant enthusiasts from around the world. Core features consist of profile customization, reading, writing, editing and deleting posts and advertisements as well as an overview of all users with the option to follow each other.


## Design Decisions

### Wireframes
Creating the wireframes before the start of development allowed more time for the coding phase as a lot of time was saved by having less need for design changes.

![An image of a wireframe](src/assets/README/wireframe-image.png)

[Link to all wireframes](https://github.com/dev-timm/plantlife/tree/main/src/assets/README/wireframes)

### Usability

#### Layout
The layout is usually organized within 1-2 columns so that the actions and important content are easy to see.

#### Colors
The primary color is a vibrant green that represents nature and plants. It has a good contrast to white, which is important for UI elements such as buttons. Overall the color should give a positive feeling to the user and make it easy to identify important elements.


## Features

### Sign Up
Clicking on the Sign Up link on the NavBar or the link below the Sign In page will bring the user to the Sign Up page. There the user can create an account by entering a username, password and the same password again. If the user already has an account, they can click on the link below the button which will bring them to the Sign In page.

#### User Stories
- [Add sign up functionality](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56692116)

![An image of the sign up page](src/assets/README/sign-up.png)

### Sign In
Clicking on the Sign In link on the NavBar or the link below the Sign Up page will bring the user to the Sign In page. There the user can log in to their account by entering their username and password. If the user does not have an account yet, they can click on the link below the button which will bring them to the Sign Up page.

#### User Stories
- [Add sign in functionality](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56691725)

- [Refresh access tokens](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=57205321)

- [Add sign out functionality](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56691857)

![An image of the sign in page](src/assets/README/sign-in.png)

### NavBar
On top of each page is the NavBar. There are two versions of the NavBar - one is displayed when the user is not signed in and the other one is shown when the user is currently signed in. Whenever the user is not signed in they only see the logo with the sign in and sign up button. If the user is signed in they see a collection of all available links such as Feed, Bookmarks, Plant Lovers and Marketplace. Additionally users have access to a button to create a post or advertisement as well as their profile picture which gives them the option to view their profile or log out.

#### User Stories
- [Implement NavBar](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56691401)

- [Show different NavBar for signed in users](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=57210776)

- [Add routing](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56826745)


![An image of the NavBar when user is logged out](src/assets/README/navbar-1.png)
![An image of the NavBar when user is logged in](src/assets/README/navbar-2.png)

### Homepage
The Homepage is the first page visible to the users whether they are signed in or not. The page shows all posts ordered by date, a search bar and an order dropdown. There is also a widget on the side that displays popular users. Posts can be filtered through search by post title and username. Moreover, they can be ordered by date, number of likes and number of comments. The Homepage can be accessed by clicking on the Logo in the NavBar.

#### User Stories
- [View a list of posts](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56664009)

- [Search for posts](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56703658)

- [Order list of posts](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=58800365)

- [Report posts](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=58799923)

- [Add infinite scroll](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56704408)


![An image of the homepage](src/assets/README/homepage.png)

#### Feed
On the Feed page the users see posts from people they follow. Additionally, it contains the search bar, order dropdown and popular profiles widget. Posts can be filtered through search by post title and username. Moreover, they can be ordered by date, number of likes and number of comments.

#### User Stories
- [View post feed](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=59446784)

![An image of the feed](src/assets/README/feed.png)

#### Bookmarks
The Bookmarks page displays all posts the user has saved to view at a later time. Bookmarks can easily be created by clicking on the icon on the bottom right of a post. Clicking again will remove it from the Bookmarks. Additionally, the page contains the the search bar, order dropdown and popular profiles widget. Posts can be filtered through search by post title and username. Moreover, they can be ordered by date, number of likes and number of comments.

#### User Stories
- [Bookmark a post](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56704248)
- [View list of bookmarks](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56704029)

![An image of the bookmarks page](src/assets/README/bookmarks.png)

#### Plant Lovers
The Plant Lovers page gives users a list of all signed up users on the platform. By clicking on the “View Profile” link the user is sent to the profile page. The page also includes a search bar and the popular users widget. Profiles can be filtered through search by username.

#### User Stories
- [View list of users](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=58799701)

![An image of the plant lovers page](src/assets/README/plant-lovers.png)

### Marketplace
The Marketplace displays advertisements published by users. It is a place where users can offer and buy plants from each other. The page also includes a search bar and the popular users widget. Ads can be filtered through search by ad title and username. Moreover, they can be ordered by date and price.

#### User Stories
- [View list of ads](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=60328492)

- [Search for ads](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=60332912)

- [Order list of ads](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=61611988)

![An image of the marketplace](src/assets/README/marketplace.png)

### Like a Post
Each post can be liked by users who are signed in. Likes are placed at the bottom left with a counter next to it. Clicking once will add a like and clicking again will remove it. When a post is liked, the heart icon will turn green. Owner of a post is not able to like their own post.

#### User Stories
- [Like a post](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56664401)

![An image of a post’s like section](src/assets/README/like.png)

### CRUD: Post
Signed in users have the possibility to create posts by clicking on the button in the NavBar. Users can add an image, title and content to a post. After creating the post users have the possibility to edit the post and/or delete it. Posts can be viewed on the homepage, feed or under bookmarks.

#### User Stories
- [Create Post](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56663091)

- [Edit Post](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56663334)

- [Delete Post](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56663521)

- [View Post](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=57462362)

![An image of a post form](src/assets/README/post-crud.png)

### CRUD: Comment
Each post can be commented by users who are signed in. Comment feature is placed at the bottom left together a counter next to it. After clicking on a post and scrolling down, users can view, create, edit and delete comments. Adding or removing a comment will impact the count next to the comment icon.

#### User Stories
- [Create Comment](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56663722)

- [Edit Comment](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56701612)

- [Delete Comment](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56701827)

- [View Comment](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56702360)

![An image of the comments section](src/assets/README/comment.png)

### CRUD: Advertisements
Signed in users have the possibility to create advertisements by clicking on the button in the NavBar. Users can add an image, title, plant type, price, availability, contact and content to an advertisement. After creating the advertisement users have the possibility to edit the ad and/or delete it. Ads can be viewed on the Marketplace page.

#### User Stories
- [Create Ad](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=60327326)

- [Edit Ad](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=60327726)

- [Delete Ad](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=60328108)

- [View Ad](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=59950261)

![An image of the advertisement form](src/assets/README/ad-crud.png)

### Profile Page
The Profile Page enables users to customize their own profile and view profiles from other users. Information include username, bio, number of posts, number of followers and number of following. If the user is the profile owner they can edit the profile, username and password by clicking on the meatball menu on the right side. Additionally there is a section where users can see the posts and advertisements published by the profile owner. There is also a widget on the side that displays popular users.

#### User Stories
- [View Profile](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56693839)

- [Edit Profile](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56694099)

- [Edit Username](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=58798833)

- [Edit Password](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=58798559)

- [View all posts by user](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56703297)

- [View all ads by user](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=61612145)

- [Follow a user](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56694430)

- [Most followed profiles](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=56702958)

![An image of the profile page](src/assets/README/profile.png)

### 404 Page
A 404 page is displayed whenever the user has entered a wrong url.

- [Add 404 page](https://github.com/users/dev-timm/projects/4/views/1?pane=issue&itemId=61611475)

![An image of the 404 page](src/assets/README/404.png)

### Future Features

- Notification center to keep users up to date about new posts from people they follow etc.
- Display posts, ads and comments as a modal for a more seamless experience
- Add tags to posts so that it’s even easier to filter posts by topics relevant to users

### Reusable Components
| Name | Purpose | Location
| --- | --- | --- | 
| Asset | Lets users add images on forms and provides loading indication in form of a spinner | AdvertisementCreateForm, AdvertisementsPage, PostCreateForm, PostPage, PostsPage, PopularProfiles, ProfilePage, ProfilesPage
| Avatar | Displays  user's profile picture | NavBar, Advertisement, Comment, CommentCreateForm, Post, Profile
| MoreDropdown / ProfileEditDropdown | By clicking on it provides further options | Advertisment, Comment, Post, ProfilePage
| NavBar | The main way of navigating through the application | Present on all pages
| NoFindings | Lets users know that no search results and/or no data is available | AdvertisementsPage, PostsPage, ProfilePage, ProfilesPage
| NotFound | Lets users know that URL is not valid and provides a link back to the homepage | When wrong url is entered


## Testing

### Validation
All code was tested with an [HTML Validator](https://validator.w3.org/), [CSS Validator](https://jigsaw.w3.org/css-validator/), [JS Validator](https://jshint.com/) and [ESLint](https://eslint.org/) and no significant issues were found.

### Tested Devices & Browsers
- iPhone 11
    - Safari (known issue that sign in is not functional as the React app and DRF app live on different servers)
- Macbook Pro
    - Chrome
    - Safari (known issue that sign in is not functional as the React app and DRF app live on different servers)
    - Firefox

### Feature Testing
| Feature | Action | Expected Behaviour | Pass/Fail
| --- | --- | --- | --- |
| Sign Up | Click on the Sign Up button on the NavBar | Opens Sign Up page | Pass
| Sign Up | Don’t enter username and click Sign Up | Shows warning message that field can't be blank | Pass
| Sign Up | Enter new username and password and click Sign Up | No warning because username doesn’t exists yet | Pass
| Sign Up | Enter already existing username and click Sign Up | Shows warning message that username already exists | Pass
| Sign Up | Enter and repeat acceptable password | Signing up works without error | Pass
| Sign Up | Repeat wrong password | Shows warning message that passwords need to match | Pass
| Sign Up | Don’t enter password | Shows warning message that field must be filled | Pass
| Sign Up | Enter too short password | Shows warning message that password must at least be 8 characters | Pass
| Sign Up | Fill out all fields correctly and submit | Creates new account and user is sent to the Sign In page automatically | Pass
| Sign Up | Click Sign In link below Sign Up button | Leads user to Sign In page | Pass
| Sign In | Click on the Sign In button on the NavBar | Opens Sign In page | Pass
| Sign In | Enter no username or password and click Sign In button | Shows warning message that fields can't be blank | Pass
| Sign In | Enter wrong username and/or password and click Sign in button | Shows warning message that either username or password are incorrect | Pass
| Sign In | Enter correct username and password and click Sign In button | Successfully signs user in | Pass
| Sign In | Click Sign Up link below button | Leads user to Sign Up page | Pass
| Homepage| Type a username or title in the search bar that fits at least one post on the post list | Only posts that match the search criteria are visible | Pass
| Homepage | Choose to order posts by date, number of likes or number of comments | Post list changes order depending on the selected option | Pass
| Post | Click on the like icon of another user’s post while being logged in | Like icon turns green and like count increases by 1 | Pass
| Post | Click on the same like icon of another user’s post while being logged in | Like icon turns dark again and like count decreases by 1 | Pass
| Post | Hover over the like icon of a post while being logged out | Tool tip appears that user has to be logged in to be able to like a post | Pass
| Post | Hover over the like icon of your own post while being logged in | Tool tip appears that user can’t like their own post | Pass
| Post | Click on the username on one of the posts | Leads to the post author’s public profile | Pass
| Post | Click on a post image or comment icon | Leads to post detail page | Pass
| Bookmark | Click on the bookmark icon on one of the posts while being logged in | Icon turns green and post is added to the Bookmarks page | Pass
| Bookmark | Click again on the bookmark icon of the same post while being logged in | Icon turns dark again and post is removed from the Bookmarks page | Pass
| Bookmark | Hover over the bookmark icon of a post while being logged out | Tool tip appears that user has to be logged in to be able to bookmark a post | Pass
| Report Post | Click on report icon on the top right corner of a post from another user | Modal opens that includes a dropdown with different report options | Pass
| Report Post | Click the cancel button on the report modal | Report modal disappears | Pass
| Report Post | Click the Report button on the report modal without selecting an option | Shows warning modal that a reason needs to be selected | Pass
| Report Post | Select a report reason and click the Report button | Report is submitted and report icon stays green | Pass
| Report Post | Hover over an already reported post | Tool tip appears that the user has already reported the post | Pass
| Create/Edit Comment | Post a comment with entered content while being logged in | Shows comment below the post and increases comment count by 1 | Pass
| Create/Edit Comment | Click meatball menu next to the own comment and select edit | Shows edit area with Update Comment and Cancel buttons | Pass
| Create/Edit Comment | Click Cancel button on edited comment | Edit area disappears | Pass
| Create/Edit Comment | Click Update Comment button on edited comment | Comment is updated and displayed | Pass
| Delete Comment | Click meatball menu next to the own comment and select delete | Shows warning modal with Delete and Cancel buttons | Pass
| Delete Comment | Click Cancel on warning modal | Modal disappears | Pass
| Delete Comment | Click Delete on warning modal | Modal disappears as well as the comment and post’s comment count decreases by 1 | Pass
| Create/Edit Post | Click on button in NavBar and select “Plant a post” | Opens Create Post page | Pass
| Create/Edit Post | Submit the post without filling in required fields | Shows warning message on required field(s) | Pass
| Create/Edit Post | Submit the post with required fields filled in | Submits post successfully | Pass
| Create/Edit Post | Click meatball menu next to the own post and select Edit | Opens Edit page for this post | Pass
| Create/Edit Post | Edit post and click Cancel button | Post shows without changes | Pass
| Create/Edit Post | Edit post and click Update Post button | Post shows including changes | Pass
| Delete Post | Click meatball menu next to the own post and select Delete | Shows warning modal with Delete and Cancel buttons | Pass
| Delete Post | Click Cancel on warning modal | Modal disappears | Pass
| Delete Post | Click Delete on warning modal | Modal disappears and so does the post | Pass
| Create/Edit Ad | Click on button in NavBar and select “Plant an advertisement” | Opens Create Advertisement page | Pass
| Create/Edit Ad | Submit the ad without filling in required fields | Shows warning message on required field(s)  | Pass
| Create/Edit Ad | Submit the ad with text in the price field | Shows warning message that the input must be in numbers | Pass
| Create/Edit Ad | Submit the ad with required fields filled in | Submits ad successfully | Pass
| Create/Edit Ad | Click meatball menu next to the own ad and select Edit | Opens Edit page for this ad | Pass
| Create/Edit Ad | Edit ad and click Cancel button | Ad shows without changes | Pass
| Create/Edit Ad | Edit ad and click Update Advertisement button | Ad shows including changes | Pass
| Delete Ad | Click meatball menu next to the own ad and select Delete | Shows warning modal with Delete and Cancel buttons | Pass
| Delete Ad | Click Cancel on warning modal | Modal disappears | Pass
| Delete Ad | Click Delete on warning modal | Modal disappears and so does the ad | Pass
|Profiles | Click on “Plant Lovers” in the NavBar | Land on Plant Lovers page | Pass
| Profiles | Click on View Profile of a user | Land on profile page of this user | Pass
| Account | Click on profile image in the NavBar | Dropdown opens with two options: View Profile and Sign Out | Pass
| Account | Click on Sign out | User is signed out | Pass
| Account | Click on View Profile | Land on profile page | Pass
| Account | On own profile page click on meatball menu next to the profile name | Shows dropdown with three options to edit: profile, username or password | Pass
| Account | Click on “Edit Profile” in the meatball menu | Opens Edit Profile page | Pass
| Account | On the Edit Profile page, change the image or bio and click Update Profile | Returns to the profile page with updated profile | Pass
| Account | Click on “Edit Username” in the meatball menu | Opens Edit Username page | Pass
| Account | On the Edit Username page click Cancel | Returns to the profile page without any changes | Pass
| Account | On the Edit Username page change the username to a name that’s not already taken and click Update Username | Returns to the profile page with an updated username | Pass
| Account | On the Edit Username page change the username to an already taken name and click Update Username | Warning message shows that the username already exists | Pass
| Account | On the Edit Username page remove username and click Update Username | Warning message shows that the input field can’t be blank | Pass
| Account | Click on “Edit Password” in the meatball menu | Opens Edit Password page | Pass
| Account | On the Edit Password page click Cancel | Returns to the profile page without any changes | Pass
| Account | On the Edit Password page click Update Password without entering passwords | Shows warning message that input field(s) can’t be blank | Pass
| Account | On the Edit Password page enter two different passwords and click Update Password | Shows warning message that passwords don’t match | Pass
| Account | On the Edit Password page enter password(s) that are too short and click Update Password | Shows warning message that passwords are too short | Pass
| Account | On another user’s profile page click Follow next to the username while being logged in | Profile is now followed by the user and number of followers increases by 1 | Pass
| Account | On another user’s profile page that is followed click Unfollow next to the username while being logged in | Profile is now unfollowed by the user and number of followers decreases by 1 | Pass
| Account | Click on Follow next to a username on Popular Profiles widget while being logged in | Button changes to Unfollow | Pass
| Account | Click on Unfollow next to a username on Popular Profiles widget while being logged in | Button changes to Follow | Pass
| Account | On profile page click on “Advertisements” tab below profile information | Displays all advertisements published by the user | Pass
| Account | On profile page click on “Posts” tab below profile information | Displays all posts published by the user | Pass
| 404 | Type incorrect url | Show 404 message | Pass

## Technologies Used

PlantLife's project mainly relies on:

- [HTML](https://en.wikipedia.org/wiki/HTML)
- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [React](https://react.dev/)
- [Heroku](https://www.heroku.com/)
- [Git](https://git-scm.com/)

As part of React, different frontend libraries were used throughout the project:

- [React Bootstrap](https://react-bootstrap-v4.netlify.app/) - Used to structure and style the application
- [React Router Dom](https://reactrouter.com/en/6.23.0/start/overview) - URL updates without browser refresh after clicking on links
- [Axios](https://www.npmjs.com/package/axios) - Sends requests from React project to the API
- [Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component) - Loads new content by scrolling down instead of pagination
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) - Decodes JSON Web Tokens (JWT)


Additionally, the following platforms and tools were used while working on the project:

- [Gitpod](https://gitpod.io/)
- [GitHub](https://github.com/)
- [Google Fonts](https://fonts.google.com/)
- [Figma](https://www.figma.com/)

The media and content pieces were created with the help of:

- [Unsplash](https://unsplash.com/)
- [ChatGPT](https://chat.openai.com/)


## Deployment

### Deploying the app to Heroku

1. Log into Heroku and make sure you are in the "Dashboard" section
2. Click on the top right button “New” and select “Create new app”
3. Enter app name and choose your region
4. Click on the “Create app” button
5. Go to “Settings” and add buildpack
    1. heroku/nodejs
6. Go to “Deploy” section and connect to your GitHub account
7. Decide between automatic or manual deployment and click on the corresponding button
8. If the build is completed successfully, you should see a button to view the deployed application

### Cloning the repository

1. Visit the GitHub page of the website’s repository.
2. Click the “Code” button on top of the page.
3. Click on “HTTPS” below the “Clone” section.
4. Click on the copy button next to the link to copy it.
5. Open your IDE.
6. Type  ```git clone <copied URL>``` into the terminal.
7. If everything's done right, you should now see a cloned repository in your IDE.


## Credits

### Images
All images for the website are taken from [unsplash.com](https://unsplash.com/).

## Thank You

- to my mentor Gareth for supporting me with his feedback throughout the entire project
- to my wife Valentina for making sure I always get the time and anything else I need for working on this course and projects


