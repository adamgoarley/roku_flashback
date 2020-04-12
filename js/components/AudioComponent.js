export default {
    name: "TheAudioComponent",

    template: `
    <section class="media-container">
        <h1 class="hidden">Music Component</h1>
        <div class="top-section">
            <div class="music-container">
                <img class="selected-music" :src="'images/' + currentMediaDetails.song_cover_art" alt="Album Cover">
            
                <audio controls :src="'audio/' + currentMediaDetails.song_file" class="audio-player"></audio>
            </div>

            <div class="text-section">
                <h4 class="media-name">{{currentMediaDetails.song_name}}</h4>
                <span class="media-year">{{currentMediaDetails.song_year}}</span>
                <span class="media-genre">{{currentMediaDetails.song_genre}}</span>
            </div>
        </div

                <div class="songs">
                
                    <img class="poster" v-for="item in allRetrievedSongs" :src="'images/' + item.song_cover_art" alt="Album Cover" @click="loadNewSong(item)">
                </div>
            </div>
        </div>
    </section>
    `,

    data: function () {
        return {
            currentMediaDetails: {},
            allRetrievedSongs: [],

        }
    },

    created: function() {
        this.retrieveSongContent();
    },

    methods: {
        retrieveSongContent() {
            
            // Fetches all of the song content
             if(localStorage.getItem("cachedSong")) {
                this.allRetrievedSongs = JSON.parse(localStorage.getItem("cachedSong"));

                this.currentMediaDetails = this.allRetrievedSongs[0];
            } else {
                let url = `./admin/index.php?media=songs`;

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("cachedSong", JSON.stringify(data));

                        this.allRetrievedSongs = data;
                        
                        // Check for content restrictions
                        

                       
                        i = 0;
                        while(i < this.allRetrievedSongs.length){
                            if(filterYear !== "1000") {
                                if(this.allRetrievedSongs[i].song_year_code !== filterYear){
                                    this.allRetrievedSongs.splice(i, 1);
                                } else {
                                    i++;
                                }
                            } else {
                                break;
                            }
                        }

                        // Caches shows
                        localStorage.setItem("cachedSong", JSON.stringify(data));

                        // Sets current media on initial page load
                        if(this.allRetrievedSongs.length !== 0 && this.pageLoad == false) {
                            this.currentMediaDetails = this.allRetrievedSongs[0];
                            this.pageLoad = true;
                        }
                    })    
            }
        },

        // Reloads songs filtered by year
        filterByYear() {
            // Remove cached songs
            if(localStorage.getItem("cachedSong")) {
                localStorage.removeItem("cachedSong");
            }

            this.retrieveSongContent();
        },

        
        loadNewSong(song) {
            if(this.allRetrievedSongs.length !== 0) {
                this.currentMediaDetails = song;
            }
        }
    }
}
