const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql2');
const config = require('./config');

// Mysql credentials
const connection = mysql.createConnection(config.mysql)

// Connects to mysql database
try {
  connection.connect();
} catch (e) {
  console.log('Oops something bad happened');
  console.log(e);
}

/**
 * Server listening port
 */
http.listen(8080, () => {
  console.log('listening on *:8080');
});

app.use('/', express.static('public'));
app.use(express.json());

/**
 * Serves static files
 */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

/**
 * Chat real-time connection to and from client
 */
io.on('connection', (socket) => {
  // Receives message from client and broadcasts
  socket.on('chat message', (msg) =>{
    io.emit('chat message', msg);
  });
});

/**
 * Whiteboard real-time connection to and from client
 */
io.on('connection', (socket) => {
  // Receives drawing from client and broadcasts
  socket.on('draw', (data) => {
    io.emit('draw', data);
  })
});

/**
 * GET /api/plans
 *Gets all plans from database
 */
app.get('/api/plans', (req, res) => {
  connection.query('SELECT * FROM plans', (error, results) => {
    if (error)
      return res.json({
        error: error
      });
    res.json(results);
  });
});

/**
 * POST /api/plans
 * Adds plans to database
 */
app.post('/api/plans', (req, res) => {
  connection.query(
    'INSERT INTO plans (week, topic, notes, resources) VALUES (?,?,?,?)',
    [req.body.week, req.body.topic, req.body.note, req.body.resource],
    (error, results) => {
      if (error)
        return res.json({
          error: error
        });

      connection.query(
        'SELECT LAST_INSERT_ID() FROM plans',
        (error, results) => {
          if (error)
            return res.json({
              error: error
            });
          res.json({
            id: results[0]['LAST_INSERT_ID()'],
            week: req.body.week,
            topic: req.body.topic,
            note: req.body.note,
            resource: req.body.resource
          });
        }
      );
    }
  );
});

/**
 * DELETE /api/plans/:id
 * Deletes a specific plan
 * @param {Number} id plan id
 */
app.delete('/api/plans/:id', (req, res) => {
  connection.query(
    'DELETE FROM plans WHERE id = ?',
    [req.params.id],
    (error, results) => {
      if (error) return res.json({ error: error });
      res.json({ success: 'success' });
    }
  );
});

/**
 * GET /api/plans/:id
 * Gets a specific plan from the database
 * @param {Number} id plan id
 */
app.get('/api/plans/:id', (req, res) => {
  connection.query(
    'SELECT * FROM plans WHERE id = ?',
    [req.params.id],
    (error, results) => {
      if (error) return res.json({ error: error });
      res.json(results);
    }
  );
});
