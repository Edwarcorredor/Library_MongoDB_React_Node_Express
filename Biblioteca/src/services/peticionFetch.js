import Cookies from 'js-cookie';

const handleSubmit = (event, url, metodo, close) => {
    event.preventDefault();
    const query = Object.fromEntries(new window.FormData(event.target));
    event.target.reset();
    if(metodo == "PUT"){
      url = `${url}/${query.ID}`;
      delete query.ID;
    }
    fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("authToken")
      },
      body: JSON.stringify(query),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        event.target.reset();
        if(close){
          close();
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

export default handleSubmit;