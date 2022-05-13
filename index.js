fetch('http:/localhost:3000')
    .then(data => {
        return data.json();
    })
    .then(post => {
        console.log(post.expense);
    });