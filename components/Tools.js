import tmdb from'./Tmdb.js';

export default{
    getHomeList: async ()=>{
        return await tmdb.getHomeList()
    },
    getMovieInfo: async (movieId, type)=>{
        return await tmdb.getMovieInfo(movieId, type);
    },
    setObject: (id, content) => {
        document.getElementById(id).innerHTML = content;
    },
    setImage: (poster_path)=>{
        return `https://image.tmdb.org/t/p/w300${poster_path}`;
    }
};

