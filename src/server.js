const app = require('./app');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Library server started up on port ${port}`)
});
