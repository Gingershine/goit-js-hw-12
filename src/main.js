import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from "axios"; 

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "42148811-877485cb71de5bd48342bfa16";

const form = document.querySelector("#form");
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.button');


let page = 1;
let limit = 15;
let maxPages = 0;



const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
hideLoader()
form.addEventListener("submit", handleSearch);

async function handleSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const images = form.elements.images.value;
    
  gallery.innerHTML = '';
  page = 1;

    if (!images.trim()) {
        iziToast.show({
            message: `Please, fill in the search field`,                    
            messageColor: 'white',
            backgroundColor: '#EF4040',
            position: 'topRight',
            timeout: 4000,
        });
        return;
    }
    showLoader();
                  
            if (!images) {
                iziToast.show({                   
                    message: `Sorry, there are no images matching your search query.`,                    
                    messageColor: 'white',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                    timeout: 4000,
                });
                return;
            }
    try {
        const {hits, totalHits} = await searchImages(images);        
        maxPages = Math.ceil(totalHits / limit);
            gallery.insertAdjacentHTML ('beforeend', createImagesMarkup(hits)) ;
        lightbox.refresh();   
        if (hits.length > 0 && hits.length !== totalHits) {
            loadMoreBtn.classList.remove('is-hidden');
            loadMoreBtn.addEventListener('click', handleLoadMore);
        } else {
            loadMoreBtn.classList.add('is-hidden');
        }        
    }       
       catch(error) {
      console.log(iziToast.show({                   
                    message: `Ooops! Something went wrong.`,                    
                    messageColor: 'white',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                    timeout: 4000,
                }))
    }
        finally {
        form.reset();
        hideLoader();
      };

  async function handleLoadMore() {  
      showLoader();
        page += 1;
        loadMoreBtn.classList.add('is-hidden'); 
      try {
        
        const { hits } = await searchImages(images);
        
          gallery.insertAdjacentHTML('beforeend', createImagesMarkup(hits));
        lightbox.refresh(); 

        const cardSize = gallery.getBoundingClientRect();  
        window.scrollBy({ top: cardSize.height * 2, behavior: "smooth", })
        
        }catch(error) {
      console.log(iziToast.show({                   
                    message: `Ooops! Something went wrong.`,                    
                    messageColor: 'white',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                    timeout: 4000,
                }));
    }
        finally {
            loadMoreBtn.classList.remove('is-hidden');
            if (page === maxPages) {
                loadMoreBtn.classList.add('is-hidden');
                loadMoreBtn.removeEventListener('click', handleLoadMore);
                iziToast.show({                   
                    message: `We're sorry, but you've reached the end of search results.`,                    
                    messageColor: 'white',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                    timeout: 4000,
                });
        }
        hideLoader();
      };
    }   
}

function searchImages(images) {
       return axios.get(`${BASE_URL}`,{params: {
       key: API_KEY,
        q: images,
        type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: limit,
    }}).then(({data}) => data)    
}

function createImagesMarkup (arr) {
    return arr.map(
         ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        }) =>
      `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          width="360"
        />
      </a>
      <div class="info-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${likes}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${views}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${comments}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${downloads}</p>
        </div>
      </div>
    </li>`
    ).join('');
};

function showLoader() {
  if (loader) {
    loader.style.display = 'block';
  }
}

function hideLoader() {
  if (loader) {
    loader.style.display = 'none';
  }
}