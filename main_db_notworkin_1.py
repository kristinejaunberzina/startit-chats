import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask('app')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)


class test(db.Model):
  col = db.column(db.String(255), primary_key=True)
  col2 = db.column(db.String(255), unique=True, nullable=False)

  def __repr__(self):
    return '%r' % self.col


@app.route('/')
def index_page():
  return "Sveiciens no StartIT! 7"



if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000, debug=True)