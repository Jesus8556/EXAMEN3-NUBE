from flask import Flask 
from flask import jsonify
import pandas as pd

ratings = pd.read_csv('ratings.csv')
movies = pd.read_csv('movies.csv')

merged_data = pd.merge(ratings, movies, on='movieId')
average_ratings = merged_data.groupby(['movieId', 'title'])['rating'].mean().reset_index()
sorted_ratings = average_ratings.sort_values(by='rating', ascending=False)

#print(sorted_ratings.head())

app = Flask(__name__)

@app.route("/")
def index():
    return "Este es mi api"

@app.route("/api/movies")
def movies():
    top_movies = sorted_ratings.head(10).to_dict(orient='records')
    return jsonify(top_movies)

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)