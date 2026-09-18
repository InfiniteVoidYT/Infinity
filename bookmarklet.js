javascript:(function() {
    fetch('https://raw.githubusercontent.com/InfiniteVoidYT/Infinity/refs/heads/main/main.js').then(response => response.text()).then(scriptText => {
        eval(scriptText);
        console.log('Infinity Loaded!');
    }
    ).catch(err => console.error('Error loading script:', err));
}
)();