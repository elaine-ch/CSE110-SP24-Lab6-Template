Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.

**Answer**: 1. Within a Github action that runs whenever code is pushed

**Explanation**: Github Actions are used to automate Github tasks which makes it the ideal platform for automated testing. It also fits in to the CI/CD pipeline, where we are encouraged to push our code into a shared repository often, which we can then verify using an automated test. Also, since people are forgetful, they may forget to run the tests manually before pushing their code, so using automated testing via Github Actions ensures that code is _always_ tested consistently for every code push. 











