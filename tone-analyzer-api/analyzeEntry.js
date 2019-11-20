import { failure } from "./libs/response-lib";
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


export async function main(event, context) {
  const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({apikey:'s8NneGprypcjshsq9xFNEECgB-NT_0F_4l-R34bN1qHR'}),
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
  });
  const data = JSON.parse(event.body);
  const text = data.text;
  const toneParams = {toneInput: { text }, contentType: 'application/json'};
  let toneAnalysis;


  try {
    toneAnalysis = await toneAnalyzer.tone(toneParams);
    return toneAnalysis;
  } catch (e) {
    return failure({ status: false });
  }
}