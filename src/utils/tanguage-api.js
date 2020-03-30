const TanguageApi = {
  requestPhrases(category) {
    return fetch(
      "https://nathanmerry.co.uk/tanguagedata/index.php/wp-json/markers/v1/post"
    ).then(res =>
      res
        .json()
        .then(jsonRes => {
          return jsonRes.map(item => {
            return {
              category: item.category[0].slug,
              title: item.post_title.trim(),
              english: item.acf.en_phrase.trim(),
              spanish: item.acf.es_phrase.trim(),
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
