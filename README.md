# Final Project
## COT 4930 - Full Stack Web Development- Movie Application

### Overview
This final project is a small-scale movie database with a watchlist.
<br/>

### Features
- Logged-in users are allowed to access various search operations from IDMB including: search for movies/tv shows, find show posters, search for show ratings, and look for movies comming soon
- Additonally, users can navigate to the MyWatchlist page to save there favorite movie, view there complete list, find information for a favorited item, and remove a movie **(This watchlist only stores movies)**

![Picture of Homepage](/assets/app_pic.png?raw=true "Homepage")

### How to run
1. Download and install the latest Node.js LTS version from the site: https://nodejs.org/en/download/
2. Verify the installation by typing: 'node --version' and 'npm --version' inside your computer's command line terminal.
3. Clone this Github url or download all zip files.
4. Save project to a folder inside your desktop.
5. Open the project directory through a command line terminal or code editor application like: Visual Studios Code.
6. Change the project directory to the backend folder.
    - Sign up to create IMDb API Key: https://imdb-api.com/Identity/Account/Register .
    - Place your API key inside the file marked '.env' by substituting the variable on the right hand side with your personal key.
    - Inside the backend folder, run the command 'node movieserver.js' and leave it running.
7. Change the project directory to the frontend folder.
    - Open a internet browser and naviagte to the following site: http://127.0.0.1:500/frontend/index.html .
    - Explore through the various options presented on the screen!

### Dev Dependencies
- monngodb
- axios
- body-parser
- cors
- dotenv
- express
- glob
- nodemon 