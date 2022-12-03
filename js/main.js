const $root = document.querySelector('#root')
const $prev = document.querySelector('#prev')
const $in = document.querySelector('#in')
const $next = document.querySelector('#next')
let page=1

const getData=(page)=>{
    $root.innerHTML=""
    $prev.className=''
    page!=1? $prev.innerText=`${page-1}`:$prev.className='disabled'
    $in.innerText=page
    $next.innerText=page+1
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then((res) => res.json()).then((data) => {
            console.log(data)
            $root.innerHTML+=data.results.map((character)=>`
                <li class="characterCard" onclick="(e)=>{
                    console.log(e)
                }">
                    <img src="${character.image}" alt="${character.name}-image">
                    <div class="info">
                        <h2>${character.name}</h2>
                        <p>genero: ${character.gender}</p>
                        <p>Especie: ${character.species}</p>
                    </div>
                </li>
            `)
        })
}
getData(page)

const handlePager=(action)=>{
    if(action=='prev'&&page>1){
        page--
        getData(page)
    }else{
        page++
        getData(page)
    }
}

$prev.addEventListener('click',()=>handlePager('prev'))
$next.addEventListener('click',()=>handlePager('next'))
//(W_W)