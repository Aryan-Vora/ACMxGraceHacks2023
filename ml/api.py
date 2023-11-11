from flask import Flask, request, jsonify
from process_ehr import *
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/result', methods=['POST'])
@cross_origin()
def result():
    # Check if the request contains a file and a speaker string
    if 'filepath' not in request.form:
        return jsonify({'error': 'filepath required'}), 400
    
    if 'ingredients' not in request.form:
        return jsonify({'error': 'ingredients required'}), 400

    ehr_summary = parse_ehr(request.form['filepath'])
    ehr_formatted_summary, ai_msg,human_message = main(ehr_summary, ingds=request.form['ingredients'])
    return jsonify({
        'ehr_smart_summary': ehr_formatted_summary,
        'original': ai_msg,
        'human_response': human_message
    })

if __name__ == '__main__':
    app.run(debug=True, port=9000)