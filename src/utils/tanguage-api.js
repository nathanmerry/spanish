const TanguageApi = {
  requestPhrases(category) {
    return fetch("https://data.test/index.php/wp-json/markers/v1/post/").then(
      res =>
        res
          .json()
          .then(jsonRes => {
            return jsonRes.map(item => {
              return {
                category: item.category[0].name,
                title: item.post_title.trim(),
                english: item.acf.name_en.trim(),
                spanish: item.acf.name_es.trim(),
                possibleAnswerEs: eval(item.acf.possible_answers_es),
                isActive: false
              };
            });
          })
          .then(allPhrases => {
            return allPhrases.filter(phrase => {
              return phrase.category == category;
            });
          })
    );
  }
};

export default TanguageApi;
