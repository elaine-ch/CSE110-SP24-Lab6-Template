**Team:** Umar Khan, Phoebe Tang

**Check Your Understanding 1:** Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.

**Answer:** 1. Within a Github action that runs whenever code is pushed

**Explanation:** Github Actions are used to automate Github tasks which makes it the ideal platform for automated testing. It also fits into the CI/CD pipeline, where we are encouraged to push our code into a shared repository often, which we can then verify using an automated test. Also, since people are forgetful, they may forget to run the tests manually before pushing their code, so using automated testing via Github Actions ensures that code is _always_ tested consistently for every code push. 

**Check Your Understanding 2:** Would you use an end to end test to check if a function is returning the correct output? (yes/no)

**Answer:** No

**Explanation:** Checking if a small portion of the code is functioning as intended is a job suited more towards unit testing. E2E Testing is used to check the overall functionality of a webpage from the perspective of a user. E2E tests provide a more wholistic view of the page's overall functionality, while unit tests are more suited towards checking smaller portions and individual functions of the code.

