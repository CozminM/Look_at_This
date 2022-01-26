<!-- TABLE OF CONTENTS -->

# Look At This app

<summary><h2 style="display: inline-block">Table of Contents</h2></summary>
<ol>
<li>
    <a href="#about-the-project">About The Project</a>
    <ul>
    <li><a href="#built-with">Built With</a></li>
    </ul>
</li>
<li>
    <a href="#getting-started">Getting Started</a>
    <ul>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#starting">Running the app</a></li>
    </ul>
</li>

</ol>

<!-- ABOUT THE PROJECT -->

## About The Project

“Look at This” is a travelling companion application, that focuses on location sharing between users. 
A user can share a location that he has encountered during its travels to other users that can add comments or a review.

This repo handles both the backend and the frontend sides of the project.

All the api requests from the frontend side accesses the backend side to send or receive data from the database. 
Certain actions (like adding, deleting or updating a location) are secured and an unauthorized action redirects a guest
to the register page.

Application features include:

- Landing page with a map that shows random locations that users have added<br/>
  <img src="https://raw.githubusercontent.com/CozminM/Look_at_This/master/public/Landing-page-look-at-this.png" height="auto" width="40">
<br/>

- A registration and login form<br/>
  <img src="https://raw.githubusercontent.com/CozminM/Look_at_This/master/public/Register-form.png" height="auto" width="40">
<br/>

- A form page for users to add locations<br/>
  <img src="https://raw.githubusercontent.com/CozminM/Look_at_This/master/public/Add-form.png" height="auto" width="40">
<br/>

- A list page with search and tag filtering functions<br/>
  <img src="https://raw.githubusercontent.com/CozminM/Look_at_This/master/public/list-page.png" height="auto" width="40">
<br/>

- An individual location page where users can view details about it, add comments and where the 
owner can delete/update it<br/>
  <img src="https://raw.githubusercontent.com/CozminM/Look_at_This/master/public/individual-page.png" height="auto" width="40">
<br/>


##Future implementation

- Comment section: add, delete, edit
- Comment moderation if you're the owner of the location entry
- Voting functionality
- Info pop-up when clicking on a location on the landing page markers


### Built With

- Maven
- Spring Boot
- Java
- Postgresql
- React
- Node.js

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Create your own application.properies file in a new resources directory in the backend folder and write
   ```
   spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=create-drop
   spring.datasource.url=databaseURL
   spring.datasource.username=yourUsername
   spring.datasource.password=yourPassword
   spring.jpa.show-sql=false
   ```
   
3. Install NPM packages
    ```sh
    npm install
    ```
4. Make sure your device can run all the technologies in the build section

<!-- ACKNOWLEDGEMENTS -->

# React App

## Running the app

In the project frontend directory, you can run:

    npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.