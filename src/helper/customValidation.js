 
 
const validate = (schema,type) => (req, res, next) => {
  const { error } = schema.validate(req[type]);
  
  if (error) {
    console.log('error',error)
    return res.status(400).json({ error: error.message });
  }
   next();
};

 

module.exports = {
    validate,
};
