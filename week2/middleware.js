
const express = a => (req, res, next) => next(req,res);


const app = express();
const PORT = 3000;

const requestLogger = (req, res, next) => {
  console.log(` ${req.method} ${req.originalUrl}`);
  next();
};

const validateAdmin = (req, res, next) => {
  if (req.query.role === 'admin') {
    console.log('role is admin');
    next();
  } else {
   
    console.log(' role is not admin.');
  }
};


app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Welcome');
});


app.get('/public', (req, res) => {
  res.send('This is a public page');
});

app.get('/admin', validateAdmin, (req, res) => {
  res.send('welcome admin.');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});