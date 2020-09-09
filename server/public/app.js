
var url = document.getElementById("url");
var slug = document.getElementById("slug");


myform.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(url.value);
    createUrl(url.value,slug.value);
    //console.log((result));
    //console.log(result.slug);
   //`localhost:7890/${result}`;
});

async function createUrl(url,slug){
    var userUrl = url;
    var userSlug = slug;
    if(slug.length == 0){
        userSlug = '';
    }
    const response = await fetch('/url',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            url: userUrl,
            slug: userSlug
        })
    });
    var created = await response.json();
    document.getElementById("createdUrl").innerHTML = `localhost:7890/${created.slug}`;
    
    
}