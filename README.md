# products-angular-project
Project to learn angular.
This is a work in progress project, with a focus on learning angular. Therefore, I am not using a lot of features that I would normally use use. But following is the list of things that I would be implementing in the future:
1) Using either webpack or browserify.
2) Using SASS and overall creating a better UI.
3) Making it modular. Eg: updateService used in updatesController.
4) Putting the node server in a separate folder.
5) Adding more error handling
6) Adding unit and integration tests.

Also there are some files like nested-controller-as.html which don't relate to the project, but I had added them as part of my learning, these files, I will remove and clean up the project as I move forward.

#Instructions to run the app:
1) Go to the server folder and run the following command to start the node server:
   node main

2) In products-angular-project folder, run the server with the following command to start the Angular App:
   python -m SimpleHTTPServer

Also, this project requires a local Postgres db to be installed. But you can also use datafiles instead. I have commented in Scripts.js where the urls need to be changed to access data files instead of localdb. I plan to have a build process set up later and provide option to do so while running webpack.
