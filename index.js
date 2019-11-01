const express = require('express')
const path 	  = require('path')
const axios   = require('axios')
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth')

const app = express()

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey:'s8NneGprypcjshsq9xFNEECgB-NT_0F_4l-R34bN1qHR',
  }),
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
})



// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')))

// An api endpoint that accesses Watson's Tone Analyzer
app.get('/api/analyzeEntry/:content', (req,res, next) => {
  const { content } = req.params
  const toneParams = {toneInput: { 'text': content }, contentType: 'application/json'}
  toneAnalyzer.tone(toneParams)
  .then(toneAnalysis => res.send(toneAnalysis))
  .catch(err => console.log('error:', err))
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);