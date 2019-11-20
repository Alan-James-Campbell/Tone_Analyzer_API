import uuid from "uuid";
import { success, failure } from "./libs/response-lib";
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3')
const { IamAuthenticator } = require('ibm-watson/auth')
const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({apikey:'s8NneGprypcjshsq9xFNEECgB-NT_0F_4l-R34bN1qHR'}), 
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
})

export async function main(event, context) {
  const { text } = JSON.parse(event.body);
  const toneParams = {toneInput: { text }, contentType: 'application/json'}
  let toneAnalysis


  try {
    toneAnalysis = await toneAnalyzer.tone(toneParams)
    return success(toneAnalysis);
  } catch (e) {
    return failure({ status: false });
  }
}