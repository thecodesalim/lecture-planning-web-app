## ws_Planner

:computer:

Simple lecture planning web app

**Requirements**

- Node.js
- Google Chrome web browser

**Installation**

      cd ws_planner
      npm install
      
**Running:**

Add database:
- Change the mysql credentials inside config.js to your settings before running **npm run initsql**

      npm run initsql 
      
To run the server:

      npm start or npm run dashboard 
      The server runs by default on port 8080

**Features**
- real-time chatting
- Real time collaborative whiteboard
- all blocks can be deleted
- plans can be reordered by drag and drop
- One to one mapping of a plan

      
**Improvements**
- Google authentication
- Live collaborative editing
- Multiple mapping of a plan

## Reflection
     
I personally learned a lot throughout the time of these coursework. I have learned new skills to solve different problems. 

During this project I used different skills I have learned in this unit to bring it life.
Most importantly javascript and node.js. Working on this project the main feature I wanted to achieve was to make a beautiful looking user interface before anything. I think I have achieved that using CSS and Javascript.

Libraries

For the project I used two different libraries to achieve some features. I used socket.io to achieve a real time chatting and real time collaborative whiteboard for drawing or putting ideas down. ExpressJS was used for the back-end server side for serving the statics files and paging of the application.

User Interface

Designing the user interface I used flat design. A design philosophy popularized by Apple and Google for modern user interface. I designed it using purely CSS by myself no framework like bootstrap or materialize was used. 

Problems

The toughest problem I came through during the project was trying to create a multiple mapping of the a plan, I tried different methods to solve the problem but I couldn't do it, I had to give up and focus on other parts of the project. I will try and fix it in the future.





