This application is built using React library for the UI and Redux library for state management. 

### Setup
* Clone this repository
* Install all the dependencies: npm install
* Run the application for development: npm start

### Features:
* The application generates a test report in a tabular format for clear indication of individual test execution status. 
* This status is updated dynamically without any user interaction, other than the initial click of the START button.
* Icons are utilised to eliminate text clutter.
* Standard colors are utilised to indicate success, failures and waiting state for better visual clarity.

### Implementation:
Modern Javascript features are utilised to build the test runner. Individual tests are executed asynchronously using async/await and all the tests are executed together in parallel using javascript promises. Promise.all() ensures each of these tests are executed at the same time.

The status of each test is stored in a redux store so that the data can be accessed across the application. Redux state updates are synchronous which will ensure that the application reflects the status immediately after the update.

Input processing:
When the user clicks the START button, the input is first processed and then the tests are executed. To the input containing tests description and test function call, a new property is added dynamically to each of these test objects. It is set as a getter property to get access to its containing object properties.
This new property is a function which does the following:
* Updates the status to running
* Test execution 
* Updates the status to pass/fail based on the execution result

Test Execution:
After the input has been processed, the tests are executed in parallel using javascript Promise.all().

Possible extensions to the design in the future:
* Calculating the execution time of each test
* Calculating the execution time of all the tests