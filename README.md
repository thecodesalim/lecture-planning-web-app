## ws_Planner

:computer:
:zap:

Simple lecture planning web app

**Requirements**

- Node.js
- Google Chrome web browser

**Installation**

      cd ws_planner
      npm install
      
**Running:**

Add database:

Change the mysql credentials inside **config.js** to your settings before running **npm run initsql**

On default both user and password are root


      npm run initsql 
      
To run the server:

      npm start or npm run dashboard 
      The server runs by default on port 8080

**Features**
- real-time chatting
- Real time collaborative whiteboard
- plans can be reordered by drag and drop
- One to one mapping of a plan
- all blocks can be deleted
- Intuitive UI
- Saving of plans to database
- Responsive Design

**Note:** *For the chat and whiteboard, to see the real-time functionality you need to open another tab or browser and see both communicating*

      
**Improvements**
- Google authentication
- Live collaborative editing
- Multiple mapping of a plan

## Reflection
     
Introduction

I personally learned a lot throughout the time of this coursework. I have learned new skills to solve different problems. 

During this project, I used different skills I have learned in this unit to bring it life.
Most importantly javascript and node.js. Working on this project the main feature I wanted to achieve was to make a beautiful looking user interface before anything. I think I have achieved that using CSS and Javascript.

The best part of these project was the freedom to bring the project to life. The possibility of using any technology of my choice to do what I want and how I want to achieve without restriction. The hardest part was picking the right tool to solve the problem because of the abundant choices I could pick from. 

Libraries

For the project, I used 3 different libraries to achieve some features and not reinvent of the wheels of what is in place already. I used socket.io to achieve a real-time chatting and real-time collaborative whiteboard for drawing and putting ideas down. Socket.io is a real-time engine. ExpressJS was used for the back-end server side for serving the static files, paging of the application and API of the application. And finally, d3.js was used to create an SVG whiteboard and it is collaborative by using socket.io.

User Interface

Designing the user interface I used flat design. A design philosophy popularized by Apple and Google for a modern user interface. I designed it using purely CSS by myself no framework like bootstrap or materialize was used. This was made possible by using CSS Grid and CSS variables. For the drag and drop functionality it was very hard to get it work it took a lot of time to get it working because I have never used any type of drag and drop API before but at last, I got it work which improved my user interface substantially.

Back-end

For the back-end store I used to mysql database to save data using mysql2 library and using expressJS for routing and everything else.

Problems

The toughest problem I came through during the project was trying to create a multiple mapping of the plan, I tried different methods to solve the problem but I couldn't do it, so I created an alternative way of making multiple mapping of a lecture and practical by using drag and drop after adding them to the board(it is where all added plans can be seen, edited, reordered and deleted). I’ll make sure I find a better way to solve it.

Conclusion

If I was to do this project from beginning again I would spend equal time on both the front-end and back-end. I spent most of my time on the front-end making sure UI and UX feels complete forgetting about the back-end. I should have spent more time on the back-end to get more features done.

These project helped me mature myself in programming and be better at solving problems. I write more usable functions due to this unit. And most importantly it pushed me to learn new technologies outside my university work.  I’m happy with what I have achieved but there's room for more improvement.















