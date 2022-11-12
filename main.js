//TMDB
/*  */
const API_KEY='api_key=78ca6dbedab01a7ae320aea89385d938';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_URL=BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;

const IMG_URL='https://image.tmdb.org/t/p/w500';
console.log('API URL',API_URL);
const searchURL=BASE_URL+'/search/movie?'+API_KEY;
console.log('searchURL',searchURL);

const main= document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(
    (data)=>{
        console.log(data.results);
        showMovies(data.results);
    }
);
}



function showMovies(data){
    main.innerHTML='';
    data.forEach(
        movie=>{
            const{title,poster_path,vote_average,overview} = movie;
            console.log(poster_path);
            const movieE1=document.createElement('div');
            movieE1.classList.add('movie');
            
            movieE1.innerHTML=`

            <img src='${IMG_URL+poster_path}' alt='${title}' >
            <div class="movie-info">
                <h3>${title}</h3>
           
                <span class='${getColor(vote_average)}'>${vote_average}</span>
            </div>
             <div class="overview">
                <h3>Overview</h3>
                ${overview}
             </div>
           
            `;
            main.appendChild(movieE1);

        }
    );
}

function getColor(vote){
    if(vote>=7){
        return 'green'
    }else if(vote>=4&&vote<7){
        return 'red'
    }else{
        return 'oragne'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    console.log(searchURL+'&query='+searchTerm);
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm);
    }else{
        getMovies(API_URL);
    }

   
})