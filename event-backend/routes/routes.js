const db = require('../db/dbConfig');

// exports
module.exports = server => {
  server.get('/event/:id', viewEvent);
  server.get('/userEvent', userEvents);
  server.post('/addEvent', addEvent);
  server.get('/events', getEvents);
  server.put('/updateEvent/:id', updateEvent);
  server.delete('/deleteEvent/:id', deleteEvent);
  server.get('/', viewServer);
};

function viewServer(req, res) {
  res.status(200).json({ api: 'running' });
}

function addEvent(req, res) {
  const { user_id, event_name, img_url, text, start_date, end_date,start_time,end_time,event_location,organizer_name} = req.body;
  if (!event_name || !img_url || !text || !start_date || !end_date || !start_time || !end_time || !event_location || !organizer_name)   {
    return res.status(422).json({ error: 'Missing parameters.' });
  } else {
    const event = { user_id, event_name, img_url, text, start_date, end_date,start_time,end_time,event_location,organizer_name };
    db('event')
      .insert(event)
      .then(ids => res.status(200).json(ids[0]))
      .catch(err =>
        res.status(500).json({ error: 'Could not add event properly' })
      );
  }
}

function getEvents(req, res) {
  db('event')
    .then(events => res.status(200).json({ events }))
    .catch(error => res.status(500).json(error));
}

function viewEvent(req, res) {
  const { id } = req.params;
  db('event')
    .where({ 'event_id': id })
    .then(event => res.status(200).json({ event }))
    .catch(err => res.status(500).json(err));
}

function userEvents(req, res) {
  const { id } = req.body;
  db('event')
    .where({ user_id: id })
    .then(event => res.status(200).json({ event }))
    .catch(err => res.status(500).json(err));
}

function updateEvent(req, res) {
  const { id } = req.params;
  const changes = req.body;
  db('notes')
    .where({ id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No note found to update' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
}


function deleteEvent(req, res) {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .del()
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No note found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
}
