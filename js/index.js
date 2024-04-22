document.addEventListener("DOMContentLoaded", function() {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(function (response) {
        var states = response.data;
        createOptions(states)
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  function createOptions(states) {
    var select = document.querySelector('.form-states');
    select.innerHTML = '';
    select.innerHTML += '<option value="" selected>--- SELECT ---</option>';
  
    states.forEach(function(state) {
      select.innerHTML += '<option value="' + state.sigla + '">' + state.nome + '</option>';
    });
  
    select.addEventListener('change', function() {
      var selectedState = states.find(function(state) {
        return state.sigla === select.value;
      });
      if (selectedState) {
        createCityOptions(selectedState);
        document.querySelector('.form-citys').removeAttribute('disabled');
      }
    });
  }

  function createCityOptions(uf) {
    var select = document.querySelector('.form-citys');
    select.innerHTML = '';
    select.innerHTML += '<option value="" disabled selected>--- SELECT ---</option>';
  
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf.sigla + '/distritos')
    .then(function (response) {
        var citys = response.data;

        citys.forEach(function(city) {
            select.innerHTML += '<option value="' + city.sigla + '">' + city.nome + '</option>';
          });
          })
    .catch(function (error) {
        console.log(error);
    });
}
