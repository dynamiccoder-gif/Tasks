// IndexedDB script

// Declaring a variable to hold the reference to the IndexedDB database
let db;

// Initiating the process of opening a database named 'myDatabase' with version 1
const request = indexedDB.open('myDatabase', 1);

// Event listener that executes when the database is being upgraded
request.onupgradeneeded = (event) => {
  // Assigning the database reference to the db variable
  db = event.target.result;
  
  // Creating an object store named 'myObjectStore'
  const objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id' });

  // Creating an index named 'name' on the 'name' property of the objects in the object store
  objectStore.createIndex('name', 'name', { unique: false });

  // Creating an index named 'age' on the 'age' property
  objectStore.createIndex('age', 'age', { unique: false });
};

// Event listener that executes when the database is successfully opened
request.onsuccess = (event) => {
  // Assigning the database reference to the db variable
  db = event.target.result;
  
  // Logging a message indicating that the database was opened successfully
  console.log('Database opened successfully');
};

// Event listener that executes if an error occurs while opening the database
request.onerror = (event) => {
  // Logging an error message along with the error code
  console.error('Database error:', event.target.errorCode);
};

// Event listener for the form submission
document.getElementById('dataForm').addEventListener('submit', (event) => {
  // Preventing the default form submission behavior
  event.preventDefault();

  // Extracting data from the form fields
  const id = Number(document.getElementById('id').value);
  const name = document.getElementById('name').value;
  const age = Number(document.getElementById('age').value);

  // Initiating a read-write transaction on the 'myObjectStore' object store
  const transaction = db.transaction(['myObjectStore'], 'readwrite');
  // Accessing the 'myObjectStore' object store
  const objectStore = transaction.objectStore('myObjectStore');
  // Adding the extracted data to the object store
  const request = objectStore.add({ id, name, age });

  // Event listener that executes when data is added successfully
  request.onsuccess = () => {
    console.log('Data added successfully');
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
  };

  // Event listener that executes if an error occurs while adding data
  request.onerror = (event) => {
    console.error('Add data error:', event.target.errorCode);
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
  };
});

// Event listener for retrieving data
document.getElementById('getData').addEventListener('click', () => {
  // Prompting the user to enter an ID
  const id = Number(prompt('Enter ID to fetch:', '1'));
  
  // Initiating a read-only transaction on the 'myObjectStore' object store
  const transaction = db.transaction(['myObjectStore'], 'readonly');
  // Accessing the 'myObjectStore' object store
  const objectStore = transaction.objectStore('myObjectStore');
  // Retrieving the corresponding data from the object store
  const request = objectStore.get(id);

  // Event listener that executes when data is retrieved successfully
  request.onsuccess = (event) => {
    // Displaying the retrieved data
    document.getElementById('output').textContent = JSON.stringify(event.target.result, null, 2);
  };

  // Event listener that executes if an error occurs while retrieving data
  request.onerror = (event) => {
    console.error('Get data error:', event.target.errorCode);
  };
});

// Event listener for updating data
document.getElementById('updateData').addEventListener('click', () => {
  // Prompting the user to enter an ID and new data
  const id = Number(prompt('Enter ID to update:', '1'));
  const name = prompt('Enter new name:', 'Jane Doe');
  const age = Number(prompt('Enter new age:', '25'));

  // Initiating a read-write transaction on the 'myObjectStore' object store
  const transaction = db.transaction(['myObjectStore'], 'readwrite');
  // Accessing the 'myObjectStore' object store
  const objectStore = transaction.objectStore('myObjectStore');
  // Updating the corresponding record in the object store with the new data
  const request = objectStore.put({ id, name, age });

  // Event listener that executes when data is updated successfully
  request.onsuccess = () => {
    console.log('Data updated successfully');
  };

  // Event listener that executes if an error occurs while updating data
  request.onerror = (event) => {
    console.error('Update data error:', event.target.errorCode);
  };
});

// Event listener for deleting data
document.getElementById('deleteData').addEventListener('click', () => {
  // Prompting the user to enter an ID
  const id = Number(prompt('Enter ID to delete:', '1'));

  // Initiating a read-write transaction on the 'myObjectStore' object store
  const transaction = db.transaction(['myObjectStore'], 'readwrite');
  // Accessing the 'myObjectStore' object store
  const objectStore = transaction.objectStore('myObjectStore');
  // Deleting the corresponding record from the object store
  const request = objectStore.delete(id);

  // Event listener that executes when data is deleted successfully
  request.onsuccess = () => {
    console.log('Data deleted successfully');
    // Clearing the output area
    document.getElementById('output').textContent = '';
  };

  // Event listener that executes if an error occurs while deleting data
  request.onerror = (event) => {
    console.error('Delete data error:', event.target.errorCode);
  };
});
