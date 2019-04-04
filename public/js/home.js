
const doWeather = () => {

    axios.get('/')
        .then(
            result => {
                console.log(result);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        );
};


