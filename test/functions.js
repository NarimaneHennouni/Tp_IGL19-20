const axios=require('axios');

const functions = {
    fetchQuestions : () => axios.get(`http://localhost:3000/forumesiquestions`)
    .then(res => res.data)
    .catch(err => 'error'),
   
    
}
module.exports=functions;