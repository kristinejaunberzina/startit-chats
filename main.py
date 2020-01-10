from flask import Flask, render_template, request


app = Flask('app')


@app.route('/')
def index_page():
  #return "Sveiciens no StartIT! 7"
  return render_template('index.html')




@app.route('/health') #what to return
def health_check():
  return 'OK'




if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000, debug=True)