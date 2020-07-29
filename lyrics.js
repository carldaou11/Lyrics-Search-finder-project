const form=document.getElementById('form')
const search=document.getElementById('search')
const result=document.getElementById('result')
const more=document.getElementById('more')

const APIURL='https://api.lyrics.ovh'

//functions
//search songs or artist
async function searchSongs(term){
     /*fetch(`${APIURL}/suggest/${term}`)
     .then(res=>res.json())
     .then(data=>console.log(data))*/
     const res= await fetch(`${APIURL}/suggest/${term}`)
     const data= await res.json()

     showData(data)
}
//get more songs
async function getMoreSongs(url){
     const res= await fetch(`https://cors-anywhere.herokuapp.com/${url} `)
     const data= await res.json()

     showData(data)
}
//get ;yrics
async function getLyrics(artist,songTitle){
     const res= await fetch(`${APIURL}/v1/${artist}/${songTitle}`)
     const data= await res.json()

     const lyrics= data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>')

     result.innerHTML=`<h2><strong>${artist}</strong>-${songTitle}</h2>
     <span>${lyrics}</span>`

     more.innerHTML=''
}
//show data
function showData(data){
     /*let output=''
     data.data.forEach(song => {
          output+=`
          <li>
               <span><strong>${song.artist.name}</strong>- ${song.title}</span>
               <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">
               Get Lyrics
               </button>
          </li>`
     });

     result.innerHTML=`
     <ul class="songs">
     ${output}
     </ul>`*/
     result.innerHTML=`<ul class="songs">

     ${data.data.map(song=>`
     <li>
          <span><strong>${song.artist.name}</strong>- ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">
          Get Lyrics
          </button>
     </li>`).join('')}

     </ul>
     `
     if(data.prev||data.next){
          more.innerHTML=`
          ${data.prev?`<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`:''}
          ${data.next?`<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`:''}
          `
     }else{
          more.innerHTML=''
     }
}

//event listeners
form.addEventListener('submit',e=>{
     e.preventDefault()
     const searchTerm=search.value.trim()

     if(!searchTerm){
          alert('Please type something !!')
     }else{
          searchSongs(searchTerm)
     }
})

result.addEventListener('click',e=>{
     const clicked=e.target
     if(clicked.tagName==='BUTTON'){
          const artist= clicked.getAttribute('data-artist')
          const songTitle=clicked.getAttribute('data-songTitle')

          getLyrics(artist,songTitle)
     }
})