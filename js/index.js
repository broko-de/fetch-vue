const { createApp } = Vue;

const URL_API = 'https://api.themoviedb.org/3/';
const API_KEY = '&api_key=aa2ca00d61eb3912b6e778008ad7fcc8';

const app = createApp({
    data(){
        return{
            page:1,
            peliculas:[],
        }
    },
    methods:{
        fetchPeliculas(url){
            fetch(url)
                .then(response => response.json())
                .then(data => this.peliculas = data.results)
                .catch(err => {
                    console.error(err);
                })
        },
        nextPage(){
            this.page++;
            this.fetchPeliculas(`${URL_API}discover/movie?sort_by=popularity.desc&page=${this.page}${API_KEY}`)
        },
        prevPage(){

            this.page = (this.page==1)?1:this.page--;
            
            this.fetchPeliculas(`${URL_API}discover/movie?sort_by=popularity.desc&page=${this.page}${API_KEY}`)
        }
    },
    created(){
        this.fetchPeliculas(`${URL_API}discover/movie?sort_by=popularity.desc${API_KEY}`);
    }

});

app.component(
    'pelicula-item',
    {
        props:['movie'],
        data(){
            return {
                url_img : 'https://image.tmdb.org/t/p/w500/',
            }
        },
        template:`
            <div class="pelicula-item">
                <img :src="url_img+movie.backdrop_path" alt="" class="pelicula-item-img">
                <div class="pelicula-item-detalle">
                    <p class="pelicula-item-detalle-titulo">{{movie.title}}</p>
                    <p class="pelicula-item-detalle-subtitulo">{{movie.overview}}</p>
                </div>
            </div>
        `,
    }
);



app.mount('#app');