const express =  require('express');
const app =require("./server.js");
const supertest = require("supertest");
const request = supertest(app);
const axios= require('axios');

function fetchEtudiants(){
    return axios.get(`http://localhost:3003/api`)
   .then(res => res.data)
   .catch(err => 'error')} 

test('server should return students and their marks ',async ()=>
{
   //expect.assertions(1);
   const data=await fetchEtudiants();
   expect(data).toEqual([
    {    "id_etud": '16/0167',     "Moy_IGL": 13.375,  "Moy_RES": 10.8333,    "Moy_ANUM": 16.35,
       "Moy_THP": 15.1667,
       "Moyf": 13.749
      },
  {
        "id_etud": '17/0022',
       "Moy_IGL": 13.5,
       "Moy_RES": 9.5,
        "Moy_ANUM": 15.8,
        "Moy_THP": 16,
        "Moyf": 13.4529
      },
     {
      "id_etud": '17/0101',
   "Moy_IGL": 14.8125,
   "Moy_RES": 10.4167,
   "Moy_ANUM": 14.4,
   "Moy_THP": 13.8333,
   "Moyf": 13.1922
     },
{
  "id_etud": '17/0122',
      "Moy_IGL": 13.25,
  "Moy_RES": 10.0833,
   "Moy_ANUM": 15,
"Moy_THP": 13.8333,
  "Moyf": 12.8676
    }
 ]);
   
});
    
 