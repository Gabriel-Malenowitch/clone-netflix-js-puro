import tools from './Tools.js'

const HOMELIST = await tools.getHomeList();
let BANNER_ORIGINALS = HOMELIST[0].items.results;
const RANDOMVALUE = (Math.floor(Math.random() * BANNER_ORIGINALS.length - 1));
BANNER_ORIGINALS = BANNER_ORIGINALS[RANDOMVALUE];
let movieInfos = await tools.getMovieInfo(BANNER_ORIGINALS.id, 'tv');
let movieInfo = Number(movieInfos.number_of_seasons);
var scrollX = 350;
let x = 0;

const App = {
    setSeasons: ()=>{
        try {
            if (movieInfo !== 1){
                tools.setObject('banner-seasons', `${movieInfo} Temporadas`);
            }else{
                tools.setObject('banner-seasons', `${movieInfo} Temporada`);
            }
        } catch (error) {
            tools.setObject('banner-seasons', "   temporadas")
        }
    },
    
    setGenres: ()=>{
        let n = [];
        for(let i of movieInfos.genres){
            n.push(i.name)
        }
        return n;
    },

    createtBanner: ()=>{
        tools.setObject('banner--title', BANNER_ORIGINALS.name);
        tools.setObject('banner--grade', BANNER_ORIGINALS.vote_average);
        tools.setObject('banner--year', new Date(BANNER_ORIGINALS.first_air_date).getFullYear());
        App.setSeasons();
        tools.setObject('banner--description', BANNER_ORIGINALS.overview);
        tools.setObject('banner--genres', App.setGenres());

        let img = document.getElementById('banner');
        img.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieInfos.backdrop_path})`;
        img.style.backgroundPosition = 'center';
        img.style.backgroundSize = 'cover';
        img.style.scale = 0.5;

    },

    createFeed: ()=>{
        HOMELIST.forEach((item)=>{
            let feed = document.getElementById('feed');
            let divM = document.createElement("div");
            let divM0 = document.createElement("div");
            let divM2 = document.createElement("div");
            let buttonLeft = document.createElement("button"); 
            let buttonRight = document.createElement("button");
            let title = document.createElement("h2");
            let listX = item.items.results.length*150 
        
            divM.className = "listMovies";
            divM0.className = "listMovies-item";
            divM2.className = "listMovies-list";
            buttonLeft.className = "bl";
            buttonLeft.textContent = "<"
            buttonRight.textContent = ">"
            buttonRight.className = "br";            
            title.innerText = item.title; 
            divM.appendChild(title); 

            buttonLeft.onclick = ()=>{
                x += Math.round(window.innerWidth / 2);
                if(x > 0){
                    x = 0;
                }
                divM.style.marginLeft = `${x}px`
            }
            buttonRight.onclick = ()=>{
                x -= Math.round(window.innerWidth / 2);
                if(window.innerWidth-listX > x){
                    x = (window.innerWidth-listX)-80
                }
                divM.style.marginLeft = `${x}px`
            }

            item.items.results.forEach((aux)=>{
                let img = document.createElement("img"); 
                img.src = tools.setImage(aux.poster_path)
                divM0.appendChild(img)
                divM.appendChild(divM0)
            })
            divM.style.width = `${item.items.results.length*150}px`;
            divM2.appendChild(buttonLeft);
            divM2.appendChild(buttonRight);
            divM2.appendChild(divM);
            feed.appendChild(divM2);   
        })
    }

    
}

App.createtBanner()
App.createFeed()