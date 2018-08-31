## TMDB Movie Challenge 

The project uses React and Redux with a middleware pattern for async JS communcation with the TMDB server. 

Live link
`http://moaiii-movie-listing-challenge.s3-website-eu-west-1.amazonaws.com/#/`

To run, pull the repo and run: 

1. `npm i`
2. `npm start`

### Components

The project is split into modular components.

- The App View is a type of smart/ container component which does alot of the heavy lifting in terms of fetching movie data, manipulating it and passing it down through its sub components Movie, GenreSelector and RatingSlider. The defining feature of the view, is it is the only component which is connected to the redux store. The rest are dumb and only focus on rendering based on its props. 

- The RatingSlider is a stateless component, basically a simple function which returns a JSX component. I used this as an example of using a pre-made NPM module rc-slider and connecting its callbacks to our App. 

- The GenreSelector component is a series of checkboxes which have been created from scratch. I wanted to demonstrate ability creating a common component in this way. Sometimes we need to have complete flexibility with our UI components are breaking away from the standard HTML elements is sometimes required. 

### Tests 
I have tested the utility functions (i.e. business logic) and reducer actions as these are all written in a functional fashion. The app is built so that changes can only occur in the UI based on changes in the store. It is therefore my assumption that we should focus on testing what changes. Testing the redux store gives us good bang for our buck. 

If I had more time, I woud test the UI with a headless browser such as puppeteer. I find this more useful that Enzyme for example in asserting components on the page are rendering correctly.

`npm run test` to run tests

### Styling
All components have their own SCSS files to keep style logic modular. I have added two additional node script commands to watch and rebuild css on changes. The SASS is fairly sparse as the focus was on project approach though I have tried to demonstate where possible use of the advanced features such as selectors, ::after tricks, and SASS loops. 

### Data fetching
Axios is used call server endpoints. The end points routes are stored in the env file. If we were scalling across multiple environments, we can keep the code the same and use different env files to point to the staging path or production path for example. This is an example of decoupling and seperation of concerns. 

When the App.component calls for data it is not worried about the implementation. Similarly the reducer only worries and getting and setting values in its state object. The api calls and data manipulation is found in the App.middleware. As the data from the TMBD endpoint is paginated, I have chained subsequent calls for the other pages after the first is received. The spec said to only call this endpoint once, though I felt it could refer to not calling the api endpoint multiple times when the component re-mounts. This is not so much a problem for us here as there is only one route and one component to mount. 

I left the chained calls in to demonstate ability though understand I may have not have understood the spec correctly.

### Deployment
I have used Create-React-App boilerplate and ejected it. From there I have ran `npm build` and generated a production build of the project. Using my personal AWS account I have pushed it up to an S3 bucket for public access using the AWS CLI. 

### Accessibility 
For accessibility issues, I have considered a users use of assistive technology  such as screen readeras to operate the interface. We want to allow the user TO Tab to navigation through the page in situations where the user cant use a mouse for interacting with the page. 

Ive used native HTML elements together with ARIA tags to better define our elements, their roles and improve the accessibility tree by grouping elements together. I've used the lebeledBy to do this creating a 'tree' creates clearly defined map of paths whereby the user can 'tab' through and access our site. 

When we consider situations of low network bandwith where the client is struggling to download the assets for example the css has not downloading, the use of native elements like input checkboxes allows us to still use the page. It might not be pretty but its functional. To mitigate this I would also consider lazy loading all the movie data rather than waiting until all 40 pages have been downloaded - this would make it more performant.

I've stuck with simple black text on white background for maximum contrast and readability. Elements are visually grouped to the left though no efforts have been made to improve the UI. 

We can cycle through the options group using tab and shift+tab, then press enter select an option. For someone who is impaired, unselecting these is highly tedious, therefore I've also supplied a clear all option. 