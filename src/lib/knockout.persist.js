module.exports = function(ko) {

  ko.extenders.persist = function(target, key) {

    var initialValue = target();

    // Load existing value from localStorage if set
    if (key && localStorage.getItem(key) !== null) {
      try {
        initialValue = JSON.parse(localStorage.getItem(key));
      } catch (e) {
      }
    }
    target(initialValue);

    // Reload from localStorage
    target.reload = function() {
      if(key && localStorage.hasOwnProperty(key)){
        try{
          target(JSON.parse(localStorage.getItem(key)));
        }catch(e){};
      }
      return target;
    }

    target.persistKey = key;

    // Subscribe to new values and add them to localStorage
    target.subscribe(function (newValue) {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
    return target;

  };

};
