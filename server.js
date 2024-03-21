const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(express.json());
 
const pool = new Pool({
  user: 'azureuser',
  host: '10.74.67.197',
  database: 'n8n',
  password: '1qaz@WSX',
  port: 5434,
});
 
app.get('/data', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const keyword = req.query.keyword || '';
 
  let baseQuery = `
      SELECT t.*, array_agg(i.url) as img_urls
      FROM task t
      LEFT JOIN thumbnails i ON i.task_id = t.id
      WHERE i.task_id IS NOT NULL
    `;
 
  if (keyword) {
    baseQuery += `AND t.title LIKE '%${keyword}%' `;
  }

  baseQuery += ` GROUP BY t.id ORDER BY t.id `;

  const paginatedQuery = `${baseQuery} LIMIT $1 OFFSET $2`;

  try {
    const result = await pool.query(paginatedQuery, [limit, offset]);
    const filtedResult = result.rows.filter(item => item.img_urls.length > 0 )
    res.json({
      page,
      limit,
      data: filtedResult,
    });
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
app.get('/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query('SELECT t.*, array_agg(i.url) as img_urls FROM task t  LEFT JOIN thumbnails i ON i.task_id = t.id where t.id = $1 GROUP BY t.id', [id]);
      await client.query('COMMIT');
      res.json(result.rows.length > 0 ? result.rows[0] : "");
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

app.post('/accept', async (req, res) => {
  const { id, newState } = req.body;

  try {
      const queryText = 'UPDATE task SET status = $1 WHERE id = $2';
      const result = await pool.query(queryText, [newState, id]);
      console.log(result)
      res.send('Data updated successfully');
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error updating data');
  }
});

app.post('/reject', async (req, res) => {
  const { id, newState, comments } = req.body;

  try {
      const queryText = 'UPDATE task SET status = $1, comments = $2 WHERE id = $3';
      const result = await pool.query(queryText, [newState, comments, id]);
      console.log(result)
      res.send('Data updated successfully');
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error updating data');
  }
});
 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});