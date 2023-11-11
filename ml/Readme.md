Endpoint:
POST http://127.0.0.1:5000/result
Body:
{
  ingredients : JSON string, 
  filepath: local storage filepath
}

Output:

{
  'ehr_smart_summary': string,
  'original': string,
  'human_response': string
}
Note: All printable formatted strings with \n and \t formatting from AI responses since it aimed to format with bullet points/dashes, etc.
