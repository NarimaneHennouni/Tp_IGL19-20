const chai=require('chai');
const axios=require('axios');
const server=require('../server');
const approute=require('../server-side/routes/approutes');
var todoList = require('../server-side/controllers/appController');
let chaiHttp=require('chai-http');

chai.use(chaiHttp);

//unit test for GET method
function fetchQuestions(){
     return axios.get(`http://localhost:3000/forumesiquestions`)
    .then(res => res.data)
    .catch(err => 'error')} 

test('server should return questions',async ()=>
{
    expect.assertions(1);
    const data=await fetchQuestions();
    expect(data).toEqual([{"id_qst":1,"id_user":5,"question":"c'est quoi docker ?"},{"id_qst":2,"id_user":8,"question":"à quoi sert selenium ?"},{"id_qst":3,"id_user":4,"question":"est-ce que la méthodologie scrum est une méthode agile ?"},{"id_qst":4,"id_user":14,"question":"peut-on utiliser mocha pour le unit testing ?"}]);
    
});

//unit test for POST method
describe('/POST question', () => {
    it('it should POST a question ' ,async ()=> {
        let question = {
            question: "what is jsdoc",
            id_user: 11 
        }
      chai.request(server =>approute(server).route('/forumesiquestions').post(todoList.create_a_question).send(question)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.book.should.have.property('question');
            res.body.book.should.have.property('id_user');
        
        
    })
);
}) });


