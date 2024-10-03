import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
let galleryLightbox = new SimpleLightbox('.gallery a'); 
let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    showError('Please enter a search query');
    return;
  }

  page = 1;
  clearGallery();
  toggleLoader(true);
  toggleLoadMoreBtn(false);

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showError('No images found');
    } else {
      renderImages(data.hits);
      galleryLightbox.refresh(); 
      if (totalHits > page * 15) {
        toggleLoadMoreBtn(true);
      }
    }
  } catch (error) {
    showError('Error: ' + error.message);
  } finally {
    toggleLoader(false);
  }
}

async function onLoadMore() {
  page += 1;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    const oldScrollPosition = window.scrollY;
    renderImages(data.hits);
    galleryLightbox.refresh(); // Оновлення lightbox після завантаження додаткових зображень

    const gallery = document.querySelector('.gallery');
    const newScrollPosition = gallery.scrollHeight;

    window.scrollTo({
      top: oldScrollPosition + (newScrollPosition - oldScrollPosition),
      behavior: 'smooth',
    });

    if (page * 15 >= totalHits) {
      toggleLoadMoreBtn(false);
      showError("You've reached the end of search results", 'warning');
    }
  } catch (error) {
    showError('Error: ' + error.message);
  } finally {
    toggleLoader(false);
  }
}

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function toggleLoadMoreBtn(show) {
  loadMoreBtn.classList.toggle('hidden', !show);
}

function showError(message, type = 'error') {
  iziToast.show({
    title: type === 'error' ? 'Error' : 'Warning',
    message: message,
    position: 'topRight',
    backgroundColor: type === 'error' ? 'red' : 'yellow',
    timeout: 5000,
    color: '#111',
  });
}