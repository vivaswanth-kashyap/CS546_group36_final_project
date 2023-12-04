import commentRoutes from "./comment.js";

const constructorMethod = (app) => {
  app.use('/comments', commentRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route Not found' });
  });
};

export default constructorMethod;
