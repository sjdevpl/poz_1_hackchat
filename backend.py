from flask import Flask, request, session, abort
from flask_restful import Resource, Api, reqparse
from flask_session import Session

app = Flask(__name__)
api = Api(app)
app.config['SECRET_KEY'] = '_5#y2L"F4Q8zsdhgfdh'
app.config['SESSION_TYPE'] = "filesystem"
Session(app)


class Chat(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('message')

    def get(self, mtimestamp: int):
        '''
        :param mtimestamp:
        :return:
        '''
        if "messages" in session:
            return session["messages"][last_message_id:]
        else:
            abort(401)

    def put(self, mtimestamp: id):
        if "messages" in session:
            args = self.parser.parse_args()
            if args["message"] is None:
                abort(400)
            session["messages"].append(args['message'])
        return self.get(mtimestamp)


class Login(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('login')
    parser.add_argument('password')

    def post(self):
        args = self.parser.parse_args()
        if args['login'] == "admin" and args['password'] == "admin":
            # init session
            session['messages'] = []
            return {"message": "Logged in successfully"}
        else:
            abort(401)


api.add_resource(Chat, '/api/chat/v1.0/message/<int:mtimestamp>')
api.add_resource(Login, '/api/chat/v1.0/login')

if __name__ == '__main__':
    app.run(debug=True)
