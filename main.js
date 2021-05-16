//Fetch the items from the JSON file
function loadItems() {//items을 동적으로 받아옴
  return fetch('cloth.json')//fetch는 browser API
    .then(response => response.json())//json이라는 api를 이용해서 response의 body를 json의 object로 변환
    .then(json => json.items);//json을 전부 가져오는것이 아니라 json의 items(배열)만 가져옴 **결론적으로 loadItems()는 json.items를 return하는 함수임
}

//update the list with the given items
function displayItems(items){
  const list = document.querySelector('.list');
  list.innerHTML = items.map(item => creatHTMLString(item))/*문자열들로 이루어진 배열*/.join('');//그 배열을 문자열로 바꿈
}

//create HTML list item from the given data item
function creatHTMLString(item){
  return `
   <li><img src="${item.image}" alt="${item.type}"> ${item.size}, ${item.color}, ${item.type}</li>
  `;//문자열을 리턴
}

function onButtonClick(event, items){
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  
  if(key == null || value == null){
    return;
  }
  
  displayItems(items.filter(item => item[key] === value));

}

function setEventListeners(items){
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".header");
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', () => onButtonClick(event, items));
}

//main
loadItems()
.then(items => {
 displayItems(items);
 setEventListeners(items)
})
.catch(console.log);

