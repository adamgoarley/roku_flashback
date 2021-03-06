export default {
    name: "TheVideoComponent",

    template: `
    <section>
        <div class="row">
            <div class="col-12 order-2 order-md-1 col-md-3 media-container">
                <h4 class="media-title">{{currentMediaDetails.movies_title}}</h4>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-time">{{currentMediaDetails.movies_runtime}}</span>
                <span class="media-year">{{currentMediaDetails.movies_year}}</span>
            </div>

            <div class="col-12 order-1 order-md-2 col-md-9 media-container">
                <video v-if="currentMediaDetails" autoplay controls muted :src="'video/' + currentMediaDetails.movies_trailer" class="fs-video"></video>
            </div>
        </div>
<div class="col-12 col-sm-9 media-info">
<ul class="media-genres">
        <li><a href="1950" @click.prevent="filterMedia('1950')">50s</a></li>
        <li><a href="1960" @click.prevent="filterMedia('1960')">60s</a></li>
        <li><a href="1970" @click.prevent="filterMedia('1970')">70s</a></li>
        <li><a href="1980" @click.prevent="filterMedia('1980')">80s</a></li>
        <li><a href="1990" @click.prevent="filterMedia('1990')">90s</a></li>
        <li><a href="All" @click.prevent="retrieveVideoContent">All</a></li>
</ul>
</div>

        <div class="row">
         <div class="col-12 col-sm-9">
            <div class="thumb-wrapper clearfix">
                <img v-for="item in allRetrievedMedia" :src="'images/' + item.movies_cover" alt="media
                thumb" @click="loadNewMovie(item)" class="img-thumbnail rounded float-left media-thumb">
                </div>
            </div>
        </div>
    </section>
    `,

    data: function () {
        return {
            currentMediaDetails: {},
            allRetrievedMedia: []
        }
    },

    created: function() {
        this.retrieveVideoContent();
    },

    methods: {
        filterMedia(filter) {
            // debugger;

            let url = `./admin/index.php?media=movies&filter=${filter}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.allRetrievedMedia = data;
                    this.currentMediaDetails = data[0];
                })

        },

        retrieveVideoContent() {
            // fetch all the video content here (don't care about filtering, genre etc at this point)
            // debugger;

            if (localStorage.getItem("cachedVideo")) {
                this.allRetrievedVideos = JSON.parse(localStorage.getItem("cachedVideo"));

                this.currentMediaDetails = this.allRetrievedVideos[0];

            } else {
                                //add permissions here for children
                let url = `./admin/index.php?media=movies`;
                //store a video
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("cachedVideo", JSON.stringify(data));
                    this.cachedMedia = true;

                    this.allRetrievedMedia = data;
                    this.currentMediaDetails = data[0];
                    
                })

            }
           


        },

        loadNewMovie(movie) {
            this.currentMediaDetails = movie;
        }
    }
}