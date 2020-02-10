const TanguageData = {
  async search() {
    const response = await fetch(
      `https://data.test/index.php/wp-json/markers/v1/post`
    );

    const jsonResponse = await response.json();

    if (jsonResponse) {
      return jsonResponse.map(phrase => {
        return phrase;
      });
    } else {
      console.log("no response was found");
    }
  }
};

export default TanguageData;
