1. A microservice is a component of a monolithic application that is separated to handle heavy tasks more efficiently. By creating a clone of this component, we can increase its efficiency and prevent the server from crashing.

2. Now let's code:
   - First, create a new file `stress.service.js` to define our microservice.
   - Use the `express` framework to set up a basic server.
   - Implement clustering to utilize multiple CPU cores for handling requests.
   - Add a route that performs a CPU-intensive task to simulate stress.

3. To test the performance of our microservice, we will use the `autocannon` tool:
   - Create a new file `test.js` to define our load testing script.
   - Use `autocannon` to send multiple requests to our microservice and measure its performance.

4. Run the microservice and the load test:
   - Start the microservice by running `node stress.service.js`.
   - In another terminal, run the load test by executing `node test.js`.

5. Analyze the results:
   - Check the console output of `test.js` to see the number of requests handled and the duration.
   - Observe the CPU usage and performance improvements with clustering.

6. Conclusion:
   - By separating a component into a microservice and using clustering, we can handle heavy tasks more efficiently and improve the overall performance of our application.