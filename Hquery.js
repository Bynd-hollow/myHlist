import axios from "axios";

const retRes = document.getElementById("returning");
const name = document.getElementById("name");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const tags = document.getElementById("tags");
const img = document.getElementById("disImg");
const code = document.getElementById("code");
// grab the form
const queryInput = document.querySelector("#hentaiQuery");
const qqI = document.getElementById("hentaiQuery");

const type = {
	j: 'jpg',
	p: 'png',
	g: 'gif'
};

function dynamicSearchType(incoming){
  if(isNaN(incoming)){
    return "https://nhentai.net/api/galleries/search?query=";
  } else {
    return "https://nhentai.net/api/gallery/";
  }
}

function searchForArtist(search){
    for(let i = 0; i < search.length; i++){
        if(search[i].type == "artist"){
            return search[i].name;
        } else {
            continue;
        }
    }
}

function loopTags(searchtgs){
  let taglist = [];
  for(let i = 0; i < searchtgs.length; i++){
    if (searchtgs[i].type == "tag" || searchtgs[i].type == "character"){
      taglist.push(searchtgs[i].name);
    } else {
      continue;
    }
  }
  return taglist.toString();
}

// Second get request for image, as the images are stored in a different domain
const requestImageProcessing = async (returning) => {
    let imageType = returning.cover.t; 
    let medID = returning.media_id
    let imgURL = 'https://t.nhentai.net'
    try{
        const ret = await axios.get(`${imgURL}/galleries/${medID}/cover.${type[imageType]}`);
        name.textContent = returning.title.english;
        code.textContent = returning.id;
        author.textContent = searchForArtist(returning.tags);
        pages.textContent = returning.num_pages;
        tags.textContent = loopTags(returning);
        img.setAttribute("src", ret);
    } catch (error){
        alert(error);
    }
}


//method for searching with the data as first arg and searchtype is by code or by name 
const searchForDoujinshi = async (querydata, searchType) => {
  //fetching.style.display = "block";
  try {
    const response = await axios.get(`${searchType}/${querydata}`);
    requestImageProcessing(response);
  } catch (error) {
    alert(error);
  }
};

// declare a function to handle form submission
const handleQuery = async e => {
  e.preventDefault();
  searchForDoujinshi(qqI.value, dynamicSearchType(qqI.value));
};

queryInput.addEventListener("submit", e => handleQuery(e));