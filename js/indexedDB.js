(function() {
    'use strict';
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
  
    const name = 'restaurant-review-db';
    const version = 1;

    const dbPromise = idb.open(name, version, function(upgradeDb){
        console.log('making a new object store');
        const store = upgradeDb.createObjectStore('restaurants', { keyPath: 'id'});

    });

    dbPromise.then(function(db){
        let tx = db.transaction('restaurants', 'readwrite');
        let store = tx.objectStore('restaurants');
        return store.get('hello');
    });

















    // dbPromise.then(function(db){
    //     let tx = db.transaction('restaurants', 'readwrite');
    //     let restaurantsStore = tx.objectStore('restaurants')
    //     restaurantsStore.put("bar", "foo");
    //     return tx.complete;
    // }).then(function(val){
    //     console.log('Added foo:bar to restaurants');
    // });

    // const dbPromise = idb.open(name, version, function(upgradeDb){
    //     console.log('making a new object store');
    //     switch(upgradeDb.oldVersion){
    //         case 0:
    //             let keyValStore = upgradeDb.createObjectStore('restaurants');
    //             keyValStore.put('world', 'hello');
    //         case 1:
    //             upgradeDb.createObjectStore('people', {keyPath: 'name'});
    //         case 2:
    //             let peopleStore = upgradeDb.transaction.objectStore('people');
    //             peopleStore.createIndex('age', 'age');
    //     }
    // });

    // to read from the restaurants database
    // dbPromise.then(function(db){
    //     let tx = db.transaction('restaurants');
    //     let keyValStore = tx.objectStore('restaurants')
    //     return keyValStore.get('hello');
    // }).then(function(val){
    //     console.log('The value of "hello" is:', val);
    // });

    // to write to the restaurants database - add another value
    // dbPromise.then(function(db){
    //     let tx = db.transaction('restaurants', 'readwrite');
    //     let keyValStore = tx.objectStore('restaurants');
    //     return keyValStore.put('bar', 'foo');
    //     return tx.complete;
    // }).then(function(){
    //     console.log('Added foo:bar to restaurants');
    // });

    // to write to the people database
    // dbPromise.then(function(db){
    //     let tx = db.transaction('people', 'readwrite');
    //     let peopleStore = tx.objectStore('people');

    //     peopleStore.put({
    //         name: 'Zuzana K',
    //         age: 36,
    //         favoriteAnimal: 'cat'
    //     });
    //     peopleStore.put({
    //         name: 'Mariam ',
    //         age: 8,
    //         favoriteAnimal: 'cat'
    //     });
    //     peopleStore.put({
    //         name: 'Ibrahim',
    //         age: 10,
    //         favoriteAnimal: 'cat'
    //     });
    //     peopleStore.put({
    //         name: 'Ahmad',
    //         age: 39,
    //         favoriteAnimal: 'cat'
    //     });
    //     peopleStore.put({
    //         name: 'Hamza',
    //         age: 2,
    //         favoriteAnimal: 'dinosaur'
    //     });

    //     return tx.complete;
    // }).then(function(){
    //     console.log('Added various people to PeopleStore');
    // })

    // to read the Peoples database
    // dbPromise.then(function(db){
    //     let tx = db.transaction('people');
    //     let peopleStore = tx.objectStore('people');
    //     let ageIndex = peopleStore.index('age');

    //     return ageIndex.openCursor();
    // }).then(function(cursor){
    //     if(!cursor) return;
    //     return cursor.advance(2); //skips first 2 items
    // }).then(function logPerson(cursor){
    //     if(!cursor) return;
    //     console.log('Cursored at:', cursor.value.name);
    //     // cursor.update(newValue);
    //     // cursor.delete()
    //     return cursor.continue().then(logPerson);
    // }).then(function() {
    //     console.log('done cursoring');
    // });
  
  })();




